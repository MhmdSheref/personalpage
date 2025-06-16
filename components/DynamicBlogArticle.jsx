import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import BlogArticle from "@/components/BlogArticle";


export default function DynamicBlogArticle({ blog }) {
    const [mdxContent, setMdxContent] = useState(null);
    useEffect(() => {
        setMdxContent(null)
        const loadMdx = async () => {
            if (blog.content?.compiledSource) {
                setMdxContent(blog.content);
            } else if (blog.id) {
                const res = await fetch(`/mdx/${blog.id}.mdx`);
                const raw = await res.text();
                const rawArr = raw.split("\n")
                let previewArr = []

                for (let i = 0; i < rawArr.length; i++) {
                    previewArr.push(rawArr[i])
                    if (rawArr[i].length >= 100) break
                }
                const preview = previewArr.join("\n")

                const compiled = await serialize(preview, {
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                });


                setMdxContent(compiled);
            }
        };
        loadMdx();
    }, [blog]);

    if (!mdxContent) return <article><h1 style={{color:"#a9a9a9"}}>Loading article...</h1></article>;

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