import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { IOrderStatus } from "../api.interface";

@Entity('order')
export class OrderEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    guestName: string;

    @Column({
        comment:'顾客联系方式电话/email'
    })
    guestContact: string;

    @Column()
    expectedArrivalTime: string;

    @Column()
    size: number;

    @Column({default: IOrderStatus.Requested,enum:IOrderStatus})
    status: IOrderStatus;
    


}