import { MDXRemote } from "next-mdx-remote"
import CodeWindow from "@/components/CodeWindow"
import Tags from "@/components/Tags";


export default function BlogArticle({ blog }) {
    return (
        <article>
            <h1 className="MainTitle">{blog.title}</h1>
            <div className="ArticleHead">
                <Tags tags={blog.tags}/>
                <time>{blog.date}</time>
            </div>
            <MDXRemote {...blog.content} components={{ CodeWindow }} />
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