import styles from './page.module.css'
import Image from 'next/image'
import Techs from '@/components/Techs/Techs'
import Technologies from '@/components/Techs/Techs.json'
import projects from '../projets.json'

const ProjectDetail = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  // Cherche le projet dans le tableau par son slug
  const project = projects.Projets.find((p: any) => p.slug === slug)

  // Si le projet n'existe pas, afficher un message
  if (!project) {
      return (
          <div className="container">
              <h1>Projet non trouvé</h1>
              <p>Ce projet n&apos;existe pas ou a été supprimé.</p>
          </div>
      )
  }

  return (
      <div className={styles.container}>
          <div className={styles.header}>
              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.description}>{project.description}</p>
          </div>

          <div className={styles.content}>
              <div className={styles.imageWrapper}>
                  <Image
                    src={`${projects.baseImageUrl}/${project.image}`}
                    alt={project.title}
                    width={600}
                    height={400}
                    className={styles.imagePlaceholder}
                  />
              </div>

              <div className={styles.details}>
                  <h2>Technologies utilisées</h2>
                  <div className={styles.technologies}>
                      {project.technologies.map((tech: string, index: number) => {
                        const techData = Technologies.Technologies.find(t => t.name === tech);
                        return (
                          <Techs 
                            key={index} 
                            name={tech} 
                            icon={techData ? `${Technologies.baseUrl}/${techData.icon}` : ''}
                          />
                        );
                      })}
                  </div>

                  <div className={styles.links}>
                      <a
                          href={project.link_github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                      >
                          Voir le code →
                      </a>
                      <a
                          href={project.link_demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.link} ${styles.linkPrimary}`}
                      >
                          Voir la démo →
                      </a>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ProjectDetail