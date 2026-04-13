import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      gap: "16px",
      textAlign: "center",
      padding: "2rem",
    }}>
      <h1 style={{ fontSize: "4rem", fontWeight: "500", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.1rem", color: "#6b7280", margin: 0 }}>
        Cette page n'existe pas.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "8px",
          padding: "8px 20px",
          border: "0.5px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "0.9rem",
          color: "#111827",
          textDecoration: "none",
        }}
      >
        Retour à l'accueil
      </Link>
    </main>
  );
}