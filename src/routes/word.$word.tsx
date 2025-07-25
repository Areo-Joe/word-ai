import { createFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { use } from "react";
import { Suspense } from "react";

export const Route = createFileRoute("/word/$word")({
  component: RouteComponent,
});

function RouteComponent() {
  const { word } = Route.useParams();

  return (
    <>
      <h1>{word}</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <WordInterpreter text={word} />
      </Suspense>
    </>
  );
}

function WordInterpreter({ text }: { text: string }) {
  const x = use<string>(fetchWord(text));

  return <ul>{x}</ul>;
}

function fetchWord(word: string) {
  return invoke<string>("greet", { name: word });
}
