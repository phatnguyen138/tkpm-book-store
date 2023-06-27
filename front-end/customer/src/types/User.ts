export type AuthUser = {
    user_id: string
    fullname: string,
    avatar: string,
    email: string,
    phone: string,
    role_id: string,
    address: string,
    password: string,
}

export type ProfileUpdateInfo = {
    fullname: string,
    email: string,
    avatar: File | null,
    address: string,
    phone: string
}