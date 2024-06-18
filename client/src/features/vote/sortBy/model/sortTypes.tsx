export type SortType = "Most liked" | "Most Participants" | 'Latest';

interface SortTypes {
    sortType: SortType
    queryString: string
}

export const sortTypes: SortTypes[] = [
    {
        sortType: 'Most liked',
        queryString: 'like'
    },
    {
        sortType: 'Most Participants',
        queryString: 'participant'
    },
    {
        sortType: 'Latest',
        queryString: 'latest'
    },
]