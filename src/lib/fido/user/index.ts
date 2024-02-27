"use server";

import { Pool, PoolClient, QueryResult } from "pg";
import { cookies } from "next/headers";
import { decode } from "js-base64";
import crypto from "crypto";
import usePgPool from "@/hooks/use-pgpool.hook";
import { NextRequest } from "next/server";

interface Credential {
  credId: string;
  type: string;
  transports: string[];
}

interface User {
  username: string;
  id: string;
  credentials: Credential[];
}

class User {
  static async signedInStatus() {
    const session = cookies().get("session")?.value;
    if (!session) return false;

    const decodedSession = JSON.parse(decode(session as string));
    return decodedSession.signedIn;
  }

  static async findByUsername(username: string) {
    const findResult = await usePgPool(async (client) => {
      const query = `
        SELECT * FROM fido_users
        WHERE username = $1;
      `;
      return await client.query(query, [username]);
    });

    return findResult.rows[0];
  }

  static async findByUserId(id: string): Promise<QueryResult<User>> {
    const findResult = await usePgPool(async (client) => {
      const query = `
        SELECT * FROM fido_users
        WHERE id = $1;
      `;

      return await client.query(query, [id]);
    });

    return findResult;
  }

  static async update(user: User) {
    const findResult = await usePgPool(async (client) => {
      const query = `
        UPDATE fido_users
        SET credentials = $1
        WHERE id = $3;        
      `;

      return await client.query(query, [user.credentials, user.id]);
    });
    return findResult;
  }

  static async findByPassword(password: string) {
    const session = cookies().get("session")?.value as string;
    const decodedSession = JSON.parse(decode(session));
    const userId = decode(decodedSession.id);

    const findResult = await usePgPool(async (client) => {
      const query = `
        SELECT * FROM fido_passwords
        WHERE id = $1;
      `;

      return await client.query(query, [userId]);
    });

    const datebasePassword = findResult.rows[0].password;

    if (datebasePassword === password) {
      return findResult;
    }

    return null;
  }

  static async insertSession(id: string, username: string) {
    const findResult = await usePgPool(async (client) => {
      const query = `
        INSERT INTO fido_session (id, username, signed_in)
        VALUES ($1, $2, $3)
        ON CONFLICT (id)
        DO UPDATE SET signed_in = EXCLUDED.signed_in;
      `;

      return await client.query(query, [id, username, true]);
    });

    return findResult;
  }

  static async updateChallenge(challenge: string, id: string) {
    const findResult = await usePgPool(async (client) => {
      const query = `
        UPDATE fido_session
        SET challenge = $1
        WHERE id = $2;
      `;

      return await client.query(query, [challenge, id]);
    });
    return findResult;
  }

  static async findUserSession(id: string) {
    const findResult = await usePgPool(async (client) => {
      const query = `
        SELECT * FROM fido_session
        WHERE id = $1;
      `;

      return await client.query(query, [id]);
    });
    return findResult;
  }

  static async updateCredential(credential: string, id: string) {
    const result = await usePgPool(async (client) => {
      const query = `
        UPDATE fido_session
        SET credential = $1
        WHERE id = $2;
      `;

      return await client.query(query, [JSON.stringify(credential), id]);
    });

    return result;
  }

  static async deleteChallenge(id: string) {
    const result = await usePgPool(async (client) => {
      const query = `
        UPDATE fido_session
        SET challenge = NULL
        WHERE id = $1;
      `;

      return await client.query(query, [id]);
    });
    return result;
  }

  static async getSession(req: NextRequest) {
    const session = req.cookies.get("session")?.value;
    const decodedSession = decode(session as string);
    const parsedSession = JSON.parse(decodedSession);
    const id = parsedSession.id;

    const findResult = await usePgPool(async (client) => {
      const query = `
        SELECT * FROM fido_session
        WHERE id = $1;
      `;

      return await client.query(query, [id]);
    });

    return findResult.rows[0];
  }
}

export default User;
