
import { useEffect, useState, useRef } from "react";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  color: string;
}

const StatisticsSection = () => {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationTriggered = useRef<boolean>(false);

  const stats: StatItem[] = [
    { value: 975, label: "Nobel Laureates", suffix: "+", color: "bg-blue-800" },
    { value: 603, label: "Prizes Awarded", suffix: "", color: "bg-yellow-500" },
    { value: 62, label: "Female Laureates", suffix: "", color: "bg-purple-600" },
    { value: 6, label: "Prize Categories", suffix: "", color: "bg-green-600" }
  ];

  const animateValue = (start: number, end: number, duration: number, index: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);

      setAnimatedValues(prev => {
        const newValues = [...prev];
        newValues[index] = currentValue;
        return newValues;
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animationTriggered.current) {
          animationTriggered.current = true;
          stats.forEach((stat, index) => {
            animateValue(0, stat.value, 1500, index);
          });
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center">
                <div className={`${stat.color} h-2 w-16 rounded-full mb-4`}></div>
              </div>
              <p className="text-4xl font-extrabold text-gray-900">
                {animatedValues[index].toLocaleString()}
                {stat.suffix}
              </p>
              <p className="mt-2 text-lg text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
