import React from "react";
import { columns } from "./tickets/ticket_table/columns";
import { DataTable } from "./tickets/ticket_table/data-table";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  console.log("User ID: ", user?.id);
  console.log("Is Authenticated: ", await isAuthenticated());

  const fetchTickets = async () => {
    const res = await fetch("http://localhost:3000/api/tickets");
    const tickets = await res.json();
    return tickets;
  };

  const tickets = await fetchTickets();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-3">
        <Button variant="outline">
          <LoginLink>Sign in</LoginLink>
        </Button>
        <Button variant="outline">
          <RegisterLink>Sign up</RegisterLink>
        </Button>
        <Button variant="outline">
          <LogoutLink>Log out</LogoutLink>
        </Button>
      </div>

      <div className="container mx-auto py-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Managing your tickets
        </h1>
        <DataTable columns={columns} data={tickets} />
      </div>
    </main>
  );
}
