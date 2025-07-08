import SidebarEntry from "@/components/home/SidebarEntry.jsx"
import styles from "@/styles/sidebar.module.css"
import {useEffect, useState} from "react";
import SubscribeForm from "@/components/SubscribeForm";
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
                    />
                )))}
                <SubscribeForm/>
            </div>
        </aside>
    );
}