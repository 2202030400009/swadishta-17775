import { useEffect, useState } from "react";
import restaurantLogo from "@/assets/restaurant-logo.png";

export const LogoIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 300); // Allow fade out to complete
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={restaurantLogo}
        alt="Swadishta"
        className={`transition-all duration-1000 ease-in-out ${
          isAnimating
            ? "w-64 h-64 md:w-96 md:h-96"
            : "w-12 h-12 fixed top-4 left-4"
        }`}
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
};
