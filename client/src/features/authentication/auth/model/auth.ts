import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "shared/api"

export const useUserFetch = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: fetchUser
    })
}