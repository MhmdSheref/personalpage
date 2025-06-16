import SidebarEntry from "./SidebarEntry.jsx"
export default function Sidebar({blogs, setActiveBlogId}) {
    return (
        <aside className="Sidebar">
            <div className="SidebarScrollCont">
                <h1>Recent Releases</h1>
                {blogs.map((blogEntry => (
                    <SidebarEntry
                        key={blogEntry.id}
                        blog = {blogEntry}
                        setActiveBlogId={setActiveBlogId}
                    />
                )))}
            </div>
        </aside>
    );
}