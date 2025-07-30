import { createFileRoute } from "@tanstack/react-router";
import { invoke, Channel } from "@tauri-apps/api/core";
import { Suspense, useState, useEffect } from "react";
import z from "zod";

const schema = z.object({
  choices: z.array(z.any()),
});

type StreamAIEvent = {
  event: "message";
  data: {
    content: string;
  };
};

export const Route = createFileRoute("/word/$word")({
  component: RouteComponent,
});

function RouteComponent() {
  const { word } = Route.useParams();

  return (
    <>
      <h1>{word}</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <WordInterpreter word={word} />
      </Suspense>
    </>
  );
}

function WordInterpreter({ word }: { word: string }) {
  const [text, setText] = useState<string>("");
  useEffect(() => {
    const onEvent = new Channel<StreamAIEvent>();
    onEvent.onmessage = (message) => {
      try {
        const parsed = schema.parse(JSON.parse(message.data.content));
        const arr = parsed.choices;
        const delta = arr
          .filter((x) => typeof x?.delta?.content === "string")
          .map((x) => x.delta.content)
          .join("");

        setText((x) => x + delta);
      } catch (_) {}
    };

    invoke("stream_ai", {
      word: word,
      onEvent: onEvent,
    });
  }, [word]);

  return <p className="whitespace-pre-wrap">{text}</p>;
}
