import Markdown from "react-markdown";
export default function BlogArticle({blog}) {

    return (
            <article>
                <h1>{blog.title}</h1>
                <Markdown>
                    {blog.content}
                </Markdown>
            </article>

    );
}


// {
//     id:4,
//     title:"This is a sample post 4",
//     date:"10/5/2025",
//     tags:["tag1","tag2"],
//     images:[],
//     content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid consectetur dicta eos eum fugiat fugit incidunt itaque iure maxime nemo neque nesciunt odio possimus repellendus, similique, voluptatum! Quam, voluptate.",
//     links: [],
// },