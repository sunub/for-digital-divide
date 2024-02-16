import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface AccountData {
  userId: string;
  accountNumber: string;
  createDate: Date;
}

function DashBoardPage() {
  return (
    <div>
      <h1>Banking Page</h1>
    </div>
  );
}

export default DashBoardPage;
