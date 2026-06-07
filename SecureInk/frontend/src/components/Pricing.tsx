interface PricingProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for students and personal use.",
    features: [
      "5 Documents / Month",
      "PDF Signing",
      "Audit Logs",
      "Email Sharing",
    ],
  },
  {
    name: "Professional",
    price: "$9/month",
    description: "For freelancers and professionals.",
    features: [
      "Unlimited Documents",
      "Advanced Audit Trails",
      "Priority Support",
      "Multiple Signers",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced requirements.",
    features: [
      "Unlimited Team Members",
      "Dedicated Support",
      "Custom Integrations",
      "Advanced Security",
    ],
  },
];

const Pricing = ({ isOpen, onClose }: PricingProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          relative
          w-full
          max-w-6xl
          rounded-3xl
          bg-white
          p-8
          shadow-2xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="
            absolute
            top-6
            right-6
            text-3xl
            text-slate-500
            hover:text-slate-900
          "
        >
          ×
        </button>

        {/* Header */}

        <div className="text-center">
          <p className="font-semibold text-blue-600">PRICING</p>

          <h2 className="mt-3 text-5xl font-bold text-slate-900">
            Choose Your Plan
          </h2>

          <p className="mt-4 text-slate-600">
            Simple pricing for individuals, professionals, and growing
            businesses.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                rounded-3xl
                border
                p-8
                transition
                hover:shadow-xl
                ${
                  plan.popular
                    ? "border-blue-500 shadow-xl scale-105"
                    : "border-slate-200"
                }
              `}
            >
              {plan.popular && (
                <span
                  className="
                    inline-block
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    text-blue-600
                  "
                >
                  Most Popular
                </span>
              )}

              <h3 className="mt-4 text-2xl font-bold">{plan.name}</h3>

              <div className="mt-6">
                <span className="text-5xl font-bold">{plan.price}</span>
              </div>

              <p className="mt-4 text-slate-600">{plan.description}</p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`
                  mt-10
                  w-full
                  rounded-xl
                  py-3
                  font-semibold
                  transition
                  ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-300 hover:bg-slate-50"
                  }
                `}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
