export function getUserAccountType(userRoles : string[]) {
    if(userRoles.includes("Admin")) return 'Quản trị viên'
    if(userRoles.includes("Seller")) return 'Doanh nghiệp'
    return 'Người dùng' // default role
}