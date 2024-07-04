import { Injectable } from "@nestjs/common";
import { IUserInfo, IUserRole } from "./api.interface";

@Injectable()
export class UserService {
    constructor(){

        //init two users: admin & guest
        const admin:IUserInfo = {
            userName: 'admin',
            role: IUserRole.employee,
            password:'admin'
        };
        const guest:IUserInfo = {
            userName: 'guest',
            role: IUserRole.guest,
            password:'guest'
        }
    }
}