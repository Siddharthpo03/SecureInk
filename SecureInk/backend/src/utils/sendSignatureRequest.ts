import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendSignatureRequest = async (
  email: string,
  documentId: string,
) => {
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
