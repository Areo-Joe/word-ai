import { createFileRoute } from "@tanstack/react-router";
import { LinkMaker } from "../components/linkMaker";

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
