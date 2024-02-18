"use client";
import { validatedAction } from "./server";
import { useZact } from "zact/client";
import { useState, useRef, useEffect } from "react";
import ChatBox from "@/components/chat_box";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [chat, setChat] = useState([
    { time: "2:30PM", text: "What can I help you schedule?" },
  ]);
  const { mutate, data, isLoading } = useZact(validatedAction);
  const [currMessage, setCurrMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container px-4">
          <div className="h-14 flex items-center">
            <h1 className="text-lg font-semibold">Chat with GPT</h1>
          </div>
        </div>
      </header>
      <div className="flex-1 bg-gray-100 border-t border-gray-200">
        <div className="container px-4 py-6 flex flex-col gap-4">
          <div className="grid gap-2">
            {chat.map((item, index) => (
              <div key={index}>
                {/* Render content for each object in the array */}
                <ChatBox time={item.time} text={item.text}></ChatBox>

                {/* Add more elements as needed */}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              className="flex-1"
              placeholder="Type your message here."
              ref={inputRef}
            />
            <Button
              onClick={async () => {
                if (inputRef.current && inputRef.current.value) {
                  let currText = inputRef.current.value;
                  setChat((prev) => [
                    ...prev,
                    { text: currText, time: Date().toString() },
                  ]);
                  const res = await validatedAction({
                    stuff: inputRef.current.value,
                  }).then((data) => {
                    console.log(data.data[0].message.content);
                    setChat((prev) => [
                      ...prev,
                      {
                        text: data.data[0].message.content,
                        time: Date().toString(),
                      },
                    ]);
                  });
                  console.log(res);
                  // .then(
                  //   (response) => {
                  //     setChat((prev) => [
                  //       ...prev,
                  //       { text: response.content!, time: Date().toString() },
                  //     ]);
                  //     console.log("response!", response);
                  //   }
                  // );
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
  );

  return (
    <div>
      <input name={"Enter prompt"} ref={inputRef} />

      <button
        onClick={() => {
          if (inputRef.current) {
            console.log(inputRef.current.value);
            return mutate({ stuff: inputRef.current.value });
          }
        }}
      >
        Run server action
      </button>
      {isLoading && <div>Loading...</div>}
      {data?.message}
    </div>
  );

  //   return (
  //     <div>
  //       <button
  //         onClick={async () => {
  //           const completion = await openai.chat.completions.create({
  //             messages: [
  //               { role: "system", content: "You are a helpful assistant." },
  //             ],
  //             model: "gpt-3.5-turbo",
  //           });

  //           console.log(completion.choices[0]);
  //         }}
  //       >
  //         AI TALK
  //       </button>
  //     </div>
  //   );
}
