"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isFlying, setIsFlying] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const sendAccessMessage = async () => {
      await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "ALERTTTT RACHEL ACCESSED THE PAGE",
        }),
      });
    };

    sendAccessMessage();
  }, []);

  const handleButtonClick = async (action: "Yes" | "No") => {
    if (action === "No") {
      setIsFlying(true);
    } else if (action === "Yes") {
      setIsConfirmed(true);
    }

    await fetch("/api/send-to-telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: action === "Yes" ? "SHE SAID YES LFG" : "fk me",
      }),
    });
  };

  return (
    <div
      className={`text-black ${
        isConfirmed
          ? "from-yellow-200 via-orange-400 to-yellow-600"
          : "from-orange-100 via-orange-400 to-pink-600"
      } bg-radial-[at_50%_50%] transition-all duration-1000 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="animate-wiggle"
          src={isConfirmed ? "/catend.gif" : "/catstart.jpg"}
          alt="Meow"
          width={180}
          height={38}
          priority
        />

        <div className="list-inside list-decimal text-lg text-center font-[family-name:var(--font-geist-mono)]">
          <p className="mb-2">
            {isConfirmed
              ? "cool beans see you on friday!!"
              : "want to paktor on valentine?"}
          </p>
        </div>

        {!isConfirmed && (
          <>
            <div className="animate-heartbeat">
              <div className="relative w-12 h-12 bg-yellow-500 rounded-full">
                <div className="absolute w-8 h-8 bg-pink-500 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-8 h-8 bg-pink-500 rounded-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute w-8 h-8 bg-pink-500 rounded-full left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-8 h-8 bg-pink-500 rounded-full right-0 top-1/2 translate-x-1/2 -translate-y-1/2"></div>

                <div className="absolute w-8 h-8 bg-pink-400 rounded-full top-1 left-1 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                <div className="absolute w-8 h-8 bg-pink-400 rounded-full top-1 right-1 translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                <div className="absolute w-8 h-8 bg-pink-400 rounded-full bottom-1 left-1 -translate-x-1/2 translate-y-1/2 -rotate-45"></div>
                <div className="absolute w-8 h-8 bg-pink-400 rounded-full bottom-1 right-1 translate-x-1/2 translate-y-1/2 rotate-45"></div>
              </div>
            </div>

            <div className="w-2 h-20 bg-green-600 mx-auto -mt-4"></div>

            <div className="flex gap-4 items-center flex-col sm:flex-row absolute bottom-20">
              <button
                onClick={() => handleButtonClick("Yes")}
                className="rounded-full flex items-center justify-center bg-stone-200 text-background gap-2 text-lg h-10 px-4 min-w-80"
              >
                ✨Yes✨
              </button>
              <button
                onClick={() => handleButtonClick("No")}
                className={`rounded-full flex items-center justify-center bg-stone-200 text-background gap-2 text-xs h-10 px-4 min-w-80 transition-all ${
                  isFlying ? "animate-[var(--animate-fly-up)]" : ""
                }`}
              >
                No 😔
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
