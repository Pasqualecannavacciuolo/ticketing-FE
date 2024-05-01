import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/button";
import { DataTable } from "../tickets/ticket_table/data-table";
import { columns } from "../tickets/ticket_table/columns";

export default async function Dashboard() {
  const { isAuthenticated } = getKindeServerSession();

  const fetchTickets = async () => {
    const res = await fetch("http://localhost:3000/api/tickets", {
      cache: "no-store",
    });
    const tickets = await res.json();
    return tickets;
  };

  const tickets = await fetchTickets();

  return (await isAuthenticated()) ? (
    <div className="container mx-auto py-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Managing your tickets
      </h1>
      <DataTable columns={columns} data={tickets} />
    </div>
  ) : (
    <div>
      {/* NOT AUTHENTICATED */}
      <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Access Denied
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            You dont have permission to access this URL. <br />
            Please contact your administrator or login. <br />
          </p>
          <div className="text-center mt-5">
            <Button className="" variant={"outline"}>
              <LoginLink postLoginRedirectURL="/dashboard">Login</LoginLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
