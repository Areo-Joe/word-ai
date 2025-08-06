import {
  useQuery,
  experimental_streamedQuery as stremedQuery,
  queryOptions,
} from "@tanstack/react-query";
import { Channel, invoke } from "@tauri-apps/api/core";
import { Queuer } from "@tanstack/pacer";

interface Words {
  word: string;
  story: string;
}

export function useGetAllWords() {
  return useQuery({
    queryKey: ["words"],
    queryFn: () => invoke<Array<Words>>("get_all_words"),
  });
}

type StreamAIEvent =
  | {
      event: "message";
      data: {
        content: string;
      };
    }
  | { event: "done" };

function createStreamAIEventPromise() {
  type Resolver = (value: StreamAIEvent | PromiseLike<StreamAIEvent>) => void;
  let resolver: Resolver | null = null;
  const promise = new Promise<StreamAIEvent>((res) => {
    resolver = res;
  });

  return {
    promise,
    resolver: resolver as unknown as Resolver,
  };
}

async function* storyGetter(word: string) {
  const onEvent = new Channel<StreamAIEvent>();
  let { promise, resolver } = createStreamAIEventPromise();

  const queue = new Queuer<StreamAIEvent>(
    (event) => {
      resolver(event);
      const next = createStreamAIEventPromise();
      promise = next.promise;
      resolver = next.resolver;
    },
    {
      wait: 20,
    },
  );

  onEvent.onmessage = (message) => {
    queue.addItem(message);
  };

  invoke("stream_ai", {
    word,
    onEvent: onEvent,
  });

  while (true) {
    const next = await promise;
    if (next.event === "done") {
      return;
    } else {
      yield next.data.content;
    }
  }
}

export function useGetStoryOfWord(word: string) {
  return useQuery(
    queryOptions({
      queryKey: ["word", word],
      queryFn: stremedQuery({
        queryFn: () => storyGetter(word),
      }),
    }),
  );
}
