"use client";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { Input } from "@/components/ui/input";
import ChatBox from "@/components/chat_box";
import { callFunction } from "@/actions";

export default function Component() {
  const [chat, setChat] = useState([
    {
      time: new Date().toLocaleTimeString(),
      text: "What can I help you schedule?",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const { execute, result, status } = useAction(callFunction, {
    onSuccess: (data) => {
      setChat((prev) => [
        ...prev,
        {
          text: data[0]?.message.content ?? "No response",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    },
  });

  return (
    <main className="flex w-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="flex gap-4 w-full flex-row">
        <div className="flex flex-col w-full max-w-2xl h-screen">
          <header className="sticky top-0 z-10">
            <div className="container px-4">
              <div className="h-14 flex items-center">
                <h1 className="text-lg font-semibold">Chat with GPT</h1>
              </div>
            </div>
          </header>
          <div className="flex-1">
            <div className="container px-4 py-6 flex flex-col gap-4">
              <div className="grid gap-2">
                {chat.map((item, index) => (
                  <div key={index}>
                    <ChatBox time={item.time} text={item.text} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  className="flex-1"
                  placeholder="Type your message here."
                  ref={inputRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (inputRef.current && inputRef.current.value) {
                        let currText = inputRef.current.value;
                        setChat((prev) => [
                          ...prev,
                          { text: currText, time: Date().toString() },
                        ]);
                        execute({ stuff: inputRef.current.value });
                        inputRef.current.value = "";
                      }
                    }
                  }}
                />
                <Button
                  onClick={async () => {
                    if (inputRef.current && inputRef.current.value) {
                      let currText = inputRef.current.value;
                      setChat((prev) => [
                        ...prev,
                        { text: currText, time: Date().toString() },
                      ]);
                      execute({ stuff: inputRef.current.value });
                      inputRef.current.value = "";
                    }
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
