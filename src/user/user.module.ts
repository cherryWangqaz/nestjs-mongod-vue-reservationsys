import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtAuthService } from "../jwt/jwt.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserResolver } from "./user.resolver";

@Module({
    // imports:[
        
    // ],
    controllers:[UserController],
    providers:[
        JwtAuthService,
        JwtService,
        UserResolver
    ],
})
export class UserModule {}