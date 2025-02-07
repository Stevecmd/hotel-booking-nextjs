"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A button component that appears when the user scrolls past 30% of the page height
 * and allows them to smoothly scroll back to the top of the page.
 * 
 * @component
 * @example
 * ```jsx
 * <ScrollButton />
 * ```
 * 
 * @returns {JSX.Element} A button element fixed to the bottom-right corner that
 * becomes visible when scrolling and triggers a smooth scroll to top when clicked
 */
const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const totalHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - window.innerHeight;

      const scrollPercentage = (scrollPosition / totalHeight) * 100;
      setIsVisible(scrollPercentage >= 30);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  /**
   * Ensures the window scrolls completely to the top using a recursive approach
   * @param {number} [attempt=0] - The current attempt number
   */
  const scrollToTop = (attempt = 0) => {
    setIsScrolling(true);

    // Scroll using multiple methods for compatibility
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });

    // Check if we've reached the top
    const checkIfScrollComplete = () => {
      const currentPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      if (currentPosition > 0) {
        // If not at top, force scroll to top
        if (attempt < 2) {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          
          // Try again after a short delay
          setTimeout(() => scrollToTop(attempt + 1), 100);
        }
      } else {
        setIsScrolling(false);
      }
    };

    // Wait for smooth scroll to complete
    setTimeout(checkIfScrollComplete, 500);
  };

  return (
    <button
      type="button"
      onClick={() => !isScrolling && scrollToTop()}
      disabled={isScrolling}
      className={cn(
        "fixed bottom-4 right-4 z-50 p-2 rounded-full bg-gray-300 text-white shadow-lg transition-all duration-300 hover:bg-gray-700",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className={cn(
        "h-6 w-6",
        isScrolling && "animate-bounce"
      )} />
    </button>
  );
};

export default ScrollButton;
