import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './DayNightToggle.module.css';
import type { DayNightToggleProps } from './types';

export const DayNightToggle: React.FC<DayNightToggleProps> = ({
  theme = 'light',
  scale = 3,
  onChange,
  className = ''
}) => {
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cloudIntervalRef = useRef<number | undefined>(undefined);
  const animationTimeoutRef = useRef<number | undefined>(undefined);

  // 同步 theme prop 变化
  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  // 云朵动画
  useEffect(() => {
    const animateClouds = () => {
      const clouds = containerRef.current?.querySelectorAll(`.${styles.cloudItem}`);
      if (clouds) {
        clouds.forEach((cloud) => {
          const offsets = ['2em', '-2em'];
          const xOffset = offsets[Math.floor(Math.random() * 2)];
          const yOffset = offsets[Math.floor(Math.random() * 2)];
          (cloud as HTMLElement).style.transform = `translate(${xOffset}, ${yOffset})`;
        });
      }
    };

    cloudIntervalRef.current = window.setInterval(animateClouds, 1000);
    return () => {
      if (cloudIntervalRef.current) {
        clearInterval(cloudIntervalRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    setIsHovered(false);
    setIsAnimating(true);
    
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    
    if (onChange) {
      onChange(newTheme);
    }

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = window.setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  }, [isDarkMode, isAnimating, onChange]);

  const handleMouseEnter = () => {
    if (!isAnimating) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const containerStyle = {
    fontSize: `${(scale / 3).toFixed(2)}px`
  };

  // 云朵初始位置
  const cloudPositions = [
    { right: '-20em', bottom: '10em' },
    { right: '-10em', bottom: '-25em' },
    { right: '20em', bottom: '-40em' },
    { right: '50em', bottom: '-35em' },
    { right: '75em', bottom: '-60em' },
    { right: '110em', bottom: '-50em' }
  ];

  // 悬停时的云朵位置
  const hoverCloudPositions = [
    { right: '-24em', bottom: '10em' },
    { right: '-12em', bottom: '-27em' },
    { right: '17em', bottom: '-43em' },
    { right: '46em', bottom: '-39em' },
    { right: '70em', bottom: '-65em' },
    { right: '109em', bottom: '-54em' }
  ];

  return (
    <div 
      className={`${styles.container} ${className}`} 
      style={containerStyle}
      ref={containerRef}
    >
      <div 
        className={`${styles.wrapper} ${isDarkMode ? styles.dark : styles.light} ${isHovered && !isAnimating ? styles.hovered : ''}`}
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className={`${styles.toggleBtn} ${isDarkMode ? styles.moon : styles.sun}`}
        >
          <div className={styles.crater}></div>
          <div className={styles.crater}></div>
          <div className={styles.crater}></div>
        </div>
        
        {/* 波澜效果层 */}
        <div className={`${styles.bgLayer} ${styles.bgLayer1}`}></div>
        <div className={`${styles.bgLayer} ${styles.bgLayer2}`}></div>
        <div className={`${styles.bgLayer} ${styles.bgLayer3}`}></div>
        
        {/* 主云朵层 */}
        <div className={styles.clouds}>
          {cloudPositions.map((pos, i) => (
            <div 
              key={`cloud-${i}`} 
              className={styles.cloudItem}
              style={isHovered && !isDarkMode && !isAnimating ? hoverCloudPositions[i] : pos}
            />
          ))}
        </div>
        
        {/* 次级云朵层 */}
        <div className={styles.cloudsLight}>
          {cloudPositions.map((pos, i) => (
            <div 
              key={`cloud-light-${i}`} 
              className={styles.cloudItem}
              style={isHovered && !isDarkMode && !isAnimating ? hoverCloudPositions[i] : pos}
            />
          ))}
        </div>
        
        {/* 星星层 */}
        <div className={`${styles.starField} ${isDarkMode ? styles.visible : ''}`}>
          <div className={`${styles.starElement} ${styles.large}`}>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
          </div>
          <div className={`${styles.starElement} ${styles.large}`}>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
          </div>
          <div className={`${styles.starElement} ${styles.mid}`}>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
          </div>
          <div className={`${styles.starElement} ${styles.mid}`}>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
          </div>
          <div className={`${styles.starElement} ${styles.tiny}`}>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
          </div>
          <div className={`${styles.starElement} ${styles.tiny}`}>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
            <div className={styles.sPart}></div>
          </div>
        </div>
      </div>
    </div>
  );
};