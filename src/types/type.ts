export type SearchUserType = {
    login: string,
    id: number,
}

export type SearchResultType = {
    items: SearchUserType[],
}

export type UserType = {
    login: string,
    id: number,
    avatar_url: string,
    followers: number,
}