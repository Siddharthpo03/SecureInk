import { ShieldCheck, Lock, FileCheck, Clock3 } from "lucide-react";

const Security = () => {
  const items = [
    {
      icon: ShieldCheck,
      title: "JWT Authentication",
      description:
        "Protected access with secure authentication and authorization.",
    },
    {
      icon: Lock,
      title: "Secure Storage",
      description:
        "Documents stored securely with controlled access permissions.",
    },
    {
      icon: FileCheck,
      title: "Document Integrity",
      description:
        "Prevent tampering and maintain trustworthy signed documents.",
    },
    {
      icon: Clock3,
      title: "Audit Trails",
      description: "Track every upload, view, signature, and action performed.",
    },
  ];

  return (
    <section id="security" className="py-28 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-semibold text-blue-400">SECURITY & COMPLIANCE</p>

            <h2 className="mt-4 text-5xl font-bold leading-tight">
              Built For Trust.
              <br />
              Designed For Security.
            </h2>

            <p className="mt-6 text-slate-300 text-lg">
              Every document, signature, and action is protected through
              enterprise-grade security practices and complete auditability.
            </p>

            <div className="mt-8 space-y-4">
              <div>✓ JWT Authentication</div>
              <div>✓ Secure Document Access</div>
              <div>✓ Audit Logging</div>
              <div>✓ Tokenized Signing Links</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    bg-slate-800
                    border
                    border-slate-700
                    rounded-3xl
                    p-6
                  "
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <Icon size={28} className="text-blue-400" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>

                  <p className="mt-3 text-slate-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
