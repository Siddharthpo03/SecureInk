"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const document_routes_1 = __importDefault(require("./routes/document.routes"));
const signature_routes_1 = __importDefault(require("./routes/signature.routes"));
const signer_routes_1 = __importDefault(require("./routes/signer.routes"));
const sign_routes_1 = __importDefault(require("./routes/sign.routes"));
const verify_routes_1 = __importDefault(require("./routes/verify.routes"));
const audit_routes_1 = __importDefault(require("./routes/audit.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_, res) => {
    res.send("SecureInk API Running");
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/documents", document_routes_1.default);
app.use("/api/signatures", signature_routes_1.default);
app.use("/api/signers", signer_routes_1.default);
app.use("/api/sign", sign_routes_1.default);
app.use("/api/verify", verify_routes_1.default);
app.use("/api/audit", audit_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map