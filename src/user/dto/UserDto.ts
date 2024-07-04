import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({
        description:'用户名字'
    })
    userName: string;

    @ApiProperty({
        description:'用户密码'
    })
    password: string;
}