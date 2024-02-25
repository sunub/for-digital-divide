"use server";

import { Pool, PoolClient, QueryResult } from "pg";
import { cookies } from "next/headers";
import { decode } from "js-base64";
import crypto from "crypto";
import usePgPool from "@/hooks/use-pgpool.hook";

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

    const findResult = await usePgPool(async (client) => {
      const query = `
        SELECT * FROM fido_passwords
        WHERE password = $1;
      `;

      return await client.query(query, [password]);
    });

    const username = findResult.rows[0].username;
    const hashUsername = crypto.createHash("sha256").update(username!).digest();
    const encodedHashUsername = Buffer.from(hashUsername).toString("base64");

    if (encodedHashUsername === decodedSession.username) {
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
}

export default User;
