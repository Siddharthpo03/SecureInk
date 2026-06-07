const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <div>
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Secure Digital Signatures
            </span>

            <h1 className="mt-6 text-6xl font-extrabold leading-tight text-slate-900">
              Sign Documents
              <span className="block text-blue-600">Securely.</span>
            </h1>

            <p className="mt-6 max-w-xl text-xl text-slate-600">
              Upload, sign, and manage documents with enterprise-grade security,
              complete audit trails, and legally traceable signatures.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg hover:bg-blue-700 transition">
                Start Signing
              </button>

              <button className="rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 hover:bg-slate-50 transition">
                Watch Demo
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
              <span>✓ Secure Storage</span>
              <span>✓ Audit Trails</span>
              <span>✓ PDF Signing</span>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Employment_Agreement.pdf
                  </span>

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    Pending
                  </span>
                </div>

                <div className="mt-8 rounded-xl border bg-white p-6">
                  <div className="space-y-4">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  </div>

                  <div className="mt-12 flex justify-end">
                    <div className="rounded-lg border-2 border-dashed border-blue-400 bg-blue-50 px-4 py-3 text-blue-600">
                      Sign Here
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-slate-500">Signature Progress</span>

                  <span className="font-semibold text-green-600">
                    1 / 1 Pending
                  </span>
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
