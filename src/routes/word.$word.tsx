import { createFileRoute, Link } from "@tanstack/react-router";
import { invoke, Channel } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { Home } from "lucide-react";
import z from "zod";
import { LinkMaker } from "../components/linkMaker";

const schema = z.object({
  choices: z.array(z.any()),
});

type StreamAIEvent =
  | {
      event: "message";
      data: {
        content: string;
      };
    }
  | { event: "done" };

export const Route = createFileRoute("/word/$word")({
  component: RouteComponent,
});

function RouteComponent() {
  const { word } = Route.useParams();

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center relative">
      <Link
        to="/"
        className="absolute top-8 left-8 bg-white rounded-lg p-3 shadow-sm hover:shadow-md border border-slate-200 transition-shadow duration-200"
        aria-label="Go home"
      >
        <Home className="w-5 h-5 text-slate-700" />
      </Link>

      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">
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
    <div className="max-w-none">
      <div
        className={`text-slate-600 leading-relaxed text-lg ${loading ? "animate-pulse text-slate-800" : ""}`}
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
        if (message.event === "done") {
          setLoading(false);
        } else {
          const delta = message.data.content;

          setText((x) => x + delta);
        }
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
