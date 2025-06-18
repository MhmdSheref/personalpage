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
                img: ({ alt = '', src, ...rest }) => {
                const match = alt.match(/^(.*?)\s*=\s*(\d+)x(\d+)$/);
                const [realAlt, width, height] = match
                ? [match[1], parseInt(match[2]), parseInt(match[3])]
                : [alt, 800, 400];
                return (
                    <Image
                        src={src}
                        alt={realAlt}
                        width={parseInt(width)}
                        height={parseInt(height)}
                        style={{ maxWidth: '100%', objectFit: 'contain' }}
                        {...rest}
                    />
                );
                },
                a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer">
                        {props.children}
                    </a>
                ),
            }}
            />
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