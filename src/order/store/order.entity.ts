import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { IOrderStatus } from "../api.interface";

@Entity('order')
export class OrderEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    guestName: string;

    @Column()
    guestContact: string;

    @Column()
    expectedArrivalTime: string;

    @Column()
    tableSize: number;

    @Column({default: IOrderStatus.onProcess,enum:IOrderStatus})
    status: IOrderStatus;


}