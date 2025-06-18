import BlogArticle from "@/components/BlogArticle";
import styles from "@/styles/blog.module.css"
import path from 'path'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import Head from "next/head";
import Link from "next/link";
import {getAllBlogs, getBlog} from "@/lib/populateBlogs";


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
            remarkPlugins: [remarkGfm],
        },
    })
    return {
        props: {
            blog: {
                ...blog,
                content: mdxSource, // compiled MDX
                plaintext: blog.content,
                linkObjs: allLinks,
            },
        },
    }
};

export default function Blog({blog}) {
    return (
        <div className={styles.container}>
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
                        <meta property="og:image" content={blog.images[0]} />
                        {/*<meta property="og:image:width" content="1200" />*/}
                        {/*<meta property="og:image:height" content="630" />*/}
                    </>

                }
            </Head>

            <BlogArticle blog={blog}/>
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