"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiGoogleFill, RiFacebookBoxFill, RiGithubFill } from "react-icons/ri";

function LoginPage() {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center p-4">
      <div className="h-full rounded-lg flex flex-col shadow-2xl md:flex-row md:w-full md:h-[70%]lg:w-[60%] 2xl:w-[50%]">
        <div className="relative w-full h-1/3 md:w-1/2 md:h-full">
          <Image src="/images/login.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-7 p-10 md:w-1/2 md:h-full">
          <h1 className="font-bold text-xl xl:text-3xl">Greetings</h1>
          <p>Please log into your account</p>
          <button
            className="flex gap-4 p-4 ring-1 ring-red-500 bg-red-100 rounded-lg items-center"
            onClick={() => signIn("google")}
          >
            <RiGoogleFill className="text-3xl" />
            <span>Sign in with Google</span>
          </button>
          <button className="flex gap-4 p-4 ring-1 ring-blue-500 bg-blue-100 rounded-lg items-center">
            <RiFacebookBoxFill className="text-3xl" />
            <span>Sign in with FaceBook</span>
          </button>
          <button
            className="flex gap-4 p-4 ring-1 ring-gray-500 bg-gray-100 rounded-lg items-center"
            onClick={() => signIn("github")}
          >
            <RiGithubFill className="text-3xl" />
            <span>Sign in with GitHub</span>
          </button>
          <p className="text-sm">
            Issues signing in?{" "}
            <Link href="/" className="underline">
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
