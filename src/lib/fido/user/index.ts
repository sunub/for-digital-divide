"use server";

import { PoolClient } from "pg";
import { cookies } from "next/headers";
import { decode } from "js-base64";
import crypto from "crypto";

interface User {
  username: string;
  id: string;
  credentials: string[];
}

class User {
  static async findByUsername(username: string, client: PoolClient) {
    const query = `
        SELECT * FROM fido_users
        WHERE username = $1;
      `;
    const findResult = await client.query(query, [username]);
    return findResult.rows[0];
  }

  static async update(user: User, client: PoolClient) {
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

  static async findByPassword(password: string, client: PoolClient) {
    const session = cookies().get("session")?.value as string;
    const decodedSession = JSON.parse(decode(session));

    const query = `
      SELECT * FROM fido_passwords
      WHERE password = $1;
    `;
    const findResult = (await client.query(query, [password])).rows[0];

    const hashUsername = crypto
      .createHash("sha256")
      .update(findResult.username)
      .digest();
    const encodedHashUsername = Buffer.from(hashUsername).toString("base64");

    if (encodedHashUsername === decodedSession.username) {
      return findResult;
    }
    return null;
  }
}

export default User;
