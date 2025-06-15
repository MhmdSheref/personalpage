import BlogArticle from "@/components/BlogArticle";
import {blogs} from "@/blogs";
import styles from "@/styles/blog.module.css"
import path from 'path'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import Head from "next/head";


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
                plaintext: source
            },
        },
    }
};

export default function Blog({blog}) {

    return (

        <div className={styles.container}>
            <Head>
                <title>Sheref's Mind Palace | {blog.title}</title>
                <meta property="og:site_name" content="Sheref's Mind Palace" />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.plaintext} />
                <meta property="og:url" content="https://mhmdsheref.vercel.app/" />
                <meta property="og:type" content="website" />

                {
                    blog.images.length > 0 &&
                    <>
                        <meta property="og:image" content={blog.images[0]} />
                        {/*<meta property="og:image:width" content="1200" />*/}
                        {/*<meta property="og:image:height" content="630" />*/}
                    </>

                }
            </Head>

            <BlogArticle blog={blog}/>
        </div>
    );
}

// {
//     id:4,
//     title:"This is a sample post 4",
//     date:"10/5/2025",
//     tags:["tag1","tag2"],
//     images:[],
//     links: [],
// },