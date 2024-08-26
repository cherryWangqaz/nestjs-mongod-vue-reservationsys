import { JwtAuthService } from "../jwt/jwt.service";
import { IUserInfo, IUserRole } from "./api.interface";
import { ApiException } from "../utils/api.exception";
import { Args, Mutation, Resolver } from "@nestjs/graphql";


@Resolver(()=> String)
export class UserResolver {
    private userList:IUserInfo[] =[] 
    constructor(
        private readonly authService: JwtAuthService
    ){
        this.userList.push({
            userName: 'admin',
            role: IUserRole.employee,
            password:'admin'
        })
        this.userList.push({
            userName: 'guest',
            role: IUserRole.guest,
            password:'guest'
        })
    }

    @Mutation(()=> String)
    async login(
        @Args('userName') userName: string,
        @Args('password') password: string,
    ){
        const user = this.userList.find(r=>r.userName==userName)
        if(!user){
            throw new ApiException('无当前用户',400)
        }
        if(user.password!==password){
            throw new ApiException('密码错误',400)
        }
        const token = await this.authService.generateToken({username:userName,role:user.role})
        return token
    }
}