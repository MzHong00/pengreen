import { SortByButton } from "features/vote/sortBy";
import { VoteListSlider } from "widgets/VoteListSlider";

export default function Home() {
  return (
    <section>
      <SortByButton />
      <VoteListSlider />
    </section>
  )
}
