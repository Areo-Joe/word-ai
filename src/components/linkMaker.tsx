import { Link } from "@tanstack/react-router";

export function LinkMaker({ text }: { text: string }) {
  const arr = text
    .split("")
    .map((char) =>
      /[a-zA-Z]+/g.test(char) ? { letter: char } : { content: char },
    )
    .reduce(
      (
        acc: Array<{ word: string } | { content: string }>,
        cur: { letter: string } | { content: string },
      ) => {
        if ("content" in cur) {
          acc.push(cur);
          return acc;
        }

        if (acc.length === 0) {
          return [{ word: cur.letter }];
        } else {
          const last = acc[acc.length - 1];
          if ("word" in last) {
            last.word += cur.letter;
          } else {
            acc.push({ word: cur.letter });
          }
        }
        return acc;
      },
      [],
    );

  return arr.map((x) =>
    "word" in x ? (
      <Link
        className="text-slate-900 font-medium hover:text-slate-700 hover:underline"
        to="/word/$word"
        params={{ word: x.word }}
      >
        {x.word}
      </Link>
    ) : (
      <>{x.content}</>
    ),
  );
}
