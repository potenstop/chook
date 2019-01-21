/**
 *
 * 功能描述: http context
 *
 * @className HttpContent
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/11 9:48
 */
import {executionAsyncId} from "async_hooks";
import {HookLog} from "../core/Hook";
import {Property} from "../annotation/bean/Property";
export class HttpContent {
    @Property
    public headers: Map<string, string>;

    public static getHeader(key: string): string {
        const headers = HttpContent.getHeaders();
        if (headers) {
            return headers.get(key) || "";
        }
        return "";
    }
    public static getHeaders(): Map<string, string> {
        const hookLink = HookLog.findParent(executionAsyncId(), "HTTPPARSER");
        if (hookLink && hookLink.data.has("httpContext")) {
            const httpContext = hookLink.data.get("httpContext") as HttpContent;
            return httpContext.headers;
        }
        return null;
    }

}
