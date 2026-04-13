import styles from './page.module.css'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Blogs from '../blogs.json'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const blog = Blogs.blogs.find(b => b.slug === slug)
    if (!blog) return { title: 'Article non trouvé' }
    return {
        title: `${blog.title} | Blog`,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            images: [blog.image],
        }
    }
}

export default async function BlogDetail({ params }: Props) {
    const { slug } = await params
    const blog = Blogs.blogs.find(b => b.slug === slug)
    if (!blog) notFound()

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.date}>{new Date(blog.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h1 className={styles.title}>{blog.title}</h1>
                <div className={styles.tags}>
                    {blog.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </div>
            <div className={styles.imageWrapper}>
                <Image
                    src={blog.image}
                    alt={blog.title}
                    width={900}
                    height={500}
                    className={styles.image}
                    priority
                />
            </div>
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </div>
    )
}

export function generateStaticParams() {
    return Blogs.blogs.map((blog) => ({ slug: blog.slug }))
}