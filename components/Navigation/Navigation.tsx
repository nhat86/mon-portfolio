import Link from 'next/link'
import styles from './Navigation.module.css'

export default function Navigation() {
 return (
   <nav className={styles.nav}>
     <div className={styles.container}>
       <Link href="/" className={styles.logo}>
         Mon Portfolio
       </Link>

       <ul className={styles.menu}>
         <li>
           <Link href="/" className={styles.link}>
             Accueil
           </Link>
         </li>
         <li>
           <Link href="/projets" className={styles.link}>
             Projets
           </Link>
         </li>
         <li>
           <Link href="/a-propos" className={styles.link}>
             À propos
           </Link>
         </li>
         <li>
           <Link href="/contact" className={styles.link}>
             Contact
           </Link>
         </li>
       </ul>
     </div>
   </nav>
 )
}