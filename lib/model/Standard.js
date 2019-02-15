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
const Property_1 = require("../annotation/bean/Property");
/**
 *
 * 功能描述: 标准输出
 *
 * @className Standard
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 10:09
 */
class Standard {
    constructor() {
        this.code = 0;
        this.message = "suc";
    }
}
__decorate([
    Property_1.Property,
    __metadata("design:type", Number)
], Standard.prototype, "code", void 0);
__decorate([
    Property_1.Property,
    __metadata("design:type", String)
], Standard.prototype, "message", void 0);
__decorate([
    Property_1.Property,
    __metadata("design:type", Object)
], Standard.prototype, "data", void 0);
exports.Standard = Standard;
//# sourceMappingURL=Standard.js.map