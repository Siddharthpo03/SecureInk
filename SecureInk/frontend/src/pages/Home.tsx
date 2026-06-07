import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Security from "../components/Security";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home = () => {
  const [pricingOpen, setPricingOpen] = useState(false);
  return (
    <>
      <Navbar openPricing={() => setPricingOpen(true)} />
      <Hero />
      <Features />
      <HowItWorks />
      <Security />
      <CTA openPricing={() => setPricingOpen(true)} />
      <Pricing isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />
      <Footer />
    </>
  );
};

export default Home;
