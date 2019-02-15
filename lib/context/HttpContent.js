"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: http context
 *
 * @className HttpContent
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/11 9:48
 */
const async_hooks_1 = require("async_hooks");
const Hook_1 = require("../core/Hook");
const Property_1 = require("../annotation/bean/Property");
class HttpContent {
    static getHeader(key) {
        const headers = HttpContent.getHeaders();
        if (headers) {
            return headers.get(key) || "";
        }
        return "";
    }
    static getHeaders() {
        const hookLink = Hook_1.HookLog.findParent(async_hooks_1.executionAsyncId(), "HTTPPARSER");
        if (hookLink && hookLink.data && hookLink.data.has("httpContext")) {
            const httpContext = hookLink.data.get("httpContext");
            return httpContext.headers;
        }
        return null;
    }
}
__decorate([
    Property_1.Property,
    __metadata("design:type", Map)
], HttpContent.prototype, "headers", void 0);
exports.HttpContent = HttpContent;
//# sourceMappingURL=HttpContent.js.map