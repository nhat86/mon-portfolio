'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.css'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          Mon Portfolio
        </Link>

        {/* Bouton burger pour mobile */}
        <button 
          className={styles.burger}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={isOpen ? styles.burgerOpen : ''}></span>
          <span className={isOpen ? styles.burgerOpen : ''}></span>
          <span className={isOpen ? styles.burgerOpen : ''}></span>
        </button>

        {/* Menu */}
        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
          <li>
            <Link 
              href="/" 
              className={pathname === '/' ? `${styles.link} ${styles.active}` : styles.link}
              onClick={closeMenu}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link 
              href="/projects" 
              className={pathname.startsWith('/projets') ? `${styles.link} ${styles.active}` : styles.link}
              onClick={closeMenu}
            >
              Projets
            </Link>
          </li>
          <li>
            <Link 
              href="/formations" 
              className={pathname.startsWith('/formation') ? `${styles.link} ${styles.active}` : styles.link}
              onClick={closeMenu}
            >
              Formations
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className={pathname === '/contact' ? `${styles.link} ${styles.active}` : styles.link}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
