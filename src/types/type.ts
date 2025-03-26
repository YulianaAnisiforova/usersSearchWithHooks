export type SearchUserType = {
    login: string,
    id: number,
}

export type SearchResultType = {
    items: SearchUserType[],
    total_count: number,
}

export type UserType = {
    login: string,
    id: number,
    avatar_url: string,
    followers: number,
}