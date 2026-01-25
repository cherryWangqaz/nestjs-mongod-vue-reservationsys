import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'; 
import { OrderService } from './order.service';
import { Body, Controller, Get, Param, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AddOrderDto } from './dto/AddOrderDto';
import { Post, Request } from '@nestjs/common';
import { UpdateOrderDto } from './dto/UpdateOrderDto';
import { IOrderDto } from './dto/IOrderDto';
import { IUserRole } from '../user/api.interface';
import { JwtInterceptor } from '../jwt/jwt.interceptor';
import { IConditionDto } from './dto/IConditionDto';
import { ApiException } from '../utils/api.exception';
import { IOrderStatus } from './api.interface';

@Controller('order')
@ApiTags('预定')
@ApiBearerAuth()
export class OrderController {

    constructor(
        private readonly orderService: OrderService

    ){}

    @Post('/add')
    @ApiBody({
        type:AddOrderDto
    })
    @ApiOperation({
        summary:"添加订单",
        description:'用户添加订单'
    })
    public async addOrder(@Body() info:AddOrderDto):Promise<string>{
        return await this.orderService.addOrder(info)
    }

    @Put('/cancel/guest/:id')
    @ApiOperation({
        summary:"取消订单",
        description:'用户取消订单'
    })
    public async cancelOrder(@Param('id') id: string):Promise<void>{
        return await this.orderService.cancelOrder(id)
    }

    @Put('/upd/guest/:id')
    @ApiOperation({
        summary:"更改订单",
        description:'用户更改订单'
    })
    @ApiBody({
        type:AddOrderDto
    })
    public async updOrderGuest(@Param('id') id: string,@Body() info:UpdateOrderDto):Promise<void>{
        return await this.orderService.updateOrder(id,info)
    }


    @Put('/update/:id')
    @ApiBody({
        type:AddOrderDto
    })
    @ApiOperation({
        summary:"更新订单",
        description:'雇员更新订单'
    })
    @UseInterceptors(JwtInterceptor)
    public async updateOrder(@Body() info:UpdateOrderDto,@Param('id') id: string,@Request() req):Promise<void>{
        const user = req.user;
        if(!user){
            throw new ApiException('用户未认证',400)
        }
        return await this.orderService.updateOrder(id,info)
    }

    @Get()
    @ApiOperation({
        summary:'get all orders'
    })
    @UseInterceptors(JwtInterceptor)
    public async getOrderList(@Request() req):Promise<IOrderDto[]>{
        const user = req.user;
        if(!user){
            throw new ApiException('用户未认证',400)

        }
        return await this.orderService.getOrderList()
    }

    @Get('/withCondition/:expectedArrivalTime')
    @ApiOperation({
        summary:'根据条件获取订单'
    })
    @UseInterceptors(JwtInterceptor)
    @ApiQuery({
        name: 'status',
        enum: IOrderStatus
    })
    public async getOrderConditionList(@Request() req,@Query('status') status:IOrderStatus,@Param('expectedArrivalTime') time: string):Promise<IOrderDto[]>{
        const user = req.user;
        if(!user){
            throw new ApiException('用户未认证',400)

        }
        return await this.orderService.getOrderListByCondition({status:status,expectedArrivalTime:time})
    }

}