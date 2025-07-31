import { createFileRoute, Link } from "@tanstack/react-router";
import { invoke, Channel } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { Home } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center relative">
      <Link
        to="/"
        className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors duration-200 hover:shadow-xl"
        aria-label="Go home"
      >
        <Home className="w-5 h-5 text-gray-700" />
      </Link>
      
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
            {word}
          </h1>
          <WordInterpreter word={word} />
        </div>
      </div>
    </div>
  );
}

function WordInterpreter({ word }: { word: string }) {
  const { text, loading } = useWordExplanation(word);

  return (
    <div className="prose prose-lg max-w-none">
      <div
        className={`text-gray-700 leading-relaxed text-lg ${loading ? "animate-pulse text-blue-600" : ""}`}
      >
        <LinkMaker text={text} />
        {loading && (
          <span className="inline-block ml-1">
            <span className="animate-pulse">|</span>
          </span>
        )}
      </div>
    </div>
  );
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
