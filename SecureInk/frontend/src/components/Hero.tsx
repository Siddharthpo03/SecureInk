import { ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <ShieldCheck size={18} />
              Secure Digital Signatures
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-slate-900">
              Sign Documents
              <br />
              <span className="text-blue-600">Securely.</span>
              <br />
              Anywhere.
            </h1>

            <p className="text-slate-600 mt-6 text-lg">
              Upload, sign, and manage documents with enterprise-grade security,
              audit trails, and legally traceable signatures.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                className="
      bg-blue-600
      text-white
      px-7
      py-4
      rounded-xl
      font-semibold
      shadow-lg
      hover:scale-105
      transition
    "
              >
                Start Signing
              </button>

              <button
                className="
      border
      border-slate-300
      bg-white
      px-7
      py-4
      rounded-xl
      font-semibold
      hover:bg-slate-50
      transition
    "
              >
                Watch Demo
              </button>

              <div className="flex flex-wrap gap-6 mt-8 text-slate-600">
                <span>✓ Secure Storage</span>

                <span>✓ Audit Trails</span>

                <span>✓ PDF Signing</span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="bg-slate-100 rounded-xl h-72 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-semibold text-xl">PDF Document</p>

                  <p className="my-4 text-4xl">↓</p>

                  <p className="font-semibold text-green-600">
                    Signed & Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
