import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode, Children } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
}

export const StaggerChildren = ({
  children,
  className = '',
  staggerDelay = 0.1,
  duration = 0.5,
  once = true,
}: StaggerChildrenProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerChildren;
