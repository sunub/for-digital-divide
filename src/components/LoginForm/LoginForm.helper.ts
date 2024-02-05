"use server";

import { authenticate } from "@/lib/action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Setter {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  togglePending: () => void;
}

function generateErrorMsg(type: string): string {
  switch (type) {
    case "wrongId":
      return "아이디가 존재하지 않습니다.";
    case "wrongPassword":
      return "비밀번호가 틀렸습니다.";
    case "wrongLengthID":
      return "아이디는 4자 이상 20자 이하로 입력해주세요.";
    case "wrongLengthPassword":
      return "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
    default:
      return "";
  }
}

export async function loginFromFormData(formData: FormData, setter: Setter) {
  const { setErrorMessage, togglePending } = setter;

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username.length < 4 || username.length > 20) {
    setErrorMessage(() => generateErrorMsg("wrongLengthID"));
    togglePending();
    return;
  } else if (password.length < 8 || password.length > 20) {
    setErrorMessage(() => generateErrorMsg("wrongLengthPassword"));
    togglePending();
    return;
  }

  const loginResult = await authenticate(formData);

  if (loginResult.type === "success") {
    revalidatePath("/");
    redirect("/");
  }

  setErrorMessage(() => generateErrorMsg(loginResult.type));
  togglePending();
}
