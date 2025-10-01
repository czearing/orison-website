"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkHamburgerBackground = () => {
      const darkSections = document.querySelectorAll('[data-dark-section]');

      if (darkSections.length === 0) {
        setIsDark(false);
        return;
      }

      // Check if any dark section is covering the hamburger area (top 40px where hamburger is)
      const hamburgerTop = 0;
      const hamburgerBottom = 40;

      let isDarkBehind = false;
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if dark section overlaps with hamburger vertical position
        if (rect.top <= hamburgerBottom && rect.bottom >= hamburgerTop) {
          isDarkBehind = true;
        }
      });

      setIsDark(isDarkBehind);
    };

    // Check on mount
    checkHamburgerBackground();

    // Throttle scroll events with RAF
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        checkHamburgerBackground();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Handle escape key to close sidebar
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ""} ${isDark && !isOpen ? styles.light : ""}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <nav
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
        aria-label="Main navigation"
        role="navigation"
      >
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
