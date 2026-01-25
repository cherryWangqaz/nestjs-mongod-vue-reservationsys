import { IUserTokenInfo } from "../user/api.interface";

export enum IOrderStatus {
    Requested = 'Requested',
    Approved = 'Approved',
    Cancelled = "cancelled",
    Completed = "completed",
}


export interface IAddOrder {
    guestName: string;
    guestContact: string;
    expectedArrivalTime: string;
    size: number;
}

export interface IUpdateOrder{
    status?: IOrderStatus;
    guestName?: string;
    guestContact?: string;
    expectedArrivalTime?: string;
    size?: number;
}

export interface IOrderInfo extends IUpdateOrder {
    id: string
}

export interface ICondition {
    expectedArrivalTime?: string;
    status?: IOrderStatus
}

export interface IOrder {
    addOrder(info: IAddOrder): Promise<string>;
    updateOrder(id: string, info: IUpdateOrder, curUser: IUserTokenInfo): Promise<void>;
    getOrderList(): Promise<IOrderInfo[]>
}