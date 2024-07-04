import { Module } from "@nestjs/common";
import { OrderEntity } from "./store/order.entity";
import {TypeOrmModule} from '@nestjs/typeorm'
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { StoreModule } from "../store/store.module";
import { JwtService } from "@nestjs/jwt";

@Module({
    // imports:[],
    controllers:[OrderController],
    providers:[
        OrderService,
        JwtService
    ],
})
export class OrderModule {}