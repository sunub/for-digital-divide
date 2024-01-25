type LoginAction = {
  type:
    | "wrongId"
    | "wrongPassword"
    | "wrongLengthID"
    | "wrongLengthPassword"
    | "error";
};

type ErrorMessage = {
  message: string;
};
