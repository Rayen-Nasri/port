"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { PasswordValidation } from './PasswordValidation';

export const IpadLoadingScreen = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [existPass, setExistPass] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);

  useEffect(() => {
    // Check if password exists in localStorage
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("hasPassword") === "true") {
        setExistPass(true);
      }
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  const handlePasswordSuccess = () => {
    setPasswordValidated(true);
  };

  return (
    <div className="relative ">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <StyledWrapper>
            <div className='relative z-10 h-[80vh] flex flex-col items-center justify-center'>
              <div className="loader" />
            </div>
          </StyledWrapper>

        ) : (
          existPass ? (
            passwordValidated ? (
              <div>
                {children}
              </div>
            ) : (
              <PasswordValidation 
                onSuccess={handlePasswordSuccess} 
                isNewPassword={false} 
              />
            )
          ) : (
            <div>{children}</div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};



const StyledWrapper = styled.div`
.loader {
}

.loader {
  width: 48px;
  height: 48px;
  position: relative;
}

.loader::before , .loader::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50% , -50%);
  width: 48em;
  height: 48em;
  background-image: radial-gradient(circle 10px, #3a177c 100%, transparent 0),
    radial-gradient(circle 10px, #3a177c 100%, transparent 0),
    radial-gradient(circle 10px, #3a177c 100%, transparent 0),
    radial-gradient(circle 10px, #3a177c 100%, transparent 0),
    radial-gradient(circle 10px, #3a177c 100%, transparent 0),
    radial-gradient(circle 10px, #3a177c 100%, transparent 0),
    radial-gradient(circle 10px, #3a177c 100%, transparent 0),
    radial-gradient(circle 10px, #3a177c 100%, transparent 0);
  background-position: 0em -18em, 0em 18em, 18em 0em, -18em 0em,
                       13em -13em, -13em -13em, 13em 13em, -13em 13em;
  background-repeat: no-repeat;
  font-size: 0.5px;
  border-radius: 50%;
  animation: blast 1s ease-in infinite;
}

.loader::after {
  font-size: 1px;
  background: #3a177c;
  animation: bounce 1s ease-in infinite;
}

@keyframes bounce {
  0% , 100% {
    font-size: 0.75px
  }

  50% {
    font-size: 1.5px
  }
}

@keyframes blast {
  0% , 40% {
    font-size: 0.5px;
  }

  70% {
    opacity: 1;
    font-size: 4px;
  }

  100% {
    font-size: 6px;
    opacity: 0;
  }
}`;

