import Techs from "@/components/Techs/Techs";
import Technologies from "@/components/Techs/Techs.json";
import styles from "./page.module.css";
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
            Développeur Web Full-Stack
          </p>
          <p className={styles.heroDescription}>
            Je développe des applications <span className={styles.highlight}>web modernes et élégantes</span>, centrées sur <span className={styles.highlight}>l’expérience utilisateur</span>.
            J’utilise <span className={styles.highlight}>l’intelligence artificielle</span> pour rendre les interfaces plus <span className={styles.highlight}>intelligentes</span> et <span className={styles.highlight}>interactives</span>.
          </p>
          <div className={styles.heroButtons}>
            <a href="/projects" className={`${styles.btn} ${styles.btnPrimary}`}>
              Voir mes projets
            </a>
            <a href="/contact" className={`${styles.btn} ${styles.btnSecondary}`}>
              Me contacter
            </a>
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
