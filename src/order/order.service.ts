import { InjectRepository } from "@nestjs/typeorm";
import { IAddOrder, ICondition, IOrder, IOrderInfo, IOrderStatus, IUpdateOrder } from "./api.interface";
import { OrderEntity } from "./store/order.entity";
import { ObjectId } from "mongodb";
import { Injectable } from "@nestjs/common";
import { parseUndefined } from '../utils/parseUndefinedStore';
import { IUserRole, IUserTokenInfo } from "../user/api.interface";
import { ApiException } from "../utils/api.exception";

@Injectable()
export class OrderService implements IOrder {
    
    constructor(
    ){}

    //用户添加订单
    public async addOrder(info: IAddOrder): Promise<string> {
        //添加信息至数据库
        let token = await this.addOrderStore(info)
        //将数据库主键作为该订单的唯一id

        //生成唯一url，为后续修改及取消服务
        return token
    }

    //用户更新订单具体信息
    public async updateOrder(id: string, info: IUpdateOrder): Promise<void> {
        //更新
        await this.updateOrderStore(id, info)
    }

    //用户取消订单
    public async cancelOrder(id: string): Promise<void> {
        //更新
        await this.updateOrderStore(id,{
            status: IOrderStatus.Cancelled
        } )
    }

    //雇员修改订单状态
    public async updOrderStatus(id: string, status: IOrderStatus): Promise<void> {
        //更新
        await this.updateOrderStore(id,{
            status
        } )
    }

    public async getOrderList(): Promise<IOrderInfo[]> {
        return await this.getOrderListStore()
    }

    public async getOrderListByCondition(info: ICondition): Promise<IOrderInfo[]> {
        return await this.getOrderListStoreByCondition(info)
    }

    public async getOrderListByGuestName(name: string): Promise<IOrderInfo[]> {
        return await this.getOrderListByGuestNameStore(name)
    }

    private async addOrderStore(info: IAddOrder): Promise<string> {
        const entity = new OrderEntity();
        entity.guestName = info.guestName;
        entity.guestContact = info.guestContact;
        entity.expectedArrivalTime = info.expectedArrivalTime;
        entity.size = info.size;
        entity.status = IOrderStatus.Requested;
        await entity.save() 
        return entity.id.toString()
    }
    
    private async updateOrderStore(id: string, info: IUpdateOrder): Promise<void> {
        await OrderEntity.update(id,parseUndefined(info))
    }
    
    private async getOrderListByGuestNameStore(name: string): Promise<IOrderInfo[]> {
        const entities = await OrderEntity.find({where:{guestName:name}})
        return entities.map(r=> this.parseOrderEntity(r))
    }

    private async getOrderByIdStore(id: string): Promise<IOrderInfo> {
        const idO = new ObjectId(id)
        const entity = await OrderEntity.findOne(idO)
        if(!entity){
            throw new ApiException('找不到对应的订单',400)
        }
        // await this.orderRespository.find(id)
        return this.parseOrderEntity(entity)
    }

    private async getOrderListStoreByCondition(info: ICondition): Promise<IOrderInfo[]> {
        const entities = await OrderEntity.find(parseUndefined(info))
        return entities.map(r=> this.parseOrderEntity(r))
    }

    private async getOrderListStore(): Promise<IOrderInfo[]> {
        const entities = await OrderEntity.find()
        return entities.map(r=> this.parseOrderEntity(r))
    }

    private parseOrderEntity(entity: OrderEntity): IOrderInfo{
        return {
            id: entity.id.toString(),
            guestName: entity.guestName,
            guestContact: entity.guestContact,
            expectedArrivalTime: entity.expectedArrivalTime,
            size: entity.size,
            status: entity.status
        }
    }

}