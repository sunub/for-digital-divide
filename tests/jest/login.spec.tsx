import React from "react";
import LoginForm from "@/components/LoginForm";
import { getNodeText, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createUserInfo } from "@/lib/fidoAction";
import { delay } from "../utils";

jest.mock("@/lib/action", () => ({
  createUserInfo: jest.fn(),
}));

describe("로그인 페이지 유닛 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  (createUserInfo as jest.Mock).mockResolvedValue({
    success: true,
    message: "User created successfully",
  });
  it("렌더링 테스트", () => {
    render(<LoginForm />);

    const titleElement = screen.getByText(/사이트 로그인 페이지/i);
    const idElement = screen.getByLabelText(/아이디 입력/i);
    const passwordElement = screen.getByLabelText(/비밀번호 입력/i);
    const submitButton = getNodeText(
      document.querySelector("button[type=submit]") as HTMLButtonElement,
    );

    expect(titleElement).toBeInTheDocument();
    expect(idElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(submitButton).toBe("로그인");
  });

  test("id 입력 테스트", async () => {
    render(<LoginForm />);

    const input = screen.queryByLabelText(/아이디 입력/i) as HTMLInputElement;

    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });

    if (input) {
      await userEvent.click(input as HTMLInputElement);
      await delay(100);
      await userEvent.type(input as HTMLInputElement, "bsc5672");
      expect(input.value).toBe("bsc5672");
    }
  });

  test("password 입력 테스트", async () => {
    render(<LoginForm />);

    const input = screen.queryByLabelText(/비밀번호 입력/i) as HTMLInputElement;

    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });

    if (input) {
      await userEvent.click(input as HTMLInputElement);
      await delay(100);
      await userEvent.type(input as HTMLInputElement, "123456789");
      expect(input.value).toBe("123456789");
    }
  });
});

describe("로그인 페이지 예외 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  (createUserInfo as jest.Mock).mockResolvedValue({
    success: true,
    message: "User created successfully",
  });
  test("id 입력 예외 테스트", async () => {
    render(<LoginForm />);

    const input = await screen.queryByLabelText(/아이디 입력/i);

    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });

    if (input) {
      await userEvent.click(input as HTMLInputElement);
      await delay(100);
      await userEvent.type(input as HTMLInputElement, "abc");
      await userEvent.click(
        document.getElementById("submit-id-pwd-btn") as Element,
      );

      const errorMessage =
        await screen.findByText(/아이디 입력이 잘못되었습니다./i);
      expect(errorMessage).toBeInTheDocument();
    }
  });

  test("password 입력 예외 테스트", async () => {
    render(<LoginForm />);

    const id = await screen.queryByLabelText(/아이디 입력/i);
    const password = await screen.queryByLabelText(/비밀번호 입력/i);

    await waitFor(() => {
      expect(id).toBeInTheDocument();
      expect(password).toBeInTheDocument();
    });

    if (id && password) {
      await userEvent.click(id as HTMLInputElement);
      await delay(100);
      await userEvent.type(id as HTMLInputElement, "example@gmail.com");

      await userEvent.click(password as HTMLInputElement);
      await delay(100);
      await userEvent.type(password as HTMLInputElement, "1234");

      await userEvent.click(
        document.getElementById("submit-id-pwd-btn") as Element,
      );

      const errorMessage =
        await screen.findByText(/비밀번호 입력이 잘못되었습니다./i);
      expect(errorMessage).toBeInTheDocument();
    }
  });
});
