import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/Navigation.module.css'
import { navItems } from '../data/navigation'
import Avatar from './Avatar'

type Props = {
  theme: string
  setTheme: (theme: string) => void
}

const Navigation: React.FC<Props> = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    setIsMenuOpen(false)
  }
  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className={styles.logoText}>FF</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className={styles.navItems}>
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`${styles.navItem} ${item.active ? styles.active : ''}`}
            >
              <div className={styles.navIcon}>
                {item.icon}
              </div>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </div>


        {/* Profile Section */}
        <div className={styles.profileContainer} ref={menuRef}>
          <button className={styles.profileSection} onClick={toggleMenu}>
            <div className={styles.profileInfo}>
              <Avatar 
                src="https://ui-avatars.com/api/?name=You&background=1d9bf0&color=fff&size=40"
                alt="Profile"
                size={40}
                className={styles.profileAvatar}
              />
              <div className={styles.profileDetails}>
                <div className={styles.profileName}>Shawn Brown</div>
                <div className={styles.profileUsername}>@SB Studio </div>
              </div>
            </div>
            <div className={styles.profileMenu}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
            </div>
          </button>

          {/* Popup Menu */}
          {isMenuOpen && (
            <div className={styles.popupMenu}>
              <button className={styles.menuItem} onClick={handleThemeToggle}>
                <div className={styles.menuIcon}>
                  {theme === 'light' ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                    </svg>
                  )}
                </div>
                <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
              </button>
              
              <button className={styles.menuItem}>
                <div className={styles.menuIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z" />
                    <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44z" />
                  </svg>
                </div>
                <span>Profile</span>
              </button>
              
              <button className={styles.menuItem}>
                <div className={styles.menuIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <span>Settings</span>
              </button>
              
              <div className={styles.menuDivider}></div>
              
              <button className={styles.menuItem}>
                <div className={styles.menuIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                  </svg>
                </div>
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation 