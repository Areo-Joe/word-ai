import { createFileRoute } from "@tanstack/react-router";
import { LinkMaker } from "../components/linkMaker";

const DEFAULT_TEXT = `Word AI generates contextual stories for vocabulary words. Click any word to receive an AI-generated narrative that demonstrates its usage and meaning in a memorable context.`;

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-8xl font-black text-gray-900 mb-12">Word AI</h1>
        <div className="prose prose-2xl max-w-none mx-auto">
          <div className="text-gray-700 leading-relaxed text-2xl font-medium">
            <LinkMaker text={DEFAULT_TEXT} />
          </div>
        </div>
      </div>
    </div>
  );
}
