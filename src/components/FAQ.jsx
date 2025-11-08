import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { useTranslation } from "react-i18next";

const FAQItem = ({ question, answer, index, color = "neon-blue" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <button
        className={`w-full text-left p-4 flex justify-between items-center border border-${color} ${isOpen ? `bg-${color}/10` : isDarkMode ? "bg-cyber-dark/70" : "bg-cyber-light/70"} rounded-md backdrop-blur-sm relative overflow-hidden transition-all duration-300`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none"></div>

        <span
          className={`${isDarkMode ? "text-white" : "text-cyber-dark"} text-lg font-display tracking-wider relative z-10`}
        >
          {question}
        </span>
        <span
          className={`text-${color} transition-transform duration-300 ${isOpen ? "rotate-180" : ""} relative z-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      <motion.div
        className="overflow-hidden"
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`p-4 ${isDarkMode ? "bg-cyber-black/30" : "bg-white/30"} backdrop-blur-sm border-l border-r border-b border-${color} ${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} font-future`}
        >
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const faqItems = [
    {
      question: t("faq.question1") || "What is SBAL SYSTEM?",
      answer:
        t("faq.answer1") ||
        "SBAL (Smart Base Affiliate Loop) is a revolutionary income system built on the BST ecosystem. It's designed to provide predictable, profitable, and people-powered income through a simple one-time activation with no staking, no token locking, and no rebuy requirements.",
      color: "neon-blue",
    },
    {
      question: t("faq.question2") || "How does SBAL work?",
      answer:
        t("faq.answer2") ||
        "SBAL works on a simple three-step process: 1) Buy once - make a one-time purchase of any Smart Base package, 2) Refer - share the opportunity with others, and 3) Earn forever - enjoy continuous income through multiple streams without any rebuy requirements.",
      color: "neon-purple",
    },

    {
      question: t("faq.question4") || "What are Smart Base packages?",
      answer:
        t("faq.answer4") ||
        "Smart Base packages are one-time purchases that activate your SBAL income system. They range from Ignite ($100) to Prime ($15,000), with each higher level offering increased rewards and ROI. All packages have a 20-day duration for certain benefits, but your income potential continues indefinitely.",
      color: "neon-green",
    },
    {
      question: t("faq.question5") || "How does the Booster Reward work?",
      answer:
        t("faq.answer5") ||
        "The Booster Reward is an instant payout you receive when you refer just 1 person to buy any Smart Base package. The reward amount depends on your package level - for example, with Ignite ($100), you get $20 for each referral. There's no limit to how many people you can refer, so your earnings potential is unlimited.",
      color: "neon-blue",
    },
    {
      question: t("faq.question6") || "What is the Prosperity Fund?",
      answer:
        t("faq.answer6") ||
        "The Prosperity Fund is a community reward pool that collects 10% of total sales per base and distributes it every 15 days to all qualified members. To qualify, you must hold the same base for at least 15 days. Each base has a maximum of 2 payouts, ensuring the system remains sustainable.",
      color: "neon-purple",
    },

    {
      question:
        t("faq.question8") ||
        "What makes SBAL different from other crypto income systems?",
      answer:
        t("faq.answer8") ||
        "SBAL stands out because it requires no staking, no token locking, and no rebuy requirements. It's built on real utility within the BST ecosystem, which includes NFTs, GameFi, and other real-world applications. The system is designed for sustainability rather than speculation, with multiple income streams that benefit both new users and experienced networkers.",
      color: "neon-green",
    },
  ];

  return (
    <section
      className={`py-20 px-4 relative ${isDarkMode ? "bg-cyber-dark/30" : "bg-cyber-light/30"}`}
      id="faq"
    >
      {/* Background grid decoration */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>
      {/* Animated accent lines */}
      <div
        className={`absolute left-0 top-0 w-1 h-full ${isDarkMode ? "bg-neon-green/20" : "bg-neon-blue/20"}`}
      ></div>
      <div
        className={`absolute right-0 top-0 w-1 h-full ${isDarkMode ? "bg-neon-pink/20" : "bg-neon-purple/20"}`}
      ></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 relative">
          <div
            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 ${isDarkMode ? "bg-neon-green" : "bg-neon-purple"}`}
          ></div>

          <h2
            className={`text-5xl font-display ${isDarkMode ? "text-white" : "text-cyber-dark"} mb-6 tracking-wider`}
          >
            <span
              className={`${isDarkMode ? "text-neon-green" : "text-neon-purple"} ${isDarkMode ? "text-shadow-neon-green" : "text-shadow-neon-purple"}`}
            >
              {t("faq.titleHighlight") || "Frequently"}
            </span>{" "}
            {t("faq.title") || "Asked Questions"}
          </h2>

          <p
            className={`text-xl ${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} max-w-2xl mx-auto font-future mb-10`}
          >
            {t("faq.subtitle") ||
              "Everything you need to know about the SBAL SYSTEM"}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
              color={item.color}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div
            className={`p-8 max-w-3xl mx-auto border ${isDarkMode ? "border-neon-blue/30" : "border-neon-blue/50"} rounded-md ${isDarkMode ? "bg-cyber-dark/70" : "bg-white/70"} backdrop-blur-sm relative overflow-hidden`}
          >
            {/* Background grid pattern */}
            <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none"></div>

            <h3
              className={`text-2xl font-display text-neon-blue mb-4 tracking-wider`}
            >
              🔥 {t("faq.finalTitle") || "SBAL – Final Takeaway"}
            </h3>
            <p
              className={`text-2xl ${isDarkMode ? "text-white" : "text-cyber-dark"} font-display mb-6 tracking-wide`}
            >
              <span className="text-neon-purple">"</span>
              {t("faq.finalQuote") ||
                "One activation. Infinite rewards. That's the SBAL way."}
              <span className="text-neon-purple">"</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`${isDarkMode ? "bg-cyber-black/30" : "bg-white/50"} p-3 border border-neon-blue/30 rounded-md flex items-center backdrop-blur-sm`}
              >
                <span className="text-neon-blue mr-2">✔️</span>
                <span
                  className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-future`}
                >
                  {t("faq.benefit1") || "Smart structure"}
                </span>
              </div>
              <div
                className={`${isDarkMode ? "bg-cyber-black/30" : "bg-white/50"} p-3 border border-neon-blue/30 rounded-md flex items-center backdrop-blur-sm`}
              >
                <span className="text-neon-blue mr-2">✔️</span>
                <span
                  className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-future`}
                >
                  {t("faq.benefit2") || "Real ecosystem connection"}
                </span>
              </div>
              <div
                className={`${isDarkMode ? "bg-cyber-black/30" : "bg-white/50"} p-3 border border-neon-blue/30 rounded-md flex items-center backdrop-blur-sm`}
              >
                <span className="text-neon-blue mr-2">✔️</span>
                <span
                  className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-future`}
                >
                  {t("faq.benefit3") || "Instant & long-term income"}
                </span>
              </div>
              <div
                className={`${isDarkMode ? "bg-cyber-black/30" : "bg-white/50"} p-3 border border-neon-blue/30 rounded-md flex items-center backdrop-blur-sm`}
              >
                <span className="text-neon-blue mr-2">✔️</span>
                <span
                  className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-future`}
                >
                  {t("faq.benefit4") || "Perfect for teams & scale"}
                </span>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-blue"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-blue"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-blue"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-blue"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
