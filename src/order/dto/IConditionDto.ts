import { ApiProperty } from "@nestjs/swagger";
import { IOrderStatus } from "../api.interface";

export class IConditionDto {
    @ApiProperty({
        required:false,
        description:'查询时间'
    })
    expectedArrivalTime?: string;
    
    @ApiProperty({
        required:false,
        description:'订单状态',
        enum: IOrderStatus
    })
    status?: IOrderStatus
}