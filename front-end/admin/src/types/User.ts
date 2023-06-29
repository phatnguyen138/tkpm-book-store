export type UserInfo = {
    user_id: number,
    fullname: string,
    email: string,
    password: string,
    avatar: File | null,
    address: string,
    phone: string | null,
    role_id: number
}