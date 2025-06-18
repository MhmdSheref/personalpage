import SidebarEntry from "./SidebarEntry.jsx"
import styles from "@/styles/sidebar.module.css"
import {useEffect, useState} from "react";
export default function Sidebar({blogs, setActiveBlogId}) {
    const [sidebarShown, setSidebarShown] = useState();
    useEffect(() => {
        const hamCheckbox = document.querySelector("#HamCheckbox");
        function handleChecked() {
            setSidebarShown(hamCheckbox.checked)
        }
        hamCheckbox.addEventListener("change", handleChecked)
        return () => hamCheckbox.removeEventListener("change", handleChecked)

    }, []);
    return (
        <aside className={styles.Sidebar + " " + (sidebarShown? styles.Shown : null)}>
            <div className={styles.SidebarScrollCont}>
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