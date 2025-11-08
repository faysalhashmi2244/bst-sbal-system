import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";

const TeamMember = ({
  name,
  role,
  description,
  specialty,
  image,
  delay,
  color = "neon-blue",
}) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className={`cyber-card border-${color} overflow-hidden group relative ${isDarkMode ? "bg-cyber-gray/30" : "bg-cyber-light/70"}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none"></div>

      {/* Holographic overlay effect */}
      <div
        className={`absolute inset-0 opacity-20 holographic-effect pointer-events-none z-0 bg-gradient-to-r from-transparent via-${color}/30 to-transparent`}
      />

      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="glitch-box">
            <h3
              className={`text-xl font-display tracking-wider ${isDarkMode ? "text-white" : "text-cyber-dark"} mb-1`}
            >
              {name}
            </h3>
            <p className={`text-${color}`}>{role}</p>
          </div>
        </div>
      </div>
      <div
        className={`p-4 ${isDarkMode ? "bg-cyber-dark/60" : "bg-white/50"} backdrop-blur-sm border-t border-${color}`}
      >
        <p
          className={`${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} text-sm mb-3 font-future`}
        >
          {description}
        </p>
        <div
          className={`text-xs font-mono py-1 px-2 rounded bg-${color}/20 text-${color} inline-block`}
        >
          <span className="mr-2">⚡</span> {specialty}
        </div>
        <div className="mt-4 flex space-x-3">
          <a
            href="#"
            className={`text-${color} hover:text-${isDarkMode ? "white" : "cyber-dark"} transition-colors duration-300`}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a
            href="#"
            className={`text-${color} hover:text-${isDarkMode ? "white" : "cyber-dark"} transition-colors duration-300`}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className={`text-${color} hover:text-${isDarkMode ? "white" : "cyber-dark"} transition-colors duration-300`}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Corner accents */}
      <div
        className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-${color}`}
      ></div>
      <div
        className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-${color}`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-${color}`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-${color}`}
      ></div>
    </motion.div>
  );
};

const Team = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const teamMembers = [
    {
      name: "Dr. Satoshi Nakamoto",
      role: t("team.member1.role"),
      description: t("team.member1.description"),
      specialty: t("team.member1.specialty"),
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      delay: 0.1,
      color: "neon-blue",
    },
    {
      name: "Elena Rodriguez",
      role: t("team.member2.role"),
      description: t("team.member2.description"),
      specialty: t("team.member2.specialty"),
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      delay: 0.2,
      color: "neon-purple",
    },
    {
      name: "Marcus Wei",
      role: t("team.member3.role"),
      description: t("team.member3.description"),
      specialty: t("team.member3.specialty"),
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      delay: 0.3,
      color: "neon-pink",
    },
    {
      name: "Olivia Zhao",
      role: t("team.member4.role"),
      description: t("team.member4.description"),
      specialty: t("team.member4.specialty"),
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      delay: 0.4,
      color: "neon-green",
    },
  ];

  return (
    <section
      className={`py-20 px-4 relative ${isDarkMode ? "bg-cyber-dark/30" : "bg-cyber-light/30"}`}
      id="team"
    >
      {/* Background grid decoration */}
      <div className="absolute inset-0 cyber-grid-bg opacity-5 pointer-events-none"></div>
      {/* Animated accent lines */}
      <div
        className={`absolute left-0 top-0 w-1 h-full ${isDarkMode ? "bg-neon-purple/20" : "bg-neon-blue/20"}`}
      ></div>
      <div
        className={`absolute right-0 top-0 w-1 h-full ${isDarkMode ? "bg-neon-green/20" : "bg-neon-purple/20"}`}
      ></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 relative">
          <div
            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 ${isDarkMode ? "bg-neon-purple" : "bg-neon-blue"}`}
          ></div>

          <h2
            className={`text-5xl font-display ${isDarkMode ? "text-white" : "text-cyber-dark"} mb-6 tracking-wider`}
          >
            <span
              className={`${isDarkMode ? "text-neon-purple" : "text-neon-blue"} ${isDarkMode ? "text-shadow-neon-purple" : "text-shadow-neon-blue"}`}
            >
              {t("team.titleHighlight")}
            </span>{" "}
            {t("team.title")}
          </h2>

          <p
            className={`text-xl ${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} max-w-2xl mx-auto font-future mb-10`}
          >
            {t("team.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              specialty={member.specialty}
              image={member.image}
              delay={member.delay}
              color={member.color}
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
            className={`p-8 max-w-3xl mx-auto border ${isDarkMode ? "border-neon-purple/30" : "border-neon-purple/50"} rounded-md ${isDarkMode ? "bg-cyber-dark/70" : "bg-white/70"} backdrop-blur-sm`}
          >
            <h3
              className={`text-2xl font-display text-neon-purple mb-4 tracking-wider`}
            >
              {t("team.joinCommunity")}
            </h3>
            <p
              className={`${isDarkMode ? "text-white/80" : "text-cyber-dark/80"} mb-6 font-future`}
            >
              {t("team.communityDescription")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className={`px-6 py-2 text-sm border-2 border-neon-blue bg-transparent text-neon-blue font-display uppercase tracking-wider hover:bg-neon-blue/10 transition-all duration-300 relative overflow-hidden group`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                }}
              >
                <div
                  className={`absolute inset-0 bg-neon-blue/0 group-hover:bg-neon-blue/10 transition-colors duration-300`}
                ></div>
                <span className="relative z-10">
                  <span className="mr-2">💬</span> Discord
                </span>
              </a>
              <a
                href="#"
                className={`px-6 py-2 text-sm border-2 border-neon-purple bg-transparent text-neon-purple font-display uppercase tracking-wider hover:bg-neon-purple/10 transition-all duration-300 relative overflow-hidden group`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                }}
              >
                <div
                  className={`absolute inset-0 bg-neon-purple/0 group-hover:bg-neon-purple/10 transition-colors duration-300`}
                ></div>
                <span className="relative z-10">
                  <span className="mr-2">📱</span> Telegram
                </span>
              </a>
              <a
                href="#"
                className={`px-6 py-2 text-sm border-2 border-neon-pink bg-transparent text-neon-pink font-display uppercase tracking-wider hover:bg-neon-pink/10 transition-all duration-300 relative overflow-hidden group`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                }}
              >
                <div
                  className={`absolute inset-0 bg-neon-pink/0 group-hover:bg-neon-pink/10 transition-colors duration-300`}
                ></div>
                <span className="relative z-10">
                  <span className="mr-2">🐦</span> Twitter
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
