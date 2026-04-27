"use client";
import React from "react";

const LightRays = () => {
  return (
    <>
      <style>{`
        .light-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .ray {
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            120deg,
            transparent 40%,
            rgba(255, 39, 39, 0.15),
            transparent 60%
          );
          animation: moveRays 12s linear infinite;
        }

        .ray1 {
          top: -50%;
          left: -50%;
        }

        .ray2 {
          top: -60%;
          left: -30%;
          animation-delay: 2s;
        }

        .ray3 {
          top: -40%;
          left: -70%;
          animation-delay: 4s;
        }

        .ray4 {
          top: -70%;
          left: -20%;
          animation-delay: 6s;
        }

        @keyframes moveRays {
          0% {
            transform: rotate(0deg) translateX(0);
          }
          100% {
            transform: rotate(360deg) translateX(120px);
          }
        }
      `}</style>

      <div className="light-container">
        <div className="ray ray1"></div>
        <div className="ray ray2"></div>
        <div className="ray ray3"></div>
        <div className="ray ray4"></div>
      </div>
    </>
  );
};

export default LightRays;