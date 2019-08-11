/**
 *
 * 功能描述:
 *
 * @className PapioEmitter
 * @projectName papio
 * @author yanshaowen
 * @date 2019/8/9 15:14
 */
import {EventEmitter} from "events";
import {EmitterEnum} from "../enums/EmitterEnum";

class PapioEmitter extends EventEmitter {
    public once(event: EmitterEnum, listener: (...args: any[]) => void): this {
        return super.once(event, listener);
    }

    /***
     * 同步方式
     * @param event
     */
    public async onceSync(event: EmitterEnum) {
        return new Promise((resolve) => {
            this.once(event, () => {
                resolve();
            });
        });
    }
}
const papioEmitter = new PapioEmitter();
export class PapioEmitterDefault {
    public static getDefault() {
        return papioEmitter;
    }
}
