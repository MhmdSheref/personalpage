import { MDXRemote } from "next-mdx-remote"
import CodeWindow from "@/components/CodeWindow"
import Tags from "@/components/Tags";
import Image from "next/image";


export default function BlogArticle({ blog }) {
    return (
        <article>
            <h1 className="MainTitle">{blog.title}</h1>
            <div className="ArticleHead">
                <Tags tags={blog.tags}/>
                <time>{blog.date}</time>
            </div>
            <MDXRemote {...blog.content} components={{
                CodeWindow,
                img: (props) => (
                    <Image
                        {...props}
                        alt={props.alt || ""}
                        width={props.width || 800}
                        height={props.height || 400}
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                ),}} />
        </article>
    )
}

// {
//     id:4,
//     title:"This is a sample post 4",
//     date:"10/5/2025",
//     tags:["tag1","tag2"],
//     images:[],
//     links: [],
// },