## Description
运用nestjs框架和mongodb数据库、vue前端框架构建整个项目
后端分为controller、service、分别对接外部接口以及对内逻辑和数据库
前端分为界面和路由层，分别对接与后端数据接口、以及界面

目前是将前端编译好后，将dist文件直接静态放在后端。


TOPERF:后端逻辑校验,前端校验及样式，但基本功能存在，需要完善和补充。

## Installation

```bash
$ yarn install 安装依赖
或者npm install 
```

## Running the app

```bash
需要本地装有mongodb 并在src/store/store.module.ts文件中的host中配置对应的ip

默认两个账户 用户名和密码为admin是酒店员工账户  用户名密码为guest是用户账户

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod


```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
