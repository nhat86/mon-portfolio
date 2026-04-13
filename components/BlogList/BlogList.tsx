'use client'
import { useState } from 'react'
import BlogCard from '@/components/BlogCard/BlogCard'
import styles from './BlogList.module.css'

interface Blog {
    slug: string
    title: string
    date: string
    description: string
    image: string
    tags: string[]
}

export default function BlogList({ blogs }: { blogs: Blog[] }) {
    const allTags = ['Tous', ...Array.from(new Set(blogs.flatMap(b => b.tags)))]
    const [activeTag, setActiveTag] = useState('Tous')

    const filtered = activeTag === 'Tous'
        ? blogs
        : blogs.filter(b => b.tags.includes(activeTag))

    return (
        <>
            <div className={styles.tags}>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`${styles.tag} ${activeTag === tag ? styles.active : ''}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className={styles.grid}>
                {filtered.length > 0 ? (
                    filtered.map(blog => (
                        <BlogCard key={blog.slug} blog={blog} />
                    ))
                ) : (
                    <p className={styles.empty}>Aucun article pour ce tag.</p>
                )}
            </div>
        </>
    )
}