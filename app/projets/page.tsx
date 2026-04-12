import Image from 'next/image';
import Techs from '@/components/Techs/Techs';
import Technologies from '@/components/Techs/Techs.json';
import styles from './page.module.css';
import Projets from './projets.json';
const Projects = () => {
  return (
    <div className={styles.container}>
      <h1 className="title">Mes Projets</h1>
      <p className="description">
        Découvrez les projets sur lesquels j&apos;ai travaillé
      </p>
      
      <div className={styles.grid}>
        {Projets.Projets.map((projet, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image 
                src={`${Projets.baseImageUrl}/${projet.image}`} 
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
            
            <a href={`${Projets.baseUrl}/${projet.repository}`} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Voir le projet →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Projects;