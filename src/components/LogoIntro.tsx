import { useEffect, useState } from "react";
import restaurantLogo from "@/assets/restaurant-logo.png";

export const LogoIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 1000); // Allow zoom out and fade out to complete
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-all duration-1000 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={restaurantLogo}
        alt="Swadishta"
        className="w-64 h-64 md:w-96 md:h-96 transition-all duration-1000 ease-in-out"
        style={{
          objectFit: "contain",
          transform: isAnimating ? "scale(1)" : "scale(2)",
          opacity: isAnimating ? 1 : 0,
        }}
      />
    </div>
  );
};
