import { createFileRoute } from "@tanstack/react-router";
import { LinkMaker } from "../components/linkMaker";

const DEFAULT_TEXT = `Word AI generates contextual stories for vocabulary words. Click any word to receive an AI-generated narrative that demonstrates its usage and meaning in a memorable context.`;

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-7xl font-bold text-slate-900 mb-12 text-center">Word AI</h1>
        <div className="text-center">
          <div className="text-slate-600 leading-relaxed text-xl">
            <LinkMaker text={DEFAULT_TEXT} />
          </div>
        </div>
      </div>
    </div>
  );
}
