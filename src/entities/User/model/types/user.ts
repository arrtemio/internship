export interface UserData {
    email: string,
    token: string,
    id: string,
}

export interface UserSchema {
    data: UserData | null,
    isLoading: boolean,
    error?: string,
    isAuth: boolean,
}
