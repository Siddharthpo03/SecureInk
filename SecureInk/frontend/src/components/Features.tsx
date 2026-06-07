import { FileText, PenSquare, ShieldCheck, Clock3 } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Document Management",
    description:
      "Upload, organize, and securely manage all your PDF documents.",
  },
  {
    icon: PenSquare,
    title: "Digital Signatures",
    description:
      "Place signatures anywhere with a seamless signing experience.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Protected storage, JWT authentication, and secure access control.",
  },
  {
    icon: Clock3,
    title: "Audit Trails",
    description:
      "Track every signature, action, and document update in real time.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="text-blue-600 font-semibold">FEATURES</p>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            Everything You Need
            <br />
            To Sign Securely
          </h2>

          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            SecureInk provides enterprise-grade tools for digital document
            workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  bg-white
                  p-8
                  rounded-3xl
                  border
                  border-slate-200
                  shadow-sm
                  hover:shadow-xl
                  transition
                "
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Icon className="text-blue-600" size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
