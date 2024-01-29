import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = ({ children }) => {
  const scrollManager = useRef(null);
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      const appearElements = document.querySelectorAll(".appear");

      appearElements.forEach((element) => {
        gsap.from(element, {
          x: 60,

          y: 1,
          duration: 1.5,
          opacity: 0,
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scroller: scrollManager.current,
            toggleActions: "restart play restart none",
            // scrub: true,
            // markers: true,
          },
        });
      });
    }, 100); // Adjust the delay as needed

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [children, location.pathname]);

  return (
    <div
      ref={scrollManager}
      style={{
        width: "100%",
        height: "100%",  // Set height explicitly
        minHeight:
          (location.pathname === "/login" ||
            location.pathname === "/new-profile")
            ? "100vh"
            : "calc(100vh - 80px)",
        overflowY: "auto",
        background: "linear-gradient(220deg,#0c243c 0%, #06121f 54.26%, #020e1c 100%)",
        position: "relative",
        padding: "0px",
        maxHeight: "calc(100vh - 80px)",
      }}
    >
      {children}
    </div>

  );
};

export default Wrapper;
