import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import BlogArticle from "@/components/BlogArticle";


export default function DynamicBlogArticle({ blog }) {
    const [mdxContent, setMdxContent] = useState(null);

    useEffect(() => {
        const loadMdx = async () => {
            if (blog.content?.compiledSource) {
                setMdxContent(blog.content);
            } else if (blog.id) {
                const res = await fetch(`/mdx/${blog.id}.mdx`);
                const raw = await res.text();

                const compiled = await serialize(raw, {
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                });

                setMdxContent(compiled);
            }
        };
        loadMdx();
    }, [blog]);

    if (!mdxContent) return <div>Loading article...</div>;

    return (
        <BlogArticle blog={{...blog, content:mdxContent}}/>
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