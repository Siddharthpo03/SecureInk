# SecureInk

SecureInk is a secure digital document signing and verification platform that enables users to upload documents, place signature fields, invite signers, collect digital signatures, and verify document authenticity through an audit trail.

## Overview

Traditional document signing processes are slow, paper-based, and difficult to track. SecureInk simplifies document workflows by providing a secure, cloud-based platform for digital signatures and document verification.

The platform allows document owners to upload PDFs, define signing areas, invite signers through email, collect signatures digitally, and verify signed documents at any time.

---

## Features

### User Authentication

- User Registration
- Email OTP Verification
- Secure Login with JWT Authentication
- Protected Routes

### Document Management

- Upload PDF Documents
- View Documents Online
- Delete Documents
- Track Document Status

### Signature Management

- Create Signature Fields
- Position Signature Areas on PDFs
- Invite Signers
- Capture Digital Signatures
- Display Signed Signatures on Documents

### Verification System

- Verify Document Authenticity
- View Signature Information
- Document Validation

### Audit Trail

- Track Document Uploads
- Track Signature Requests
- Track Signature Completion
- Maintain Activity Logs

---

## Technology Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- React PDF

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication

### Database

- PostgreSQL (Supabase)

### Storage

- Supabase Storage

### Deployment

- Vercel (Frontend)
- Render (Backend)

### Email Services

- Nodemailer
- Gmail SMTP

---

## System Architecture

User → React Frontend → Express Backend → PostgreSQL Database

User → React Frontend → Express Backend → Supabase Storage

User → React Frontend → Express Backend → Email Service

---

## Project Workflow

1. User uploads a PDF document.
2. Signature fields are added to the document.
3. Signers are invited through email.
4. Signers access the signing link.
5. Digital signatures are captured and stored.
6. Document status updates automatically.
7. Audit logs are generated.
8. Documents can be verified at any time.

---

## Security Features

- JWT Authentication
- Protected API Routes
- Email Verification
- Secure File Storage
- Document Audit Logs
- HTTPS Deployment
- Role-Based Access Control

---

## Future Enhancements

- AI-Powered Document Analysis
- Blockchain-Based Signature Verification
- Mobile Application
- Multi-Factor Authentication
- Workflow Automation
- Third-Party Integrations
- Advanced Analytics Dashboard

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Siddharthpo03/SecureInk.git
cd SecureInk
```

### Backend Setup

```bash
cd backend

npm install

npx prisma generate

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

### Backend

```env
DATABASE_URL=
DIRECT_URL=

JWT_SECRET=

SUPABASE_URL=
SUPABASE_ANON_KEY=

EMAIL_USER=
EMAIL_PASS=
```

### Frontend

```env
VITE_API_URL=
```

---

## Author

**Siddharth Pulugujja**

B.Tech Computer Science and Engineering

National Institute of Technology Warangal

---

## Conclusion

SecureInk provides a secure, efficient, and legally compliant solution for digital document signing and verification. By replacing traditional paper-based workflows with a modern cloud-based platform, SecureInk improves efficiency, reduces costs, enhances security, and simplifies document management.
