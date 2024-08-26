import { OrderService } from './order.service';
import { IOrderDto } from './dto/IOrderDto';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderEntity } from './store/order.entity';
import { UseInterceptors } from '@nestjs/common';
import { JwtInterceptorGQL } from '../jwt/jwt.interceptorgql';
import { IOrderStatus } from './api.interface';
import { ApiException } from '../utils/api.exception';
import { IUserRole } from '../user/api.interface';

@Resolver(() => OrderEntity)
@UseInterceptors(JwtInterceptorGQL)
export class OrderResolver{

    constructor(
        private readonly orderService: OrderService

    ){}

    @Mutation(()=>String)
    public async addOrder(
        @Args('guestName') guestName: string,
        @Args('guestContact') guestContact: string,
        @Args('expectedArrivalTime') expectedArrivalTime: string,
        @Args('tableSize') tableSize: number,
        @Context() context: any,

    ):Promise<string>{
        const req = context.req;
        const user = req.user;
        if(user.role == IUserRole.guest){

            guestName = user.username;
        }
        await this.orderService.addOrder({
            guestContact,
            guestName,
            expectedArrivalTime,
            tableSize
        })
        return 'success'
    }


    @Mutation(() => String)
    public async updateOrder(
        @Args('id') id: string,
        @Context() context: any,
        @Args('guestName',{nullable: true}) guestName?: string,
        @Args('guestContact',{nullable: true}) guestContact?: string,
        @Args('expectedArrivalTime',{nullable: true}) expectedArrivalTime?: string,
        @Args('tableSize',{nullable: true}) tableSize?: number,
        @Args('status',{nullable: true}) status?: IOrderStatus,
    ):Promise<string>{
        const req = context.req;
        const user = req.user;
        if(!user){
            throw new ApiException('用户未认证',400)
        }
        await this.orderService.updateOrder(id,{
            guestContact,
            guestName,
            expectedArrivalTime,
            tableSize,
            status
        },user)
        return 'success'
    }
    
    @Query(() => [IOrderDto])
    public async getOrderList(
        @Context() context: any,

    ):Promise<IOrderDto[]>{
        const req = context.req;
        const user = req.user;
        if(user.role!==IUserRole.employee){
            return await this.orderService.getOrderListByGuestName(user.username)
        }
        return await this.orderService.getOrderList()
    }
    
    @Query(()=> [IOrderDto])
    public async getOrderConditionList(
        @Args('status') status: IOrderStatus,
        @Context() context: any,
        @Args('expectedArrivalTime') time: string,


    ):Promise<IOrderDto[]>{
        const req = context.req;
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