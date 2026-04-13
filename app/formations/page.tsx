"use client";

import { useState } from "react";
import styles from "./page.module.css";
import formationsData from "./formations.json";

type FormationStatus = "certified" | "in-progress" | "incomplete";
type FormationCategory = "dev" | "maths" | "IA";
type FilterKey = FormationCategory | "all";

interface Formation {
  id: string;
  title: string;
  organization: string;
  categories: FormationCategory[];
  status: FormationStatus;
  tags: string[];
  year: number;
  period: string;
  iconColor: string;
  iconStroke: string;
  iconType: "code" | "monitor" | "palette" | "chart" | "edit" | "layers";
}

const formations = formationsData as Formation[];

const FILTERS: FilterKey[] = ["all", "dev", "maths", "IA"];

const CATEGORY_LABELS: Record<FilterKey, string> = {
  all: "Tout",
  dev: "Développement",
  maths: "Mathematiques",
  IA: "Intelligence Artificielle",
};

function FormationIcon({
  type,
  color,
  stroke,
}: {
  type: Formation["iconType"];
  color: string;
  stroke: string;
}) {
  const icons: Record<Formation["iconType"], React.ReactNode> = {
    code: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
    monitor: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polyline points="8 21 12 17 16 21" />
      </>
    ),
    palette: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </>
    ),
    chart: (
      <>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </>
    ),
    layers: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
  };

  return (
    <div className={styles.iconCircle} style={{ background: color }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icons[type]}
      </svg>
    </div>
  );
}

function FormationCard({ formation }: { formation: Formation }) {
  const isCertified = formation.status === "certified";
  const isIncomplete = formation.status === "incomplete";
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <FormationIcon
          type={formation.iconType}
          color={formation.iconColor}
          stroke={formation.iconStroke}
        />
        <span
          className={`${styles.badge} ${
            isCertified
              ? styles.badgeCertified
              : isIncomplete
              ? styles.badgeIncomplete
              : styles.badgeProgress
          }`}
        >
          {isCertified ? "Certifié" : isIncomplete ? "Non complété" : "En cours"}
        </span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.cardTitle}>{formation.title}</p>
        <p className={styles.cardOrg}>{formation.organization}</p>
      </div>

      <div className={styles.tagsRow}>
        {formation.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={styles.cardFooter}>
        <span className={styles.meta}>{formation.period}</span>
      </div>
    </article>
  );
}

export default function FormationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? formations
      : formations.filter((f) => f.categories.includes(activeFilter));

  return (
    <main className={styles.page}>
      <h1 className={styles.sectionLabel}>Formations &amp; Diplômes</h1>

      <nav className={styles.filterBar} aria-label="Filtrer les formations">
        {FILTERS.map((key) => (
          <button
            key={key}
            className={`${styles.filterBtn} ${
              activeFilter === key ? styles.filterBtnActive : ""
            }`}
            onClick={() => setActiveFilter(key)}
            aria-pressed={activeFilter === key}
          >
            {CATEGORY_LABELS[key]}
            {key === "all" && (
              <span className={styles.countChip}>{formations.length}</span>
            )}
          </button>
        ))}
      </nav>

      <section
        className={styles.grid}
        aria-label={`Formations — ${CATEGORY_LABELS[activeFilter]}`}
      >
        {filtered.map((formation) => (
          <FormationCard key={formation.id} formation={formation} />
        ))}
      </section>
    </main>
  );
}