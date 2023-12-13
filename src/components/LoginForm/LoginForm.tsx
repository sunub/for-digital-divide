"use client";

import Link from "next/link";
import VisuallyHidden from "../VisuallyHidden";

function LoginForm() {
  return (
    <form>
      <div>
        <label htmlFor="login-form__insert-id">
          <VisuallyHidden>아이디 입력</VisuallyHidden>
        </label>
        <input
          id="login-form__insert-id"
          type={"text"}
          name="id"
          placeholder="아이디를 입력해주세요"
          autoComplete={"on-time-code"}
          required
        />
      </div>

      <div>
        <label htmlFor="login-form__insert-password">
          <VisuallyHidden>비밀번호 입력</VisuallyHidden>
        </label>
        <input
          id="login-form__insert-password"
          type={"password"}
          name="password"
          placeholder="비밀번호를 입력해주세요"
          autoComplete={"current-password"}
          required
        />
        <div>
          <button type="button">비밀번호 표시</button>
        </div>
      </div>

      <div>
        <Link href={"/login/find-password"}>비밀번호 찾기</Link>
        <Link href={"/login/find"}>아이디 찾기</Link>
        <Link href={"/login/register"}>회원가입</Link>
      </div>
      <div>
        <button type="submit">로그인</button>
      </div>
    </form>
  );
}

export default LoginForm;
