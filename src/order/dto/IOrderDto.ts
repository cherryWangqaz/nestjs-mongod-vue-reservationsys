import { ApiProperty } from "@nestjs/swagger";
import { IOrderStatus } from "../api.interface";

export class IOrderDto {
    @ApiProperty({
        description:"订单id"
    })
    id: string;

    @ApiProperty({
        description:'顾客名字'
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

    @ApiProperty({
        description:"订单状态",
        enum:IOrderStatus
    })
    status: IOrderStatus;

}