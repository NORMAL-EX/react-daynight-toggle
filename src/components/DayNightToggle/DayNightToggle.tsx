import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
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
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number>();
  const animationTimeoutRef = useRef<number>();

  // 同步 theme prop 变化
  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  // 清理动画
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

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

    const intervalId = setInterval(animateClouds, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // 重置所有元素到默认位置
  const resetToDefaultPositions = useCallback((dark: boolean) => {
    const toggleBtn = toggleBtnRef.current;
    const bgLayers = containerRef.current?.querySelectorAll(`.${styles.bgLayer}`);
    const starElements = containerRef.current?.querySelectorAll(`.${styles.starElement}`);
    const cloudItems = containerRef.current?.querySelectorAll(`.${styles.cloudItem}`);

    if (!toggleBtn || !bgLayers) return;

    if (dark) {
      // Dark模式默认位置
      toggleBtn.style.transform = 'translateX(110em)';
      (bgLayers[0] as HTMLElement).style.transform = 'translateX(110em)';
      (bgLayers[1] as HTMLElement).style.transform = 'translateX(80em)';
      (bgLayers[2] as HTMLElement).style.transform = 'translateX(50em)';
      
      // 星星默认位置
      if (starElements && starElements.length >= 6) {
        (starElements[0] as HTMLElement).style.top = '11em';
        (starElements[0] as HTMLElement).style.left = '39em';
        (starElements[1] as HTMLElement).style.top = '39em';
        (starElements[1] as HTMLElement).style.left = '91em';
        (starElements[2] as HTMLElement).style.top = '26em';
        (starElements[2] as HTMLElement).style.left = '19em';
        (starElements[3] as HTMLElement).style.top = '37em';
        (starElements[3] as HTMLElement).style.left = '66em';
        (starElements[4] as HTMLElement).style.top = '21em';
        (starElements[4] as HTMLElement).style.left = '75em';
        (starElements[5] as HTMLElement).style.top = '51em';
        (starElements[5] as HTMLElement).style.left = '38em';
      }
    } else {
      // Light模式默认位置
      toggleBtn.style.transform = 'translateX(0)';
      (bgLayers[0] as HTMLElement).style.transform = 'translateX(0)';
      (bgLayers[1] as HTMLElement).style.transform = 'translateX(0)';
      (bgLayers[2] as HTMLElement).style.transform = 'translateX(0)';
      
      // 云朵默认位置
      if (cloudItems && cloudItems.length >= 12) {
        const defaultPositions = [
          {r: '-20em', b: '10em'}, {r: '-10em', b: '-25em'},
          {r: '20em', b: '-40em'}, {r: '50em', b: '-35em'},
          {r: '75em', b: '-60em'}, {r: '110em', b: '-50em'},
          {r: '-20em', b: '10em'}, {r: '-10em', b: '-25em'},
          {r: '20em', b: '-40em'}, {r: '50em', b: '-35em'},
          {r: '75em', b: '-60em'}, {r: '110em', b: '-50em'}
        ];
        
        cloudItems.forEach((cloud, i) => {
          const pos = defaultPositions[i];
          if (pos) {
            (cloud as HTMLElement).style.right = pos.r;
            (cloud as HTMLElement).style.bottom = pos.b;
          }
        });
      }
    }
  }, []);

  // 主题切换后立即更新位置
  useLayoutEffect(() => {
    if (!isAnimating && !isHovering) {
      resetToDefaultPositions(isDarkMode);
    }
  }, [isDarkMode, isAnimating, isHovering, resetToDefaultPositions]);

  // 鼠标移动处理
  const handleMouseMove = useCallback(() => {
    if (isAnimating || !containerRef.current) return;

    setIsHovering(true);

    // 取消之前的动画帧
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const toggleBtn = toggleBtnRef.current;
      const bgLayers = containerRef.current?.querySelectorAll(`.${styles.bgLayer}`);
      const starElements = containerRef.current?.querySelectorAll(`.${styles.starElement}`);
      const cloudItems = containerRef.current?.querySelectorAll(`.${styles.cloudItem}`);

      if (!toggleBtn || !bgLayers) return;

      if (isDarkMode) {
        // Dark模式悬浮效果
        toggleBtn.style.transform = 'translateX(100em)';
        (bgLayers[0] as HTMLElement).style.transform = 'translateX(100em)';
        (bgLayers[1] as HTMLElement).style.transform = 'translateX(73em)';
        (bgLayers[2] as HTMLElement).style.transform = 'translateX(46em)';
        
        // 星星位置调整
        if (starElements && starElements.length >= 6) {
          (starElements[0] as HTMLElement).style.top = '10em';
          (starElements[0] as HTMLElement).style.left = '36em';
          (starElements[1] as HTMLElement).style.top = '40em';
          (starElements[1] as HTMLElement).style.left = '87em';
          (starElements[2] as HTMLElement).style.top = '26em';
          (starElements[2] as HTMLElement).style.left = '16em';
          (starElements[3] as HTMLElement).style.top = '38em';
          (starElements[3] as HTMLElement).style.left = '63em';
          (starElements[4] as HTMLElement).style.top = '20.5em';
          (starElements[4] as HTMLElement).style.left = '72em';
          (starElements[5] as HTMLElement).style.top = '51.5em';
          (starElements[5] as HTMLElement).style.left = '35em';
        }
      } else {
        // Light模式悬浮效果
        toggleBtn.style.transform = 'translateX(10em)';
        (bgLayers[0] as HTMLElement).style.transform = 'translateX(10em)';
        (bgLayers[1] as HTMLElement).style.transform = 'translateX(7em)';
        (bgLayers[2] as HTMLElement).style.transform = 'translateX(4em)';
        
        // 云朵位置调整
        if (cloudItems && cloudItems.length >= 12) {
          const hoverPositions = [
            {r: '-24em', b: '10em'}, {r: '-12em', b: '-27em'},
            {r: '17em', b: '-43em'}, {r: '46em', b: '-39em'},
            {r: '70em', b: '-65em'}, {r: '109em', b: '-54em'},
            {r: '-23em', b: '10em'}, {r: '-11em', b: '-26em'},
            {r: '18em', b: '-42em'}, {r: '47em', b: '-38em'},
            {r: '74em', b: '-64em'}, {r: '110em', b: '-55em'}
          ];
          
          cloudItems.forEach((cloud, i) => {
            const pos = hoverPositions[i];
            if (pos) {
              (cloud as HTMLElement).style.right = pos.r;
              (cloud as HTMLElement).style.bottom = pos.b;
            }
          });
        }
      }
    });
  }, [isDarkMode, isAnimating]);

  const handleMouseOut = useCallback(() => {
    if (isAnimating) return;
    
    setIsHovering(false);

    // 取消动画帧
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // 恢复到默认位置
    resetToDefaultPositions(isDarkMode);
  }, [isDarkMode, isAnimating, resetToDefaultPositions]);

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsHovering(false); // 重置悬浮状态
    
    const newTheme = isDarkMode ? 'light' : 'dark';
    const newIsDark = !isDarkMode;
    
    // 立即更新状态
    setIsDarkMode(newIsDark);
    
    // 强制重置位置到新主题的默认位置
    setTimeout(() => {
      resetToDefaultPositions(newIsDark);
    }, 10);
    
    if (onChange) {
      onChange(newTheme);
    }

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = window.setTimeout(() => {
      setIsAnimating(false);
      // 动画结束后再次确保位置正确
      resetToDefaultPositions(newIsDark);
    }, 700);
  }, [isDarkMode, isAnimating, onChange, resetToDefaultPositions]);

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
          ref={toggleBtnRef}
          className={`${styles.toggleBtn} ${isDarkMode ? styles.moon : styles.sun}`}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
        >
          <div className={styles.crater}></div>
          <div className={styles.crater}></div>
          <div className={styles.crater}></div>
        </div>
        
        {/* 波浪背景层 */}
        <div className={`${styles.bgLayer} ${styles.bgLayer1}`}></div>
        <div className={`${styles.bgLayer} ${styles.bgLayer2}`}></div>
        <div className={`${styles.bgLayer} ${styles.bgLayer3}`}></div>
        
        {/* 主云层 */}
        <div className={styles.clouds}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={`cloud-${i}`} 
              className={styles.cloudItem}
              style={{
                right: i === 0 ? '-20em' : i === 1 ? '-10em' : i === 2 ? '20em' : i === 3 ? '50em' : i === 4 ? '75em' : '110em',
                bottom: i === 0 ? '10em' : i === 1 ? '-25em' : i === 2 ? '-40em' : i === 3 ? '-35em' : i === 4 ? '-60em' : '-50em',
                width: i === 0 ? '50em' : i === 4 ? '75em' : '60em',
                height: i === 0 ? '50em' : i === 4 ? '75em' : '60em'
              }}
            />
          ))}
        </div>
        
        {/* 浅色云层 - 创造深度感 */}
        <div className={styles.cloudsLight}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={`cloud-light-${i}`} 
              className={styles.cloudItem}
              style={{
                right: i === 0 ? '-20em' : i === 1 ? '-10em' : i === 2 ? '20em' : i === 3 ? '50em' : i === 4 ? '75em' : '110em',
                bottom: i === 0 ? '10em' : i === 1 ? '-25em' : i === 2 ? '-40em' : i === 3 ? '-35em' : i === 4 ? '-60em' : '-50em',
                width: i === 0 ? '50em' : i === 4 ? '75em' : '60em',
                height: i === 0 ? '50em' : i === 4 ? '75em' : '60em'
              }}
            />
          ))}
        </div>
        
        {/* 星空 */}
        <div className={`${styles.starField} ${isDarkMode ? styles.visible : ''}`}>
          {[...Array(2)].map((_, i) => (
            <div 
              key={`star-large-${i}`} 
              className={`${styles.starElement} ${styles.large}`}
              style={{
                top: i === 0 ? '11em' : '39em',
                left: i === 0 ? '39em' : '91em'
              }}
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
              style={{
                top: i === 0 ? '26em' : '37em',
                left: i === 0 ? '19em' : '66em'
              }}
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
              style={{
                top: i === 0 ? '21em' : '51em',
                left: i === 0 ? '75em' : '38em'
              }}
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