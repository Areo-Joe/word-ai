import { createFileRoute } from "@tanstack/react-router";
import { LinkMaker } from "../components/linkMaker";
import { useGetStoryOfWord } from "@/hooks/words";

export const Route = createFileRoute("/word/$word")({
  component: RouteComponent,
});

function RouteComponent() {
  const { word } = Route.useParams();

  return (
    <div className="p-12 flex items-center justify-center min-h-screen">
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
  const { data = [], isLoading } = useGetStoryOfWord(word);

  return (
    <div className="max-w-none">
      <div
        className={`text-slate-600 leading-relaxed text-lg ${isLoading ? "animate-pulse text-slate-800" : ""}`}
      >
        <LinkMaker stringArr={data} />
        {isLoading && (
          <span className="inline-block ml-1">
            <span className="animate-pulse">|</span>
          </span>
        )}
      </div>
    </div>
  );
}
