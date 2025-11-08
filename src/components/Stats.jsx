import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const AnimatedCounter = ({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function
      const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
      const easedProgress = easeOutQuart(progress);

      countRef.current = easedProgress * value;
      setCount(countRef.current);

      if (progress === 1) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <span className="font-mono">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const StatCard = ({ title, value, prefix, suffix, decimals, color, delay }) => {
  return (
    <motion.div
      className={`cyber-card border-${color} shadow-${color}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <h3 className={`text-xl font-cyber text-${color} mb-2`}>{title}</h3>
      <p className="text-4xl font-bold text-white">
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </p>
    </motion.div>
  );
};

const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t("stats.users"),
      value: 103500,
      prefix: "",
      suffix: "+",
      decimals: 0,
      color: "neon-blue",
    },
    {
      title: t("stats.volume"),
      value: 25.7,
      prefix: "$",
      suffix: "M",
      decimals: 1,
      color: "neon-purple",
    },
    {
      title: t("stats.chains"),
      value: 5,
      prefix: "",
      suffix: "",
      decimals: 0,
      color: "neon-pink",
    },
    {
      title: t("stats.apy"),
      value: 12.5,
      prefix: "",
      suffix: "%",
      decimals: 1,
      color: "neon-green",
    },
  ];

  return (
    <section className="py-16 px-4 bg-cyber-dark/50" id="stats">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              color={stat.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
