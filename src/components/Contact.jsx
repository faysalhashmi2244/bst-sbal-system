import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    // Show success message
    alert("Message sent successfully!");
  };

  return (
    <section
      className={`py-20 px-4 relative ${isDarkMode ? "bg-cyber-dark/30" : "bg-cyber-light/30"}`}
      id="contact"
    >
      {/* Background grid decoration */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>
      {/* Animated accent lines */}
      <div
        className={`absolute left-0 top-0 w-1 h-full ${isDarkMode ? "bg-neon-blue/20" : "bg-neon-green/20"}`}
      ></div>
      <div
        className={`absolute right-0 top-0 w-1 h-full ${isDarkMode ? "bg-neon-green/20" : "bg-neon-blue/20"}`}
      ></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 relative">
          <div
            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 ${isDarkMode ? "bg-neon-blue" : "bg-neon-green"}`}
          ></div>

          <h2
            className={`text-5xl font-display ${isDarkMode ? "text-white" : "text-cyber-dark"} mb-6 tracking-wider`}
          >
            <span
              className={`${isDarkMode ? "text-neon-blue" : "text-neon-green"} ${isDarkMode ? "text-shadow-neon-blue" : "text-shadow-neon-green"}`}
            >
              {t("contact.title") || "Contact"}
            </span>{" "}
            {t("contact.titleSuffix") || "Us"}
          </h2>

          <p
            className={`text-xl ${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} max-w-2xl mx-auto font-future mb-10`}
          >
            {t("contact.subtitle") ||
              "Have questions or feedback? We'd love to hear from you"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`${isDarkMode ? "bg-cyber-dark/70" : "bg-white/70"} p-8 border ${isDarkMode ? "border-neon-blue/30" : "border-neon-blue/50"} rounded-md backdrop-blur-sm relative overflow-hidden`}
          >
            {/* Background grid pattern */}
            <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none"></div>

            <h3
              className={`text-2xl font-display text-neon-blue mb-6 tracking-wider`}
            >
              {t("contact.getInTouch") || "Get In Touch"}
            </h3>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start">
                <div className="text-neon-blue mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4
                    className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-display`}
                  >
                    Email
                  </h4>
                  <p
                    className={`${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} font-future`}
                  >
                    contact@sbalsystem.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-neon-purple mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <div>
                  <h4
                    className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-display`}
                  >
                    Discord
                  </h4>
                  <p
                    className={`${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} font-future`}
                  >
                    discord.gg/sbalsystem
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-neon-green mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4
                    className={`${isDarkMode ? "text-white" : "text-cyber-dark"} font-display`}
                  >
                    {t("contact.socialMedia") || "Social Media"}
                  </h4>
                  <div className="flex space-x-4 mt-2">
                    <a
                      href="#"
                      className={`${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} hover:text-neon-blue transition-colors font-future`}
                    >
                      Twitter
                    </a>
                    <a
                      href="#"
                      className={`${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} hover:text-neon-purple transition-colors font-future`}
                    >
                      Telegram
                    </a>
                    <a
                      href="#"
                      className={`${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} hover:text-neon-pink transition-colors font-future`}
                    >
                      Medium
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-blue"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-blue"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-blue"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-blue"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`${isDarkMode ? "bg-cyber-dark/70" : "bg-white/70"} p-8 border ${isDarkMode ? "border-neon-green/30" : "border-neon-green/50"} rounded-md backdrop-blur-sm relative overflow-hidden`}
          >
            {/* Background grid pattern */}
            <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label
                  htmlFor="name"
                  className={`block mb-2 text-sm font-future uppercase tracking-wider ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"}`}
                >
                  {t("contact.form.name") || "Your Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={
                    t("contact.form.namePlaceholder") || "Enter your name"
                  }
                  className={`w-full px-4 py-2 ${isDarkMode ? "bg-cyber-black/50" : "bg-white/50"} border ${isDarkMode ? "border-neon-green/30" : "border-neon-green/50"} backdrop-blur-sm ${isDarkMode ? "text-white" : "text-cyber-dark"} focus:outline-none focus:ring-2 focus:ring-neon-green/50 font-future`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-future uppercase tracking-wider ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"}`}
                >
                  {t("contact.form.email") || "Your Email"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={
                    t("contact.form.emailPlaceholder") || "Enter your email"
                  }
                  className={`w-full px-4 py-2 ${isDarkMode ? "bg-cyber-black/50" : "bg-white/50"} border ${isDarkMode ? "border-neon-green/30" : "border-neon-green/50"} backdrop-blur-sm ${isDarkMode ? "text-white" : "text-cyber-dark"} focus:outline-none focus:ring-2 focus:ring-neon-green/50 font-future`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className={`block mb-2 text-sm font-future uppercase tracking-wider ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"}`}
                >
                  {t("contact.form.subject") || "Subject"}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder={
                    t("contact.form.subjectPlaceholder") || "Enter subject"
                  }
                  className={`w-full px-4 py-2 ${isDarkMode ? "bg-cyber-black/50" : "bg-white/50"} border ${isDarkMode ? "border-neon-green/30" : "border-neon-green/50"} backdrop-blur-sm ${isDarkMode ? "text-white" : "text-cyber-dark"} focus:outline-none focus:ring-2 focus:ring-neon-green/50 font-future`}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={`block mb-2 text-sm font-future uppercase tracking-wider ${isDarkMode ? "text-white/60" : "text-cyber-dark/60"}`}
                >
                  {t("contact.form.message") || "Your Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={
                    t("contact.form.messagePlaceholder") || "Enter your message"
                  }
                  rows="5"
                  className={`w-full px-4 py-2 ${isDarkMode ? "bg-cyber-black/50" : "bg-white/50"} border ${isDarkMode ? "border-neon-green/30" : "border-neon-green/50"} backdrop-blur-sm ${isDarkMode ? "text-white" : "text-cyber-dark"} focus:outline-none focus:ring-2 focus:ring-neon-green/50 font-future resize-none`}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full py-3 px-6 bg-transparent border-2 border-neon-green text-neon-green font-display uppercase tracking-wider hover:bg-neon-green/10 transition-all duration-300 relative overflow-hidden group`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-neon-green/0 group-hover:bg-neon-green/10 transition-colors duration-300`}
                  ></div>
                  <span className="relative z-10">
                    {t("contact.form.submit") || "Send Message"}
                  </span>
                </button>
              </div>
            </form>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-green"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-green"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-green"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-green"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
