import Header from "./Header.jsx";
import BlogPreview from "./BlogPreview.jsx"
import ForceGraph from "./ForceGraph.jsx";
import Sidebar from "./Sidebar.jsx"
import {useState, useCallback} from "react";
import {blogs} from "../blogs.jsx";
export default function App() {
    const [activeBlogId, setActiveBlogId] = useState(1)
    const [previewShown, setPreviewShown] = useState(false)

    const handleActiveBlogId = useCallback((id) => {
        setPreviewShown(true);
        setActiveBlogId(id);
    }, []);


    return (
        <>
            <Header/>
            <main>
                <BlogPreview activeBlogId={activeBlogId} isShown={previewShown} setIsShown={setPreviewShown} blogs={blogs}/>
                <ForceGraph blogs={blogs} setActiveBlogId={handleActiveBlogId}/>
                <Sidebar blogs={blogs} setActiveBlogId={handleActiveBlogId}/>
            </main>
      </>
  )
}