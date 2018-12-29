/**
 *
 * 功能描述: 从body中取出的对象
 *
 * @className RequestBody
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/26 14:23
 */
// @RequestParam 方法无参构造器
export function RequestBody(target: object, propertyKey: string, paramIndex: number): void {
    exec(target, propertyKey, paramIndex);
}
function exec(target: object, propertyKey: string, paramIndex: number) {

}
