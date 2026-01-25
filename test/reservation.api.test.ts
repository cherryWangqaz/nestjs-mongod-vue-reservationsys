import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('测试restapi', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test("用户添加订单", () => {
    return request(app.getHttpServer())
      .post('/order/add')
      .send({
        guestName:"cherry",
        guestContact:"13333332414@xx.com",
        expectedArrivalTime:"2026-02-01",
        size:5
      })
      .expect(200);
  });

  test("用户取消订单", async () => {
    let data = await request(app.getHttpServer())
      .post('/order/add')
      .send({
        guestName:"cherry",
        guestContact:"13333332414@xx.com",
        expectedArrivalTime:"2026-02-02",
        size:5
      })
    console.log(data)
    return request(app.getHttpServer())
      .put('/order/cancel/guest/'+data.body())
      .expect(200);
  });

  test("用户更改订单", async () => {
    let data = await request(app.getHttpServer())
      .post('/order/add')
      .send({
        guestName:"cherry",
        guestContact:"13333332414@xx.com",
        expectedArrivalTime:"2026-02-03",
        size:5
      })
    console.log(data.body())
    return request(app.getHttpServer())
      .put('/order/upd/guest/'+data.body())
      .send({
        guestName:"cherry",
        guestContact:"134@xx.com",
        expectedArrivalTime:"2026-02-03",
        size:6
      })
      .expect(200);
  });
});
