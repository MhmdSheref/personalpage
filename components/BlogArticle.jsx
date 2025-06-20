import { MDXRemote } from "next-mdx-remote"
import CodeWindow from "@/components/lab/CodeWindow"
import CodeBlock from "@/components/home/CodeBlock";
import Tags from "@/components/Tags";
import Image from "next/image";
import Link from "next/link";
import FlowField from "@/components/lab/labContent/FlowField";


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
                        quality={100}
                        style={{ maxWidth: '100%', objectFit: 'contain', height:"fit-content"}}
                        {...rest}
                    />
                );
                },
                a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer">
                        {props.children}
                    </a>
                ),
                pre: (props) => {
                    const child = props.children;
                    const className = child?.props?.className || '';
                    const match = className.match(/language-(\w+)/);
                    const language = match?.[1] || 'plaintext';
                    const code = child?.props?.children || '';

                    return <CodeBlock code={code.trim()} language={language} />;
                },
                FlowField,
                Link,

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