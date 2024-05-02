import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { Navbar } from "@/components/navbar";

export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  const currentTimestamp = Date.now();
  console.log("currentTimestamp: ", currentTimestamp);

  const cookieStore = cookies();
  const accessToken = parseInt(cookieStore.get("access_token"));
  const refreshToken = parseInt(cookieStore.get("refresh_token"));

  const user = await getUser();
  if (user) {
    console.log("User ID: ", user?.id);
    console.log("Is Authenticated: ", await isAuthenticated());
  }

  if (accessToken && currentTimestamp) {
    // If accessToken is expired check refreshToken
    if (accessToken < currentTimestamp) {
      // If refreshToken is expired delete from cookies and redirect to home
      if (refreshToken < currentTimestamp) {
        cookieStore.delete("access_token");
        cookieStore.delete("refresh_token");
        redirect("/");
      }
    }
    redirect("/api/auth/login");
  }

  return (
    <main className="h-screen flex flex-col gap-0">
      <Navbar />
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 -mt-56">
          Ticketing
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-36 md:h-full lg:h-full xl:h-full"
            particleColor="#FAFAFA"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          <h2 className="w-64 mx-auto md:text-xl md:w-80 text-md lg:text-3xl lg:w-full text-center text-white relative z-20">
            The best solution for developers to manage assistance tickets
          </h2>
          <div className="flex gap-5 justify-center mt-5">
            <Button variant={"outline"}>
              <a href="/whatwedo">Learn more</a>
            </Button>
            <Button variant={"outline"}>
              <RegisterLink postLoginRedirectURL="/">Access</RegisterLink>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
