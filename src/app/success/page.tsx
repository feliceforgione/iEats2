"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function SuccessPage() {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3000/api/confirm/${payment_intent}`,
          {
            method: "PUT",
          }
        );
        router.push("/orders");
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [payment_intent, router]);
  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
      <h1 className="text-4xl">Payment Successful</h1>{" "}
      <p className="max-w-[600px]">
        You are now being redirected to the orders plage. Please do not close
        this page.
      </p>
    </div>
  );
}

export default SuccessPage;
