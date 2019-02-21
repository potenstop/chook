 papio 是基于typescript开发的后端框架。参考了sprint-boot实现。
 
 papio支持的特性:
 - 组件开发
 - 自动注入
 - 日志集成
 - (typeorm)支持 MySQL / MariaDB / Postgres / SQLite / Microsoft SQL Server / Oracle / sql.js
 - 数据库datasource配置及连接池
 - 事务
 - http datasource的配置

 # 入门
 ## 安装
 
 1 安装papio:
    
 `npm install papio --save`
 
 2 (可选)用数据库(mysql、MariaDB、PostgreSQL、sqlserver、SQLite、Oracle、MongoDB)安装typeorm和对应的驱动:

 `npm install typeorm --save`
 
 安装数据驱动
  
   - **MySQL** 或者 **MariaDB**

     `npm install mysql --save` (也可以安装 `mysql2`)

   - **PostgreSQL**

     `npm install pg --save`

   - **SQLite**

     `npm install sqlite3 --save`

   - **Microsoft SQL Server**

     `npm install mssql --save`

   - **sql.js**

     `npm install sql.js --save`

   - **Oracle**

     `npm install oracledb --save`

     根据你使用的数据库，仅安装其中*一个*即可。
     要使 Oracle 驱动程序正常工作，需要按照其[站点](https://github.com/oracle/node-oracledb)中的安装说明进行操作。

   - **MongoDB** (试验性)

     `npm install mongodb --save`

   - **NativeScript**, **react-native** 和 **Cordova**

     查看 [支持的平台](/supported-platforms.md)
 
    此外，请确保你使用的是 TypeScript 编译器版本**2.3**或更高版本，并且已经在`tsconfig.json`中启用了以下设置:
    
    ```json
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    ```
3 更新日志
- 0.0.1  项目初始化
- 0.0.2  日志工具集成
- 0.0.3  接口支持入参验证器注解
- 0.0.4-6 修复bug
- 0.0.7  支持数据库的dataSource配置
- 0.0.8  支持http请求的dataSource配置
- 0.0.9  支持redis的dataSource配置 并扩展支持锁机制
- 0.0.10~11 加入启动日志和加载路由的日志


