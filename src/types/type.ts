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
    following: string,
    followers: number,
    name: string,
    company: string,
    location: string,
    bio: string,
    created_at: string,
    updated_at: string,
}