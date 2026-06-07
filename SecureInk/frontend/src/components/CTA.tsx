interface CTAProps {
  openPricing: () => void;
}

const CTA = ({ openPricing }: CTAProps) => {
  return (
    <section className="py-28 bg-blue-600">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-white">
          Ready to Go Paperless?
        </h2>

        <p className="mt-6 text-xl text-blue-100">
          Upload, sign, and manage documents securely with SecureInk.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="
      bg-white
      text-blue-600
      px-8
      py-4
      rounded-xl
      font-semibold
      shadow-lg
      hover:scale-105
      transition
    "
          >
            Get Started Free
          </button>

          <button
            className="
      border
      border-blue-300
      text-white
      px-8
      py-4
      rounded-xl
      font-semibold
      hover:bg-blue-500
      transition
    "
          >
            Contact Sales
          </button>

          <button
            onClick={openPricing}
            className="
      bg-blue-700
      text-white
      px-8
      py-4
      rounded-xl
      font-semibold
      hover:bg-blue-800
      transition
    "
          >
            View Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
