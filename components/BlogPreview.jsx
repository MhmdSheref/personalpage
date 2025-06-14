import DynamicBlogArticle from "@/components/DynamicBlogArticle";
export default function BlogPreview({blogs, isShown, setIsShown, activeBlogId}) {

    const blog = blogs.find((blog) => blog.id === activeBlogId);
    return (
        <div className={`BlogPreview ${isShown? "shown" : ""}`}>
            <button onClick={()=>{setIsShown(!isShown)}}>X</button>
            <DynamicBlogArticle blog={blog}/>
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