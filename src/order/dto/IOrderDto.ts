import { ApiProperty } from "@nestjs/swagger";
import { IOrderStatus } from "../api.interface";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class IOrderDto {
    @Field(()=>ID)
    @ApiProperty({
        description:"订单id"
    })
    id: string;

    @Field()
    @ApiProperty({
        description:'顾客名字'
    })
    guestName: string;

    @ApiProperty({
        description:'顾客联系方式'
    })
    @Field()
    guestContact: string;

    @ApiProperty({
        description:"预期到达时间"
    })
    @Field()
    expectedArrivalTime: string;

    @ApiProperty({
        description:"定位大小"
    })
    @Field()
    tableSize: number;

    @ApiProperty({
        description:"订单状态",
        enum:IOrderStatus
    })
    @Field()
    status: IOrderStatus;

}