import { createFileRoute } from "@tanstack/react-router";
import { LinkMaker } from "../components/linkMaker";

const DEFAULT_TEXT = `Word AI generates contextual stories for vocabulary words. Click any word to receive an AI-generated narrative that demonstrates its usage and meaning in a memorable context.`;

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-12 flex items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full">
        <h1 className="text-5xl font-bold text-slate-900 mb-8 text-center">
          Word AI
        </h1>
        <div className="text-center">
          <div className="text-slate-600 leading-relaxed text-lg">
            <LinkMaker stringArr={[DEFAULT_TEXT]} />
          </div>
        </div>
      </div>
    </div>
  );
}
