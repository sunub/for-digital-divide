"use server";

import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { NextResponse } from "next/server";
import { Pool, PoolClient } from "pg";

class User {
  static async findByUsername(username, client) {
    const query = `
        SELECT * FROM fido_users
        WHERE username = $1;
      `;
    const findResult = await client.query(query, [username]);
    return findResult.rows[0];
  }

  static async update(user, client) {
    const query = `
      INSERT INTO fido_users (username, id, credentials)
      VALUES ($1, $2, $3);
    `;

    const result = await client.query(query, [
      user.username,
      user.id,
      user.credentials,
    ]);
    return result;
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const csrfCheck = (req) => {
  if (req.headers.get("X-Requested-With") !== "XMLHttpRequest") {
    return NextResponse.json({ error: "Invalid access" }, { status: 400 });
  }
  return NextResponse.next();
};

export const sessionCheck = (req) => {
  const session = req.cookies.get("session")?.value;
  if (!session || !session.includes("signed-in")) {
    return NextResponse.json({ error: "not signed in" }, { status: 401 });
  }
  return NextResponse.next();
};

export async function registerCredential(req) {
  csrfCheck(req);
  sessionCheck(req);

  const client = await pool.connect();
  const username = req.cookies.get("username")?.value;
  const user = await User.findByUsername(username, client);

  try {
    const excludedCredentials = [];
    if(user.credentials.length > 0) {
      for(const credential of user.credentials) {
        excludedCredentials.push({
          id: isoBase64URL.toBuffer(credential.credId),
          type: 'public-key',
          transports: ['internal'],
        })
      }
    }

    const pubKeyCredParams = [];
    const params = [-7, -257];

    for(const param of params) {
      pubKeyCredParams.push({
        type: 'public-key',
        alg: param,
      });
    }

    const as = {}; 
    const aa = req.body.authenticatorSelection.authenticatorAttachment;
    const rr = req.body.authenticatorSelection.requireResidentKey;
    const uv = req.body.authenticatorSelection.userVerification;
    const cp = req.body.attestation;

    let asFlag = false;
    let authenticatorSelection;
    let attestation = 'none';

    if (aa && (aa == 'platform' || aa == 'cross-platform')) {
      asFlag = true;
      as.authenticatorAttachment = aa;
    }
    if (rr && typeof rr == 'boolean') {
      asFlag = true;
      as.requireResidentKey = rr;
    }
    if (uv && (uv == 'required' || uv == 'preferred' || uv == 'discouraged')) {
      asFlag = true;
      as.userVerification = uv;
    }
    if (asFlag) {
      authenticatorSelection = as;
    }
    if (cp && (cp == 'none' || cp == 'indirect' || cp == 'direct')) {
      attestation = cp;
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
