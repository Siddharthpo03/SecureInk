const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-white">
              Secure<span className="text-blue-500">Ink</span>
            </h2>

            <p className="mt-4 text-slate-400">
              Secure digital signatures, document workflows, and
              enterprise-grade audit trails.
            </p>
          </div>

          {/* Product */}

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>

            <ul className="space-y-3">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#security" className="hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500">
            © 2026 SecureInk. All rights reserved.
          </p>

          <p className="text-slate-500 mt-4 md:mt-0">
            Built by Siddharth Pulugujja
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
