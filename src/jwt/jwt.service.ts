import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthService {
    constructor(
        private jwtService: JwtService
    ){}

    async generateToken(payload:any):Promise<string>{
        return this.jwtService.sign(payload,{secret:'123123',expiresIn:'10m'})
    }

}