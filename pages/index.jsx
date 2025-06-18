import BlogPreview from "@/components/BlogPreview.jsx"
import Sidebar from "@/components/Sidebar.jsx"
import {useState, useCallback, useEffect} from "react";
import Head from "next/head"
import dynamic from 'next/dynamic';
import {getAllBlogs} from "@/lib/populateBlogs";

export async function getStaticProps() {
    // Run this expensive function once
    const blogData = getAllBlogs();

    return {
        props: {
            blogs: blogData,
        }
    };
}

const ForceGraph = dynamic(
    () => import('@/components/ForceGraph'),
    { ssr: false }
);
export default function App({blogs}) {
    const [activeBlogId, setActiveBlogId] = useState("introduction")
    const [previewShown, setPreviewShown] = useState(true)
    const [modifiedBlogs, setModifiedBlogs] = useState(blogs)

    const handleActiveBlogId = useCallback((id) => {
        setPreviewShown(true);
        setActiveBlogId(id);
    }, []);


    useEffect(() => {
        const modifiedBlogs = blogs.map(blog => {

            const [day, month, year] = blog.date.split('/').map(Number);
            const postDate = new Date(year, month - 1, day);

            const now = new Date();

            const diffTime = now - postDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            const isNew = (diffDays >= 0 && diffDays <= 3)
            return {...blog, isNew:isNew}
        })
        setModifiedBlogs(modifiedBlogs)
    }, []);

    useEffect(() => {
        const prev = sessionStorage.getItem("previewShown") === "true";
        const id = sessionStorage.getItem("activeBlogId")
        if (prev !== null) setPreviewShown(prev); else setPreviewShown(true);
        if (id !== null) setActiveBlogId(id)
    }, []);


    useEffect(() => {
        sessionStorage.setItem("previewShown", previewShown.toString())
    }, [previewShown]);

    useEffect(() => {
        sessionStorage.setItem("activeBlogId", activeBlogId)
    }, [activeBlogId]);


    return (
        <>
            <Head>
                <title>Mohamed Sheref</title>
                <meta
                    name="description"
                    content={`Hi, I'm Mohamed Sheref, also known online as "MhmdSheref" or "Sheref"
                     I am an engineering student at Cairo University, and this is my personal blog page
                     where I document all kinds of thoughts and experiments, with interactive labs when possible.`}/>
            </Head>
            <BlogPreview activeBlogId={activeBlogId} isShown={previewShown} setIsShown={setPreviewShown}
                         blogs={modifiedBlogs}/>
            <ForceGraph blogs={modifiedBlogs} setActiveBlogId={handleActiveBlogId}/>
            <Sidebar blogs={modifiedBlogs} setActiveBlogId={handleActiveBlogId}/>
        </>
    )
}