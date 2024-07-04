import { Body, Controller, Post } from "@nestjs/common";
import { JwtAuthService } from "../jwt/jwt.service";
import { UserDto } from "./dto/UserDto";
import { IUserInfo, IUserRole } from "./api.interface";
import { ApiException } from "../utils/api.exception";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('用户')
@Controller('user')
export class UserController {
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

    @Post('login')
    async login(@Body() info: UserDto){
        const user = this.userList.find(r=>r.userName==info.userName)
        if(!user){
            throw new ApiException('无当前用户',400)
        }
        if(user.password!==info.password){
            throw new ApiException('密码错误',400)
        }
        const token = await this.authService.generateToken({username:info.userName,role:user.role})
        return token
    }
}