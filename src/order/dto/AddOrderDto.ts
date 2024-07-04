import { ApiProperty } from "@nestjs/swagger";

export class AddOrderDto {
    @ApiProperty({
        description:'顾客名字',
        required:false
    })
    guestName: string;

    @ApiProperty({
        description:'顾客联系方式'
    })
    guestContact: string;

    @ApiProperty({
        description:"预期到达时间"
    })
    expectedArrivalTime: string;

    @ApiProperty({
        description:"定位大小"
    })
    tableSize: number;

}