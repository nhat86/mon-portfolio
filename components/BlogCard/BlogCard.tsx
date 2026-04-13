import styles from './BlogCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

interface Blog {
    slug: string
    title: string
    date: string
    description: string
    image: string
    tags: string[]
}

export default function BlogCard({ blog }: { blog: Blog }) {
    return (
        <Link href={`/blogs/${blog.slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={220}
                    className={styles.image}
                />
            </div>
            <div className={styles.body}>
                <p className={styles.date}>
                    {new Date(blog.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className={styles.title}>{blog.title}</h2>
                <p className={styles.description}>{blog.description}</p>
                <div className={styles.tags}>
                    {blog.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    )
}