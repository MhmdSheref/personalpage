import BlogPreview from "@/components/BlogPreview.jsx"
import Sidebar from "@/components/Sidebar.jsx"
import {blogs} from "@/blogs";
import {useState, useCallback} from "react";
import Head from "next/head"

import dynamic from 'next/dynamic';

const ForceGraph = dynamic(
    () => import('@/components/ForceGraph'),
    { ssr: false }
);
export default function App() {
    const [activeBlogId, setActiveBlogId] = useState(1)
    const [previewShown, setPreviewShown] = useState(false)


    const handleActiveBlogId = useCallback((id) => {
        setPreviewShown(true);
        setActiveBlogId(id);

    }, []);


    return (
        <>
            <Head><title>Sheref's Mind Palace</title></Head>
            <main>
                <BlogPreview activeBlogId={activeBlogId} isShown={previewShown} setIsShown={setPreviewShown} blogs={blogs}/>
                <ForceGraph blogs={blogs} setActiveBlogId={handleActiveBlogId}/>
                <Sidebar blogs={blogs} setActiveBlogId={handleActiveBlogId}/>
            </main>
        </>
    )
}