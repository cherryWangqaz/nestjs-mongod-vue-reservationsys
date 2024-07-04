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
    // @ApiBody({
    //     type:AddOrderDto
    // })
    @ApiOperation({
        summary:"add order"
    })
    @UseInterceptors(JwtInterceptor)
    public async addOrder(@Body() info:AddOrderDto,@Request() req):Promise<void>{
        const user = req.user;
        if(user.role == IUserRole.guest){

            info.guestName = user.username;
        }
        if(!user){
            throw new ApiException('用户未认证',400)
        }
        console.log('-------------addORder',info,user)
        return await this.orderService.addOrder(info)
    }


    @Put('/update/:id')
    // @ApiBody({
    //     type:AddOrderDto
    // })
    @ApiOperation({
        summary:"update order"
    })
    @UseInterceptors(JwtInterceptor)
    public async updateOrder(@Body() info:UpdateOrderDto,@Param('id') id: string,@Request() req):Promise<void>{
        const user = req.user;
        if(!user){
            throw new ApiException('用户未认证',400)
        }
        return await this.orderService.updateOrder(id,info,user)
    }

    @Get()
    @ApiOperation({
        summary:'get all orders'
    })
    @UseInterceptors(JwtInterceptor)
    public async getOrderList(@Request() req):Promise<IOrderDto[]>{
        const user = req.user;
        console.log(user)
        if(!user){
            throw new ApiException('用户未认证',400)

        }
        if(user.role!==IUserRole.employee){
            return await this.orderService.getOrderListByGuestName(user.username)
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
        console.log(user)
        if(!user){
            throw new ApiException('用户未认证',400)

        }
        if(user.role!==IUserRole.employee){
            throw new ApiException('用户不提供该功能',400)

        }
        return await this.orderService.getOrderListByCondition({status:status,expectedArrivalTime:time})
    }
}