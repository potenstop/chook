/**
 *
 * 功能描述: 元数据key值
 *
 * @className MetaConstant
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/27 14:50
 */
export class MetaConstant {
    public static VALID_NOTNULL = Symbol("chook.valid.NotNull");
    public static VALID_NOTBANK = Symbol("chook.valid.NotBank");
    public static VALID_MIN = Symbol("chook.valid.min");
    public static VALID_MAX = Symbol("chook.valid.max");
    public static JSON_PROPERTY = Symbol("chook.protocol.JsonProperty");
    public static DESIGN_TYPE = "design:type";
    public static KEYS = Symbol("chook.keys");
    public static CONTROLLER_ARGUMENTS = Symbol("chook.controller.arguments");
    public static BEAN_RETURN_GENERICS = Symbol("chook.bean.return.generics");
    public static AUTOWIRED = Symbol("chook.autowired");
    public static RESOURCE = Symbol("chook.resource");
    public static BEANS = Symbol("chook.beans");
    public static TRANSACTION = Symbol("chook.dao.transaction");
    public static PRIMARY = Symbol("chook.dao.primary");
    public static TRIGGER = Symbol("chook.trigger");
    public static TRANSACTION_OBJECT = Symbol("chook.dao.transaction.object");
}
