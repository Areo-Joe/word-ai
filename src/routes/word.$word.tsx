import { createFileRoute } from "@tanstack/react-router";
import { invoke, Channel } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import z from "zod";
import { LinkMaker } from "../components/linkMaker";

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
      <WordInterpreter word={word} />
    </>
  );
}

function WordInterpreter({ word }: { word: string }) {
  const { text, loading } = useWordExplanation(word);
  return <LinkMaker text={text} />;
}

function useWordExplanation(word: string) {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setText("");

    const onEvent = new Channel<StreamAIEvent>();

    onEvent.onmessage = (message) => {
      if (cancel) return;
      try {
        if (message.data.content === "[DONE]") {
          setLoading(false);
        }

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

    return () => {
      cancel = true;
    };
  }, [word]);

  return { text, loading };
}
