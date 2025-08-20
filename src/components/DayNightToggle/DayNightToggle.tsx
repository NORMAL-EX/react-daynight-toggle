import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './DayNightToggle.module.css';
import { DayNightToggleProps, CloudPosition } from './types';

const DayNightToggle: React.FC<DayNightToggleProps> = ({
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

  // 云朵初始位置
  const defaultCloudPositions: CloudPosition[] = [
    { right: '-20em', bottom: '10em' },
    { right: '-10em', bottom: '-25em' },
    { right: '20em', bottom: '-40em' },
    { right: '50em', bottom: '-35em' },
    { right: '75em', bottom: '-60em' },
    { right: '110em', bottom: '-50em' },
    { right: '-20em', bottom: '10em' },
    { right: '-10em', bottom: '-25em' },
    { right: '20em', bottom: '-40em' },
    { right: '50em', bottom: '-35em' },
    { right: '75em', bottom: '-60em' },
    { right: '110em', bottom: '-50em' }
  ];

  // 悬停时的云朵位置
  const hoverCloudPositions: CloudPosition[] = [
    { right: '-24em', bottom: '10em' },
    { right: '-12em', bottom: '-27em' },
    { right: '17em', bottom: '-43em' },
    { right: '46em', bottom: '-39em' },
    { right: '70em', bottom: '-65em' },
    { right: '109em', bottom: '-54em' },
    { right: '-23em', bottom: '10em' },
    { right: '-11em', bottom: '-26em' },
    { right: '18em', bottom: '-42em' },
    { right: '47em', bottom: '-38em' },
    { right: '74em', bottom: '-64em' },
    { right: '110em', bottom: '-55em' }
  ];

  // 处理系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemTheme = (e: MediaQueryListEvent) => {
      if (e.matches !== isDarkMode) {
        handleToggle();
      }
    };

    mediaQuery.addEventListener('change', handleSystemTheme);
    return () => mediaQuery.removeEventListener('change', handleSystemTheme);
  }, [isDarkMode]);

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

    // 立即重置悬浮状态
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

  return (
    <div 
      className={`${styles.container} ${className}`} 
      style={containerStyle}
      ref={containerRef}
    >
      <div 
        className={`${styles.wrapper} ${isDarkMode ? styles.dark : styles.light}`}
        onClick={handleToggle}
      >
        <div 
          className={`${styles.toggleBtn} ${isDarkMode ? styles.moon : styles.sun} ${isHovered && !isAnimating ? styles.hovered : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.crater}></div>
          <div className={styles.crater}></div>
          <div className={styles.crater}></div>
        </div>
        
        <div className={`${styles.bgLayer} ${styles.bgLayer1} ${isDarkMode ? styles.darkLayer1 : ''}`}></div>
        <div className={`${styles.bgLayer} ${styles.bgLayer2} ${isDarkMode ? styles.darkLayer2 : ''}`}></div>
        <div className={`${styles.bgLayer} ${styles.bgLayer3} ${isDarkMode ? styles.darkLayer3 : ''}`}></div>
        
        <div className={`${styles.clouds} ${isDarkMode ? styles.cloudsHidden : ''}`}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={`cloud-${i}`} 
              className={styles.cloudItem}
              style={isHovered && !isDarkMode && !isAnimating ? hoverCloudPositions[i] : defaultCloudPositions[i]}
            />
          ))}
        </div>
        
        <div className={`${styles.cloudsLight} ${isDarkMode ? styles.cloudsHidden : ''}`}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={`cloud-light-${i}`} 
              className={styles.cloudItem}
              style={isHovered && !isDarkMode && !isAnimating ? hoverCloudPositions[i + 6] : defaultCloudPositions[i + 6]}
            />
          ))}
        </div>
        
        <div className={`${styles.starField} ${isDarkMode ? styles.visible : ''}`}>
          {[...Array(2)].map((_, i) => (
            <div 
              key={`star-large-${i}`} 
              className={`${styles.starElement} ${styles.large}`}
              data-index={i + 1}
            >
              <div className={styles.sPart}></div>
              <div className={styles.sPart}></div>
              <div className={styles.sPart}></div>
              <div className={styles.sPart}></div>
            </div>
          ))}
          {[...Array(2)].map((_, i) => (
            <div 
              key={`star-mid-${i}`} 
              className={`${styles.starElement} ${styles.mid}`}
              data-index={i + 3}
            >
              <div className={styles.sPart}></div>
              <div className={styles.sPart}></div>
              <div className={styles.sPart}></div>
              <div className={styles.sPart}></div>
            </div>
          ))}
          {[...Array(2)].map((_, i) => (
            <div 
              key={`star-tiny-${i}`} 
              className={`${styles.starElement} ${styles.tiny}`}
              data-index={i + 5}
            >
              <div className={styles.sPart}></div>
              <div className={styles.sPart}></div>
              <div className={styles.sPart}></div>
              <div className={styles.sPart}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayNightToggle;