import React from "react";

export const dynamic = "force-dynamic";

interface AccountData {
  userId: string;
  accountNumber: string;
  createDate: Date;
}

async function DashBoardPage() {
  return (
    <div>
      <h1>Banking Transfer Page</h1>
    </div>
  );
}

export default DashBoardPage;
