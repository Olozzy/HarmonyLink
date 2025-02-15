"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Decoder_1 = __importDefault(require("./Decoder"));
const node_1 = require("../typings/node");
class AbstractNodeDriver {
    get defaultHeaders() {
        const headers = {
            Authorization: this.node.options.password,
            "User-Agent": this.clientId,
            "Content-Type": "application/json"
        };
        if (this.type === node_1.NodeType.NodeLink) {
            headers["Accept-Encoding"] = (process.isBun) ? "gzip, deflate" : "br, gzip, deflate";
        }
        ;
        return headers;
    }
    ;
    async eventHandler(data) {
        return new Promise((resolve) => {
            if (!this.node)
                return resolve(false);
            return resolve(this.node.emit("lavalinkEvent", data.toString()));
        });
    }
    ;
    async openHandler() {
        return new Promise((resolve) => {
            if (!this.node)
                return resolve(false);
            return resolve(this.node.emit("lavalinkWSOpen"));
        });
    }
    ;
    async closeHandler(code, reason) {
        return new Promise((resolve) => {
            if (!this.node)
                return resolve(false);
            return resolve(this.node.emit("lavalinkWSClose", code, reason));
        });
    }
    ;
    async errorHandler(data) {
        return new Promise((resolve) => {
            if (!this.node)
                return resolve(false);
            return resolve(this.node.emit("lavalinkWSError", data));
        });
    }
    ;
    decoder = (base64EncodedTrack) => new Decoder_1.default(base64EncodedTrack, this.type).getTrack ?? null;
}
exports.default = AbstractNodeDriver;
;
//# sourceMappingURL=AbstractNodeDriver.js.map