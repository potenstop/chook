/**
 *
 * 功能描述: 导包
 *
 * @className chook
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/2 15:07
 */
import {ChookApplication as _ChookApplication} from "./app/ChookApplication";
import {IApplication  as _IApplication} from "./app/IApplication";
import {KoaApplication as _KoaApplication} from "./app/KoaApplication";

export namespace app {
    export const ChookApplication = _ChookApplication;
    export type IApplication = _IApplication;
    export const KoaApplication = _KoaApplication;
}

import {JsonProperty as _JsonProperty} from "./annotation/bean/JsonProperty";
import {Property as _Property} from "./annotation/bean/Property";
import {Controller as _Controller} from "./annotation/controller/Controller";
import {RestController as _RestController} from "./annotation/controller/RestController";
import {Bean as _Bean} from "./annotation/initialize/Bean";
import {ComponentScan as _ComponentScan} from "./annotation/component/ComponentScan";
import {EnableAutoConfiguration as _EnableAutoConfiguration} from "./annotation/initialize/EnableAutoConfiguration";
import {RequestMapping as _RequestMapping} from "./annotation/mapping/RequestMapping";
import {RequestBody as _RequestBody} from "./annotation/request/RequestBody";
import {RequestHeader as _RequestHeader} from "./annotation/request/RequestHeader";
import {RequestParam as _RequestParam} from "./annotation/request/RequestParam";
import {ResponseBody as _ResponseBody} from "./annotation/response/ResponseBody";

import {Max as _Max} from "./annotation/validation/Max";
import {Min as _Min} from "./annotation/validation/Min";
import {NotBank as _NotBank} from "./annotation/validation/NotBank";
import {NotNull as _NotNull} from "./annotation/validation/NotNull";
import {Valid as _Valid} from "./annotation/validation/Valid";
import {ValidOptions as _ValidOptions} from "./annotation/validation/ValidOptions";
import {Autowired as _Autowired} from "./annotation/component/Autowired";
import {Service as _Service} from "./annotation/component/Service";
import {Configuration as _Configuration} from "./annotation/component/Configuration";
import {Resource as _Resource} from "./annotation/initialize/Resource";
import {MapperScan as _MapperScan} from "./annotation/component/MapperScan";

export namespace annotation {
    export const JsonProperty = _JsonProperty;
    export const Property = _Property;
    export const Controller = _Controller;
    export const RestController = _RestController;
    export const Bean = _Bean;
    export const ComponentScan = _ComponentScan;
    export const EnableAutoConfiguration = _EnableAutoConfiguration;
    export const RequestMapping = _RequestMapping;
    export const RequestBody = _RequestBody;
    export const RequestHeader = _RequestHeader;
    export const RequestParam = _RequestParam;
    export const ResponseBody = _ResponseBody;
    export const Max = _Max;
    export const Min = _Min;
    export const NotNull = _NotNull;
    export const NotBank = _NotBank;
    export const Valid = _Valid;
    export const ValidOptions = _ValidOptions;
    export const Autowired = _Autowired;
    export const Service = _Service;
    export const Configuration = _Configuration;
    export const Resource = _Resource;
    export const MapperScan = _MapperScan;
}

import {Api as _Api} from "./annotation/swagger/Api";

export namespace swagger {
    export const Api = _Api;
}
export { ApplicationLog } from "./log/ApplicationLog";

import { JsonProtocol as _JsonProtocol } from "./protocol/JsonProtocol";

export namespace protocol {
    export const JsonProtocol = _JsonProtocol;
}

import {ConvertUtil as _ConvertUtil} from "./util/ConvertUtil";
import {JSHelperUtil as _JSHelperUtil} from "./util/JSHelperUtil";
import {StackAnalysisUtil as _StackAnalysisUtil} from "./util/StackAnalysisUtil";
import {StringUtil as _StringUtil} from "./util/StringUtil";
export namespace util {
    export const ConvertUtil = _ConvertUtil;
    export const JSHelperUtil = _JSHelperUtil;
    export const StackAnalysisUtil = _StackAnalysisUtil;
    export const StringUtil = _StringUtil;
}

import {RequestMethod as _RequestMethod} from "./enums/RequestMethod";
export namespace enums {
    export const RequestMethod = _RequestMethod;
}

import {HttpContent as _HttpContent} from "./context/HttpContent";
export namespace context {
    export const HttpContent = _HttpContent;
}

import {IConnection as _IConnection} from "./data/IConnection";
import {IDataSource as _IDataSource} from "./data/IDataSource";
import {IConnectionPoolDataSource as _IConnectionPoolDataSource} from "./data/IConnectionPoolDataSource";
import {IPooledConnection as _IPooledConnection} from "./data/IPooledConnection";
import {ISavepoint as _ISavepoint} from "./data/ISavepoint";
import {TypeConnection as _TypeConnection} from "./data/typeorm/TypeConnection";
import {TypeDataBeansRepository as _TypeDataBeansRepository} from "./data/typeorm/TypeDataBeansRepository";
export namespace data {
    export type IConnection = _IConnection;
    export type IDataSource = _IDataSource;
    export type IConnectionPoolDataSource = _IConnectionPoolDataSource;
    export type IPooledConnection = _IPooledConnection;
    export type ISavepoint = _ISavepoint;
    export type TypeConnection = _TypeConnection;
    export const TypeDataBeansRepository = _TypeDataBeansRepository;
}
