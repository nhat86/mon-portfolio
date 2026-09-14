import Techs from "@/components/Techs/Techs";
import Technologies from "@/components/Techs/Techs.json";
import styles from "./page.module.css";
import Link from 'next/link'
import "./globals.css";
export default function Home() {
  return (
    <div className="container">
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Bonjour, je suis <br /><span className={styles.highlight}>Nhat VO</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Développeuse Full Stack | Data & IA
          </p>
          <p className={styles.heroDescription}>
            Développeuse web orientée Data & IA, je conçois des applications modernes en combinant <span className={styles.highlight}>développement logiciel, analyse de données, machine learning et intelligence artificielle</span>. Mon objectif : transformer des données et des besoins métier en solutions concrètes, intelligentes et accessibles.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/projects" className={`${styles.btn} ${styles.btnPrimary}`}>
              Voir mes projets
            </Link>
            <Link href="/contact" className={`${styles.btn} ${styles.btnSecondary}`}>
              Me contacter
            </Link>
          </div>
          <div className={styles.tagsContainer}>
            {Technologies.Technologies.map((tech, index) => (
              <Techs key={index} name={tech.name} icon={`${Technologies.baseUrl}/${tech.icon}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
