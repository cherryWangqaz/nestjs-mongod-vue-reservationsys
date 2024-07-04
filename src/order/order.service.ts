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

    public async addOrder(info: IAddOrder): Promise<void> {
        //TODO: add Logics
        await this.addOrderStore(info)
        // throw new Error("Method not implemented.");
    }

    public async updateOrder(id: string, info: IUpdateOrder, curUser: IUserTokenInfo): Promise<void> {
        //判断当前用户是否有权限修改订单
        if(curUser.role!==IUserRole.employee){
            const order = await this.getOrderByIdStore(id)
            if(order.guestName!==curUser.username){
                throw new Error('当前用户无权限操作改订单')
            }
        }
        await this.updateOrderStore(id, info)
        // throw new Error("Method not implemented.");
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

    private async addOrderStore(info: IAddOrder): Promise<void> {
        const entity = new OrderEntity();
        entity.guestName = info.guestName;
        entity.guestContact = info.guestContact;
        entity.expectedArrivalTime = info.expectedArrivalTime;
        entity.tableSize = info.tableSize;
        entity.status = IOrderStatus.onProcess;
        await entity.save() 
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
            tableSize: entity.tableSize,
            status: entity.status
        }
    }

}