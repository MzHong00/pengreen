import { SelectCategory } from "features/vote/selectCategory";
import { SortByButton } from "features/vote/sortBy";
import { VoteListSlider } from "widgets/VoteListSlider";

export default function Home() {
  return (
    <section>
      <SortByButton />
      <SelectCategory />
      <VoteListSlider />
    </section>
  )
}
