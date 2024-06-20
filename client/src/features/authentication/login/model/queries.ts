import { useQuery } from "@tanstack/react-query"
import { fetchLogin } from "entities/login"

export const useUserFetch = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => fetchLogin()
    })
}