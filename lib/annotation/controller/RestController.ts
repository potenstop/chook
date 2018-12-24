/**
 *
 * 功能描述:
 *
 * @className RestController
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 14:31
 */
export function RestController(): CallableFunction {
    return (target: object, propertyName: string): void => {
        console.log(target, propertyName);
    };
};
