/**
 *
 * 功能描述: 导包
 *
 * @className chook
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/2 15:07
 */
import { PapioApplication as _PapioApplication } from "./app/PapioApplication";
import { IApplication as _IApplication } from "./app/IApplication";
import { KoaApplication as _KoaApplication } from "./app/KoaApplication";
export declare namespace app {
    const PapioApplication: typeof _PapioApplication;
    type IApplication = _IApplication;
    const KoaApplication: typeof _KoaApplication;
}
import { JsonProperty as _JsonProperty } from "./annotation/bean/JsonProperty";
import { Property as _Property } from "./annotation/bean/Property";
import { Controller as _Controller } from "./annotation/controller/Controller";
import { RestController as _RestController } from "./annotation/controller/RestController";
import { Bean as _Bean } from "./annotation/initialize/Bean";
import { ComponentScan as _ComponentScan } from "./annotation/component/ComponentScan";
import { EnableAutoConfiguration as _EnableAutoConfiguration } from "./annotation/initialize/EnableAutoConfiguration";
import { RequestMapping as _RequestMapping } from "./annotation/mapping/RequestMapping";
import { RequestBody as _RequestBody } from "./annotation/request/RequestBody";
import { RequestHeader as _RequestHeader } from "./annotation/request/RequestHeader";
import { RequestParam as _RequestParam } from "./annotation/request/RequestParam";
import { ResponseBody as _ResponseBody } from "./annotation/response/ResponseBody";
import { Max as _Max } from "./annotation/validation/Max";
import { Min as _Min } from "./annotation/validation/Min";
import { NotBank as _NotBank } from "./annotation/validation/NotBank";
import { NotNull as _NotNull } from "./annotation/validation/NotNull";
import { Valid as _Valid } from "./annotation/validation/Valid";
import { ValidOptions as _ValidOptions } from "./annotation/validation/ValidOptions";
import { Autowired as _Autowired } from "./annotation/component/Autowired";
import { Service as _Service } from "./annotation/component/Service";
import { Configuration as _Configuration } from "./annotation/component/Configuration";
import { Resource as _Resource } from "./annotation/initialize/Resource";
import { MapperScan as _MapperScan } from "./annotation/component/MapperScan";
import { Primary as _Primary } from "./annotation/dao/Primary";
import { Transaction as _Transaction } from "./annotation/dao/Transaction";
export declare namespace annotation {
    const JsonProperty: typeof _JsonProperty;
    const Property: typeof _Property;
    const Controller: typeof _Controller;
    const RestController: typeof _RestController;
    const Bean: typeof _Bean;
    const ComponentScan: typeof _ComponentScan;
    const EnableAutoConfiguration: typeof _EnableAutoConfiguration;
    const RequestMapping: typeof _RequestMapping;
    const RequestBody: typeof _RequestBody;
    const RequestHeader: typeof _RequestHeader;
    const RequestParam: typeof _RequestParam;
    const ResponseBody: typeof _ResponseBody;
    const Max: typeof _Max;
    const Min: typeof _Min;
    const NotNull: typeof _NotNull;
    const NotBank: typeof _NotBank;
    const Valid: typeof _Valid;
    const ValidOptions: typeof _ValidOptions;
    const Autowired: typeof _Autowired;
    const Service: typeof _Service;
    const Configuration: typeof _Configuration;
    const Resource: typeof _Resource;
    const MapperScan: typeof _MapperScan;
    const Transaction: typeof _Transaction;
    const Primary: typeof _Primary;
}
import { Api as _Api } from "./annotation/swagger/Api";
export declare namespace swagger {
    const Api: typeof _Api;
}
export { ApplicationLog } from "./log/ApplicationLog";
import { JsonProtocol as _JsonProtocol } from "./protocol/JsonProtocol";
export declare namespace protocol {
    const JsonProtocol: typeof _JsonProtocol;
}
import { ConvertUtil as _ConvertUtil } from "./util/ConvertUtil";
import { JSHelperUtil as _JSHelperUtil } from "./util/JSHelperUtil";
import { StackAnalysisUtil as _StackAnalysisUtil } from "./util/StackAnalysisUtil";
import { StringUtil as _StringUtil } from "./util/StringUtil";
export declare namespace util {
    const ConvertUtil: typeof _ConvertUtil;
    const JSHelperUtil: typeof _JSHelperUtil;
    const StackAnalysisUtil: typeof _StackAnalysisUtil;
    const StringUtil: typeof _StringUtil;
}
import { RequestMethod as _RequestMethod } from "./enums/RequestMethod";
export declare namespace enums {
    const RequestMethod: typeof _RequestMethod;
}
import { HttpContent as _HttpContent } from "./context/HttpContent";
export declare namespace context {
    const HttpContent: typeof _HttpContent;
}
import { IConnection as _IConnection } from "./data/IConnection";
import { IDataSource as _IDataSource } from "./data/IDataSource";
import { IConnectionPoolDataSource as _IConnectionPoolDataSource } from "./data/IConnectionPoolDataSource";
import { IPooledConnection as _IPooledConnection } from "./data/IPooledConnection";
import { ISavepoint as _ISavepoint } from "./data/ISavepoint";
import { TypeConnection as _TypeConnection } from "./data/typeorm/TypeConnection";
import { TypeDataBeansRepository as _TypeDataBeansRepository } from "./data/typeorm/TypeDataBeansRepository";
import { TypeDataSource as _TypeDataSource } from "./data/typeorm/TypeDataSource";
export declare namespace data {
    type IConnection = _IConnection;
    type IDataSource = _IDataSource;
    type IConnectionPoolDataSource = _IConnectionPoolDataSource;
    type IPooledConnection = _IPooledConnection;
    type ISavepoint = _ISavepoint;
    type TypeConnection = _TypeConnection;
    const TypeDataBeansRepository: typeof _TypeDataBeansRepository;
    const TypeDataSource: typeof _TypeDataSource;
}
