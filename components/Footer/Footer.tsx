import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Nhat VO.</p>
      <p className={styles.links}>
        <a href={process.env.GITHUB} target="_blank">
          GitHub
        </a>
        <a href={process.env.LINKEDN} target="_blank">
          LinkedIn
        </a>
      </p>
    </footer>
  );
}
export default Footer;