 papio 是基于typescript开发的后端框架。参考了sprint-boot实现。
 
 papio支持的特性:
 - 组件开发
 - 自动注入
 - 日志集成
 - (typeorm)支持 MySQL / MariaDB / Postgres / SQLite / Microsoft SQL Server / Oracle / sql.js
 - 数据库datasource配置及连接池
 - 事务

 # 入门
 ## 安装
 1 安装papio:
    
 `npm install papio --save`
 
 2 安装typeorm:

 `npm install typeorm --save`
 
 3 安装数据驱动
  
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