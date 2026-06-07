import { Upload, PenTool, Send, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Document",
    description: "Upload contracts, agreements, and PDFs securely.",
  },
  {
    icon: PenTool,
    title: "Add Signature Fields",
    description: "Place signature areas anywhere on the document.",
  },
  {
    icon: Send,
    title: "Send Signing Link",
    description: "Share secure signing links with recipients.",
  },
  {
    icon: FileCheck,
    title: "Receive Signed PDF",
    description: "Get legally traceable signed documents instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="font-semibold text-blue-600">HOW IT WORKS</p>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            Sign Documents
            <br />
            In Four Simple Steps
          </h2>

          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            SecureInk streamlines document signing from upload to final
            approval.
          </p>
        </div>

        <div className="mt-20 grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Icon className="text-blue-600" size={30} />
                  </div>

                  <span className="inline-block mt-6 text-sm font-semibold text-blue-600">
                    STEP {index + 1}
                  </span>

                  <h3 className="mt-3 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-slate-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
