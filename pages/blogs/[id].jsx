import BlogArticle from "@/components/BlogArticle";
import {blogs} from "@/blogs";
import styles from "@/styles/blog.module.css"
import path from 'path'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'


export const getStaticPaths = async () => {
    const paths = blogs.map((blog) => ({
        params: {id: blog.id.toString()},
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) => {
    const blog = blogs.find((i) => i.id.toString() === params?.id);

    if (!blog) {
        return { notFound: true };
    }

    const mdxFilePath = path.join(process.cwd(), 'public', 'mdx', `${params.id}.mdx`)
    const source = fs.readFileSync(mdxFilePath, 'utf8')
    const mdxSource = await serialize(source, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
        },
    })

    return {
        props: {
            blog: {
                ...blog,
                content: mdxSource, // compiled MDX
            },
        },
    }
};

export default function Blog({blog}) {
    return (
        <div className={styles.container}>
            <BlogArticle blog={blog}/>
        </div>
    );
}
