/**
 *
 * 功能描述: http context
 *
 * @className HttpContent
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/11 9:48
 */
import { executionAsyncId } from "async_hooks";
import { HookLog } from "../core/Hook";
import { JsonProperty } from "../annotation/bean/JsonProperty";
export class HttpContent {
    @JsonProperty
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
        if (hookLink && hookLink.data && hookLink.data.has("httpContext")) {
            const httpContext = hookLink.data.get("httpContext") as HttpContent;
            return httpContext.headers;
        }
        return null;
    }

}
