import DynamicBlogArticle from "@/components/DynamicBlogArticle";
import Link from "next/link";
import styles from "@/styles/blogPreview.module.css"
export default function BlogPreview({blogs, isShown, setIsShown, activeBlogId}) {

    const blog = blogs.find((blog) => blog.id === activeBlogId);
    return (
        <div className={styles.BlogPreview + " " + (isShown? styles.shown : "")}>
            <button onClick={()=>{setIsShown(!isShown)}}><img alt="arrow" src="/arrow.svg"/></button>
            <div className={styles.content}>
                <DynamicBlogArticle blog={blog}/>
                <Link className={styles.callToAction} href={`/blogs/${blog.id}`}>Continue Reading Here →</Link>

            </div>
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