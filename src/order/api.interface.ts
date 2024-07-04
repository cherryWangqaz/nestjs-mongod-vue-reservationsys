import { IUserTokenInfo } from "../user/api.interface";

export enum IOrderStatus {
    canceled = "canceled",
    finished = "finished",
    onProcess = "onProcess"
}


export interface IAddOrder {
    guestName: string;
    guestContact: string;
    expectedArrivalTime: string;
    tableSize: number;
}

export interface IUpdateOrder extends IAddOrder{
    status: IOrderStatus
}

export interface IOrderInfo extends IUpdateOrder {
    id: string
}

export interface ICondition {
    expectedArrivalTime?: string;
    status?: IOrderStatus
}

export interface IOrder {
    addOrder(info: IAddOrder): Promise<void>;
    updateOrder(id: string, info: IUpdateOrder, curUser: IUserTokenInfo): Promise<void>;
    getOrderList(): Promise<IOrderInfo[]>
}