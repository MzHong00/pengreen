import { forwardRef, useState } from "react"

import { OutputSearchList, SearchBar } from "features/vote/search"

import styles from './searchBox.module.css'

export const SearchBox = forwardRef<HTMLDivElement>((_, ref) => {
    const [search, setSearch] = useState<string>('');

    return (
      <div ref={ref} className={styles.searchBox}>
        <SearchBar setText={setSearch} className={styles.searchBar} />
        <OutputSearchList list={[]} className={styles.outputSearchList} />
      </div>
    );
})