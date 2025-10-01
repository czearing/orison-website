"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let rafId: number;
    let isScrolling = false;

    const checkBackground = () => {
      const hamburger = document.querySelector(`.${styles.hamburger}`) as HTMLElement;
      if (!hamburger) return;

      const rect = hamburger.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Temporarily hide the hamburger to detect what's behind it
      hamburger.style.pointerEvents = 'none';
      const element = document.elementFromPoint(centerX, centerY);
      hamburger.style.pointerEvents = 'auto';

      if (!element) return;

      // Walk up the DOM tree to find an element with a background color
      let currentElement: HTMLElement | null = element as HTMLElement;
      let bgColor = '';

      while (currentElement && currentElement !== document.body) {
        const computedStyle = window.getComputedStyle(currentElement);
        const bg = computedStyle.backgroundColor;

        // Check if background is not transparent
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          bgColor = bg;
          break;
        }
        currentElement = currentElement.parentElement;
      }

      // If no background found, check body and html
      if (!bgColor) {
        const bodyStyle = window.getComputedStyle(document.body);
        bgColor = bodyStyle.backgroundColor;

        if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
          const htmlStyle = window.getComputedStyle(document.documentElement);
          bgColor = htmlStyle.backgroundColor;
        }
      }

      // Parse rgba/rgb values
      const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);

        // Calculate brightness (perceived luminance)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // If brightness is low, use white color
        setIsDark(brightness < 128);
      }

      // Keep checking during scroll
      if (isScrolling) {
        rafId = requestAnimationFrame(checkBackground);
      }
    };

    const handleScroll = () => {
      isScrolling = true;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkBackground);
    };

    const handleScrollEnd = () => {
      isScrolling = false;
      checkBackground();
    };

    // Check immediately and after DOM loads
    checkBackground();
    const timer = setTimeout(checkBackground, 100);

    // Use both scroll and scrollend for better responsiveness
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true } as any);
    window.addEventListener("resize", checkBackground);

    return () => {
      clearTimeout(timer);
      isScrolling = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("resize", checkBackground);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ""} ${isDark ? styles.light : ""}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarContent}>
          <Link href="/" className={styles.link} onClick={toggleSidebar}>
            Home
          </Link>
          <Link href="/about" className={styles.link} onClick={toggleSidebar}>
            About
          </Link>
          <Link href="/shop" className={styles.link} onClick={toggleSidebar}>
            Shop
          </Link>
        </div>
      </nav>
    </>
  );
}
