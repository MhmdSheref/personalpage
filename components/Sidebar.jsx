import SidebarEntry from "./SidebarEntry.jsx"
export default function Sidebar({blogs, setActiveBlogId}) {
    return (
        <aside className="Sidebar">
            <div className="SidebarScrollCont">
                <h1>Recent Releases</h1>
                {blogs.map((blogEntry => (
                    <SidebarEntry
                        key={blogEntry.id}
                        id={blogEntry.id}
                        img={{src:blogEntry.images[0], alt:""}}
                        text={blogEntry.title}
                        date={blogEntry.date}
                        setActiveBlogId={setActiveBlogId}
                    />
                )))}
            </div>
        </aside>
    );
}