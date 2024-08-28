interface SortTypes {
    sortType: "Most liked" | "Most Participants" | 'Latest'
    queryString?: string
}

export const sortTypes: SortTypes[] = [
    {
        sortType: 'Latest',
    },
    {
        sortType: 'Most liked',
        queryString: 'likes'
    },
    {
        sortType: 'Most Participants',
        queryString: 'participants'
    },
]