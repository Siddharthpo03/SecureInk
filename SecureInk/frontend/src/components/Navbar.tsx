const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">
            Secure<span className="text-blue-600">Ink</span>
          </span>
        </div>

        <div className="hidden md:flex gap-8 text-slate-600">
          <a href="#">Features</a>
          <a href="#">How it Works</a>
          <a href="#">Pricing</a>
        </div>

        <div className="flex gap-4">
          <button className="text-slate-600">Login</button>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
