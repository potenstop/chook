/**
 *
 * 功能描述:
 *
 * @className IApplication
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 15:27
 */
export interface IApplication {
    start(hostname: string, port: number);
    start(hostname: string);
    start(port: number);
    start();
}
