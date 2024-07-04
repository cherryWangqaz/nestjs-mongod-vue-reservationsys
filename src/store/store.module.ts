import { DynamicModule } from "@nestjs/common";
import { OrderEntity } from "../order/store/order.entity";
import { DataSource } from "typeorm";

export class StoreModule {
    public static async init():Promise<DynamicModule>{
        try{
            const dataSource = new DataSource({
                type:'mongodb',
                host:'192.168.20.131',
                port:27017,
                database:'reservation',
                entities:[
                    OrderEntity
                ],
                synchronize:true,
                useUnifiedTopology: true
            })
            await dataSource.initialize()
        }catch(e){
            throw new Error(`Database connection Error: ${e.message}`);
        }
        return {
            module: StoreModule,
            imports:[],
            providers:[],
            exports:[]
        };
    }

}