import * as v from "valibot";

const FidoIdSchema = v.object({
  username: v.string("아이디 입력", [
    v.minLength(1, "최소 1글자의 아이디를 입력해주세요."),
    v.maxLength(80, "최대 80글자의 아이디를 입력해주세요."),
  ]),
});

const FidoPasswordSchema = v.object({
  password: v.string("비밀번호 입력", [
    v.minLength(1, "최소 1글자의 비밀번호를 입력해주세요."),
    v.maxLength(80, "최대 80글자의 비밀번호를 입력해주세요."),
  ]),
});

function validateFormDataField(formData: FormData) {
  if (formData.get("username webauthn") && !formData.get("password")) {
    const result = v.safeParse(FidoIdSchema, {
      username: formData.get("username webauthn"),
    });

    if (!result.success) {
      return {
        username: null,
      };
    }

    return {
      username: result.output.username,
    };
  }
  if (formData.get("password")) {
    const result = v.safeParse(FidoPasswordSchema, {
      password: formData.get("password"),
    });

    if (!result.success) {
      return {
        password: null,
      };
    }

    return {
      password: result.output.password,
    };
  }
}

export default validateFormDataField;
