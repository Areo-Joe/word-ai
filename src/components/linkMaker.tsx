import { Link } from "@tanstack/react-router";

export function LinkMaker({ stringArr }: { stringArr: Array<string> }) {
  const wordReg = /[a-zA-Z]+/g;
  const wordAndNonWordReg = /[a-zA-Z]+|[^a-zA-Z]+/g;

  const wordAndNonWord = stringArr.join("").match(wordAndNonWordReg)!;

  return wordAndNonWord.map((x) => {
    return wordReg.test(x) ? (
      <Link
        className="text-slate-900 font-medium hover:text-slate-700 hover:underline"
        to="/word/$word"
        params={{ word: x }}
      >
        {x}
      </Link>
    ) : (
      <>{x}</>
    );
  });
}
