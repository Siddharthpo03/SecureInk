"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSignatureRequest = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendSignatureRequest = async (email, documentId) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "SecureInk Signature Request",
        html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>SecureInk</h2>

        <p>You have been invited to sign a document.</p>

        <p>Click the button below to sign:</p>

        <a
          href="http://localhost:5173/sign/${documentId}"
          style="
            background:#2563eb;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
          "
        >
          Sign Document
        </a>

        <p style="margin-top:20px;">
          If the button doesn't work:
        </p>

        <p>
          http://localhost:5173/sign/${documentId}
        </p>
      </div>
    `,
    });
};
exports.sendSignatureRequest = sendSignatureRequest;
//# sourceMappingURL=sendSignatureRequest.js.map