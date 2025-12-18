import { unstable_cache } from "next/cache";
import { cache } from "react";
import { z } from "zod/v4";
import { userService } from "@/entities/users/users.service";
import { getSessionCookieStorage } from "@/utils/cookies/sessionCookieStorage";

const serial = z.number().int().positive().optional();
const CachedUserInfoSchema = z.object({
  user_id: serial,
  name: z.string().min(1).max(100),
  session_id: z.string().min(1).max(100).nullable(),
  email: z.email(),
  created_at: z.coerce.date(),
});

const getCachedUserInfo = unstable_cache(
  async (userId: number) => {
    return await userService.findByUserId(userId);
  },
  ["user-info"],
  {
    tags: ["user-info"],
    revalidate: 60,
  },
);

export const getUsername = cache(async () => {
  const sessionCookie = await getSessionCookieStorage("en_session");

  if (!sessionCookie) {
    return null;
  }

  const userInfo = await getCachedUserInfo(sessionCookie.user_id);
  const parsedUserInfo = CachedUserInfoSchema.safeParse(userInfo);
  if (!parsedUserInfo.success) {
    console.error("Invalid user info:", parsedUserInfo.error);
    return null;
  }

  return parsedUserInfo.data.name;
});
