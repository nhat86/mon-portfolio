import Image from 'next/image';
import Techs from '@/components/Techs/Techs';
import Technologies from '@/components/Techs/Techs.json';
import styles from './page.module.css';
import ProjectsData from './projects.json';
export const metadata = {
  title: 'Mes Projets | Portfolio',
  description: 'Découvrez mes projets de développement web : applications React, sites Next.js et plus encore.',
}
const Projects = () => {
  return (
    <div className={styles.container}>
      <h1 className="title">Mes Projets</h1>
      <p className="description">
        Découvrez les projets sur lesquels j&apos;ai travaillé
      </p>
      
      <div className={styles.grid}>
        {ProjectsData.Projects.map((projet, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image 
                src={`${ProjectsData.baseImageUrl}/${projet.image}`} 
                alt={projet.title}
                width={400}
                height={300}
                className={styles.image}
              />
            </div>
            <h2>{projet.title}</h2>
            <p>{projet.description}</p>
            
            <div className={styles.technologies}>
              {projet.technologies.map((tech, i) => {
                const techData = Technologies.Technologies.find(t => t.name === tech);
                return (
                  <Techs 
                    key={i} 
                    name={tech} 
                    icon={techData ? `${Technologies.baseUrl}/${techData.icon}` : ''}
                  />
                );
              })}
            </div>
            
            <a href={projet.link} className={styles.link}>
              Voir le projet →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Projects;