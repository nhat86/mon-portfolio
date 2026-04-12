import Image from 'next/image';
import styles from './Techs.module.css';

const Techs = ({ name, icon }: { name: string; icon: string }) => {
    return (
        <span className={styles.tag}>
            <Image 
                src={icon} 
                alt={name}
                width={20}
                height={20}
                priority={false}
                className={styles.icon}
            />
            {name}
        </span>
    );
}
export default Techs;