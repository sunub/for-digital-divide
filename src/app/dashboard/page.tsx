import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import User from "@/lib/fido/user";

interface AccountData {
  userId: string;
  accountNumber: string;
  createDate: Date;
}

async function DashBoardPage() {
  const isSignedIn = await User.signedInStatus();

  if (!isSignedIn) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Banking Page</h1>
    </div>
  );
}

export default DashBoardPage;
