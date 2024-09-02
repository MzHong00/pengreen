import { type QueryClient } from "@tanstack/react-query";
import { readVoteDetail } from "entities/vote/vote";
import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";

const Paths = {
  todoDetail: "/vote/:id",
} as const;

interface VoteLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.todoDetail>>;
}

export const voteLoader =
  (queryClient: QueryClient) =>
  async ({ params }: VoteLoaderArgs) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ["vote", params.id],
        queryFn: () => readVoteDetail(params.id),
        staleTime: 10000,
      });

      console.log(data);
      
    } catch (error) {
      console.log(error);
    }

    return "sad";
  };
