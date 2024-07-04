export enum IUserRole {
    guest = 'guest',
    employee = 'employee'
}

export interface IUserInfo{
    userName: string;
    role: IUserRole;
    password: string;
}

export interface IUserTokenInfo{
    username: string;
    role: IUserRole
}