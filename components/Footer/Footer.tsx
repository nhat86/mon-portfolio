import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Nhat VO.</p>
      <p className={styles.links}>
        <a href="https://github.com/nhat86" target="_blank">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/vo-thi-minh-nhat" target="_blank">
          LinkedIn
        </a>
      </p>
    </footer>
  );
}
export default Footer;