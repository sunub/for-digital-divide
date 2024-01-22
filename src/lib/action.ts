"use server";

import pg from "pg";
import { maxLength, minLength, object, safeParse, string } from "valibot";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
});

const LoginSchema = object({
  username: string("아이디 입력", [
    minLength(3, "최소 3글자의 아이디를 입력해주세요."),
    maxLength(20, "최대 20글자의 아이디를 입력해주세요."),
  ]),
  password: string("비밀번호 입력", [
    minLength(8, "최소 8글자의 비밀번호를 입력해주세요."),
  ]),
});

interface CreateResult {
  success: boolean;
  message: string;
}

function validateFormDataField(formData: FormData) {
  const validateDataField = safeParse(LoginSchema, {
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validateDataField.success) {
    return {
      success: false,
      message: validateDataField.issues[0].message,
    };
  }

  return {
    username: validateDataField.output.username,
    password: validateDataField.output.password,
  };
}

export async function authenticate(formData: FormData) {
  const startTime = performance.now();

  let { username, password } = validateFormDataField(formData);

  let isAuthenticationSuccess = {
    password: false,
  };
  try {
    // Use parameterized query to prevent SQL Injection
    const queryUserInfo = await pool.query(
      `SELECT * FROM users WHERE username = $1;`,
      [username]
    );

    if (queryUserInfo.rows.length === 0) {
      return {
        success: false,
        type: "wrongId",
      };
    }

    const transferredPassword = queryUserInfo.rows[0].password;
    // Run password comparison in the background
    isAuthenticationSuccess.password = await bcrypt.compare(
      password!,
      transferredPassword
    );
  } catch (error) {
    console.error(error);
    return {
      success: false,
      type: "error",
    };
  }

  if (!isAuthenticationSuccess.password) {
    return {
      success: false,
      type: "wrongPassword",
    };
  }
  // End time
  const endTime = performance.now();

  // Calculate elapsed time
  const elapsedTime = endTime - startTime;

  console.log("로그인 시 소요된 시간: " + elapsedTime / 1000 + "s");
  revalidatePath("/dashboard/transfer");
  redirect("/dashboard/transfer");
}
export async function createUserInfo(
  formData: FormData
): Promise<CreateResult> {
  let { username, password } = validateFormDataField(formData);
  const client = await pool.connect();

  const date = new Date().toISOString().split("T")[0];
  password = await bcrypt.hash(password!, 10);

  try {
    const result = await client.query(
      `
      INSERT INTO users(username, password, date)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING;
    `,
      [username, password, date]
    );

    if (result.rowCount && result.rowCount > 0) {
      console.log("Data successfully inserted");
    } else {
      console.log("Data not inserted, possibly due to conflict");
    }

    client.release();
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "데이터베이스 오류",
    };
  }
  revalidatePath("/dashboard/transfer");
  redirect("/dashboard/transfer");
}
