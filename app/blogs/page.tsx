import styles from './page.module.css'
import BlogList from '@/components/BlogList/BlogList'
import Blogs from './blogs.json'

export const metadata = {
    title: 'Blog | Portfolio',
    description: 'Mes articles sur le développement web.'
}

export default function BlogPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Blog</h1>
            <BlogList blogs={Blogs.blogs} />
        </div>
    )
}