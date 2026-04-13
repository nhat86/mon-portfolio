import ContactForm from "./ContactForm/ContactForm";
import styles from "./page.module.css";

export default function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Me Contacter</h1>
      <p className={styles.description}>
        Une question ? Un projet ? N&apos;hésitez pas à me contacter !
      </p>

      <div className={styles.contactWrapper}>
        <div className={styles.contactInfo}>
          <h2>Coordonnées</h2>
          <div className={styles.infoItem}>
            <strong>Email :</strong>
            <a href={`mailto:${process.env.EMAIL}`}>{process.env.EMAIL}</a>
          </div>
          <div className={styles.infoItem}>
            <strong>LinkedIn :</strong>
            <a
              href={process.env.LINKEDN}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mon profil LinkedIn
            </a>
          </div>
          <div className={styles.infoItem}>
            <strong>GitHub :</strong>
            <a
              href={process.env.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mon profil GitHub
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}