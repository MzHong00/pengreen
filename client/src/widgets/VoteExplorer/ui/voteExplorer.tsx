import { SortByButton } from "features/vote/sortBy";
import { VoteListSlider } from "widgets/VoteListSlider";

export function VoteExplorer() {
  return (
    <section>
      <SortByButton />
      <VoteListSlider />
    </section>
  );
}
