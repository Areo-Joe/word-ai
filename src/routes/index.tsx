import { createFileRoute, Link } from "@tanstack/react-router";

const DEFAULT_TEXT = `Start from clicking one of the words!`;

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <LinkMaker text={DEFAULT_TEXT} />
    </div>
  );
}

function LinkMaker({ text }: { text: string }) {
  return (
    <a href="#" className="text-blue-500 hover:underline">
      {text.split(" ").map((word, index) => (
        <>
          {index !== 0 && <span> </span>}
          <WordLink text={word} />
        </>
      ))}
    </a>
  );
}

function WordLink({ text }: { text: string }) {
  return (
    <Link to="/word/$word" params={{ word: text }}>
      {text}
    </Link>
  );
}
