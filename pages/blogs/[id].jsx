import BlogArticle from "@/components/BlogArticle";
import styles from "@/styles/blog.module.css"
import path from 'path'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import Head from "next/head";
import Link from "next/link";
import {getAllBlogs, getBlog} from "@/lib/populateBlogs";
import BlogSidebar from "@/components/BlogSidebar";
import { ReactCusdis } from 'react-cusdis'
import { useRouter } from 'next/router'
import {useEffect, useState} from "react";


export const getStaticPaths = async () => {
    const mdxDir = path.join(process.cwd(), 'public', 'mdx');
    const files = fs.readdirSync(mdxDir);

    const paths = files
        .filter(file => file.endsWith('.mdx'))
        .map(file => ({
            params: { id: path.basename(file, '.mdx') } // removes .mdx extension
        }));

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps = async ({ params }) => {

    const blogs = getAllBlogs(false);
    const blog = getBlog(params?.id, true);
    const cleanMd = (md) => {
        return md
            .replaceAll(/!\[.*?]\(.*?\)/g, '')
            .replaceAll(/\[([^\]]+)]\((.*?)\)/g, '$1')
            .replaceAll("\\", "");
    };

    let allLinks = [];
    blogs.forEach((searchBlog => {
        if (searchBlog.links.includes(blog.id)) {
            allLinks.push({title: searchBlog.title, id:searchBlog.id})
        }
        if (blog.links.includes(searchBlog.id)) {
            allLinks.push({title: searchBlog.title, id:searchBlog.id})
        }
    }))

    if (!blog) {
        return { notFound: true };
    }

    const mdxSource = await serialize(blog.content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [rehypeKatex],

        },
    })
    return {
        props: {
            blog: {
                ...blog,
                content: mdxSource, // compiled MDX
                plaintext: cleanMd(blog.content),
                linkObjs: allLinks,
            },
        },
    }
};

export default function Blog({blog}) {
    const router = useRouter()
    const [url, setUrl] = useState('')
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(window.location.href)
        }
    }, [router.asPath]) // update when route changes
    return (
        <div className={styles.Container}>
            <div className={styles.content}>
                <Head>
                    <title>{`${blog.title} | Mohamed Sheref`}</title>
                    <meta property="og:site_name" content="Mohamed Sheref" />
                    <meta property="og:title" content={blog.title} />
                    <meta property="og:description" content={blog.plaintext} />
                    <meta property="og:url" content="https://mhmdsheref.vercel.app/" />
                    <meta property="og:type" content="website" />

                    <meta name="description" content={blog.plaintext}/>
                    {
                        blog.images.length > 0 &&
                        <>
                            <meta property="og:image" content={blog.images[0].img} />
                            {/*<meta property="og:image:width" content="1200" />*/}
                            {/*<meta property="og:image:height" content="630" />*/}
                        </>

                    }
                </Head>

                <BlogArticle blog={blog}/>
                <hr/>
                <h2 style={{background:"#1C1B22", margin:"0 -40px", padding:"10px 40px"}}>Leave a comment:</h2>
                <ReactCusdis
                    attrs={{
                        host: 'https://cusdis.com',
                        appId: '5dd173c5-218f-45c1-b447-0a4b82e9cc8b',
                        pageId: blog.id,
                        pageTitle: blog.title,
                        pageUrl: url,
                        theme:"dark"
                    }}
                    style={{minHeight: "400px", display:"flex", padding:"30px", background:"#1C1B22", margin:"0 -40px -40px"}}
                />

            </div>

            <BlogSidebar>
                {blog.linkObjs.length?
                    <nav>
                        <h3>Related:</h3>
                        <ul>
                            {blog.linkObjs.map(link => (
                                <li key={link.id}>
                                    <Link href={`/blogs/${link.id}`}>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </nav> : null}
            </BlogSidebar>
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