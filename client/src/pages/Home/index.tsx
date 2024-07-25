import { VoteFilterBox } from "widgets/voteFilter";
import { VoteListSlider } from "widgets/VoteListSlider";

import styles from './home.module.css'

export default function Home() {
  return (
    <main className={styles.home}>
      <VoteFilterBox />
      <VoteListSlider />
    </main>
  )
}
