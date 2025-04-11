"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

interface LoadingScreenProps {
  children: React.ReactNode;
}

export const LoadingScreen = ({ children }: LoadingScreenProps) => {
  const [loading, setLoading] = useState(true);

  // const splineViewer = `
  //     <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js"></script>
  //     <spline-viewer url="https://prod.spline.design/gdAGhcuJi835JTZe/scene.splinecode"></spline-viewer>
  // `;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // return () => {
      //   const script = document.createElement('script');
      //   script.type = 'module';
      //   script.innerHTML = splineViewer;
      //   document.body.appendChild(script);
      // }
    }, 6000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {/* {loading && (
        <div className="hidden" dangerouslySetInnerHTML={{ __html: splineViewer }} />
      )} */}

      <AnimatePresence mode="wait">
        {loading ? (
          <StyledWrapper>
            <div>
              <div className="container">
                <div className="dot dot-1" />
                <div className="dot dot-2" />
                <div className="dot dot-3" />
              </div>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="goo">
                    <feGaussianBlur result="blur" stdDeviation={10} in="SourceGraphic" />
                    <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" mode="matrix" in="blur" />
                  </filter>
                </defs>
              </svg>
            </div>
          </StyledWrapper>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const StyledWrapper = styled.div`
  .container {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    filter: url("#goo");
    animation: rotate-move 2s ease-in-out infinite;
  }

  .dot {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .dot-3 {
    background-color: #3c27dd;
    animation: dot-3-move 2s ease infinite, index 6s ease infinite;
  }

  .dot-2 {
    background-color: #7429dd;
    animation: dot-2-move 2s ease infinite, index 6s -4s ease infinite;
  }

  .dot-1 {
    background-color: #282828;
    animation: dot-1-move 2s ease infinite, index 6s -2s ease infinite;
  }

  @keyframes dot-3-move {
    20% {
      transform: scale(1);
    }
    45% {
      transform: translateY(-18px) scale(0.45);
    }
    60% {
      transform: translateY(-90px) scale(0.45);
    }
    80% {
      transform: translateY(-90px) scale(0.45);
    }
    100% {
      transform: translateY(0px) scale(1);
    }
  }

  @keyframes dot-2-move {
    20% {
      transform: scale(1);
    }
    45% {
      transform: translate(-16px, 12px) scale(0.45);
    }
    60% {
      transform: translate(-80px, 60px) scale(0.45);
    }
    80% {
      transform: translate(-80px, 60px) scale(0.45);
    }
    100% {
      transform: translateY(0px) scale(1);
    }
  }

  @keyframes dot-1-move {
    20% {
      transform: scale(1);
    }
    45% {
      transform: translate(16px, 12px) scale(0.45);
    }
    60% {
      transform: translate(80px, 60px) scale(0.45);
    }
    80% {
      transform: translate(80px, 60px) scale(0.45);
    }
    100% {
      transform: translateY(0px) scale(1);
    }
  }

  @keyframes rotate-move {
    55% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    80% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes index {
    0%,
    100% {
      z-index: 3;
    }
    33.3% {
      z-index: 2;
    }
    66.6% {
      z-index: 1;
    }
  }`;
