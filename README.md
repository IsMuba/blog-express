<p align="center">
    <img width="200px" src="https://s21.ax1x.com/2024/07/16/pkIr1Bj.jpg" style="border-radius:50%;" />
</p>

<p align="center">
  大家好，我是沐爸。给个 Star 鼓励一下吧！
</p>
</p>

<p align="center">
  <a href="https://gitee.com/ismuba/projects">
    <img height="30px" src="https://s21.ax1x.com/2024/07/16/pkIsWiq.png" />
  </a>
  <a href="https://www.zhihu.com/people/mu-ba-38-69">
    <img height="30px" src="https://s21.ax1x.com/2024/07/16/pkIsUII.jpg" />
  </a>
  <a href="https://blog.csdn.net/m0_37943716">
    <img height="30px" src="https://s21.ax1x.com/2024/07/16/pkIsGse.jpg" />
  </a>
</p>

## 项目介绍

此项目为博客管理系统的服务端，采用 Node + Express + MongoDB + Mongoose + JWT + multer 等技术栈开发，是一个功能相对比较完整的博客服务端项目。欢迎大家在此基础上进行二次开发，打造属于自己的博客网站。如果有好的想法或建议，欢迎在 issue 中提出。

## 开源地址

- 博客后台：[github](https://github.com/ismuba/blog-admin.git)、[gitee](https://gitee.com/ismuba/blog-admin.git)
- 博客前台：[github](https://github.com/ismuba/blog-web.git)、[gitee](https://gitee.com/ismuba/blog-web.git)
- 效果预览：[沐爸的官方网站](http://blog.muba888.cn/#/home)
- 接口地址：[https://doc.apipost.net/docs/detail/2e6803128c64000?target_id=0](https://doc.apipost.net/docs/detail/2e6803128c64000?target_id=0)

## 快速开始

clone 到本地后，安装依赖并运行

```
    npm install

    npm run start 或 npm run serve
```

`npm run start` 使用 nodemon 运行，nodemon 可以在检测到文件变化时自动重启应用程序，避免了手动安装。如果电脑还没有 nodemon, 可以执行 `npm i nodemon -g` 进行全局安装。

**提示**：项目运行前，请先安装 MongoDB 数据库，并启动 Mongo 服务。[MongoDB 下载地址](https://www.mongodb.com/try/download/community)

## 功能列表

- 注册
- 登陆
- 图形验证码
- 密码加密
- 增删改查
- 批量删除
- 页面查询
  - 分页查询
  - 条件模糊查询
  - 关联查询
- 图片上传
  - 单一图片上传
  - 图片批量上传
  - 图片大小与格式校验
  - 数据更新或删除时清除旧图片
- 字段校验
  - 唯一性
  - 是否必填
  - 字段长度限制
  - 字段类型限制
  - 默认值
  - 枚举值
- 统一响应格式
  - 成功响应
  - 失败响应
- RESTful API
- 错误处理
- 路由守卫
- 免登录白名单
- 会话控制
  - JWT
  - token过期时间设置和更新
- 模块化管理
  - 模型、路由、控制器和服务的模块化
  - 中间件的模块化
  - 各种静态配置的模块化
  - 常用工具函数的模块化
  - 前台和后台接口的模块化

## 目录结构

```
    ├── app.js
    ├── config                                      配置
    │   ├── config.db.js                            数据库信息
    │   ├── config.default.js                       全局默认配置
    │   └── config.tips.js                          提示信息
    ├── controller                                  控制器
    │   ├── admin                                   后台
    │   └── web                                     前台
    ├── model                                       模型
    │   ├── BannerModel.js                          广告位
    │   ├── LinksModel.js                           友链
    │   ├── NewsKindsModel.js                       资讯类别
    │   ├── NewsModel.js                            资讯
    │   ├── ProductModel.js                         产品
    │   └── UserModel.js                            用户
    ├── middleware                                  中间件
    │   ├── auth.js                                 路由鉴权
    │   └── tips.js                                 统一响应格式
    ├── public // 静态资源
    │   └── uploads
    |       └── images                              图片上传目录
    ├── router                                      路由
    │   ├── admin
    │   ├── web
    │   └── index.js                                入口路由
    ├── service                                     服务
    │   ├── admin
    │   └── web
    ├── util                                        工具库
    │   ├── formatFilePath.js                       格式化文件路径
    │   ├── index.js                                工具合集
    │   ├── JWT.js                                  jwt
    │   ├── multer.js                               图片上传
    │   └── validateImgFile.js                      图片校验
    └── views                                       模板
```

后续会持续更新，敬请期待。如果对你有所帮助，给个 Star 吧！
