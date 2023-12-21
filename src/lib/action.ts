"use server";

import pg from "pg";
import { date, maxLength, minLength, object, safeParse, string } from "valibot";
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

export async function createUserInfo(formData: FormData) {
  const validateDataField = safeParse(LoginSchema, {
    username: formData.get("username"),
    password: formData.get("password"),
  });
  const client = await pool.connect();

  if (!validateDataField.success) {
    return {
      success: false,
      message: validateDataField.issues[0].message,
    };
  }

  const { username } = validateDataField.output;
  const date = new Date().toISOString().split("T")[0];
  const password = await bcrypt.hash(validateDataField.output.password, 10);

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

    revalidatePath("/user/info");
    return {
      success: true,
      message: "로그인이 완료되었습니다.",
    };
  } catch (err) {
    console.error(err);
  }
}
// <div className="hidden sm:ml-6 sm:flex sm:items-center">
// <Menu as="div" className="relative ml-3">
//   <div>
//     <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
//       <span className="sr-only">Open user menu</span>
//       <Image
//         className="h-8 w-8 rounded-full"
//         src={user?.image || 'https://avatar.vercel.sh/leerob'}
//         height={32}
//         width={32}
//         alt={`${user?.name || 'placeholder'} avatar`}
//       />
//     </Menu.Button>
//   </div>
//   <Transition
//     as={Fragment}
//     enter="transition ease-out duration-200"
//     enterFrom="transform opacity-0 scale-95"
//     enterTo="transform opacity-100 scale-100"
//     leave="transition ease-in duration-75"
//     leaveFrom="transform opacity-100 scale-100"
//     leaveTo="transform opacity-0 scale-95"
//   >
//     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//       {user ? (
//         <Menu.Item>
//           {({ active }) => (
//             <button
//               className={classNames(
//                 active ? 'bg-gray-100' : '',
//                 'flex w-full px-4 py-2 text-sm text-gray-700'
//               )}
//               onClick={() => signOut()}
//             >
//               Sign out
//             </button>
//           )}
//         </Menu.Item>
//       ) : (
//         <Menu.Item>
//           {({ active }) => (
//             <button
//               className={classNames(
//                 active ? 'bg-gray-100' : '',
//                 'flex w-full px-4 py-2 text-sm text-gray-700'
//               )}
//               onClick={() => signIn('github')}
//             >
//               Sign in
//             </button>
//           )}
//         </Menu.Item>
//       )}
//     </Menu.Items>
//   </Transition>
// </Menu>
// </div>
