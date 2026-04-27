import React from 'react';
import { motion } from "framer-motion";
import styled from "styled-components"; 

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #111018;
`;

const Dots = styled.div`
  display: flex;
  gap: 10px;
`;

const Dot = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: ${props => colors[props.index] || '#fff'};
  border-radius: 50%;
`;

const colors = ["#ff3b30", "#ffd60a", "#34c759"];

const dotVariants = {
  initial: {
    y: 0,
    opacity: 0.6
  },
  animate: {
    y: [-10, 0, -10],
    opacity: [1, 0.6, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotLoader = () => {
  return (
    <LoaderContainer>
      <Dots as={motion.div} variants={containerVariants} initial="initial" animate="animate">
        {colors.map((_, i) => (
          <Dot 
            key={i} 
            index={i} 
            variants={dotVariants}
          />
        ))}
      </Dots>
    </LoaderContainer>
  );
};

export default DotLoader;