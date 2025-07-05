import SubscribeForm from "@/components/SubscribeForm";
import styles from "@/styles/blog.module.css"
export default function BlogSidebar(props) {
    return (
        <aside className={styles.Sidebar}>
            {props.children}
            <SubscribeForm/>
        </aside>

    )
}