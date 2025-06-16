import styles from "@/styles/404.module.css"
import {Fira_Code} from "next/font/google";

const firaCode = Fira_Code({
    subsets: ['latin'],
})
export default function NotFound() {
    return (
        <div className={styles.container + " " + firaCode.className}>
            <h1>404 page | A story yet unseen... maybe its waiting to be discovered by you...?</h1>
            <input type={"text"}></input>
        </div>
    )

}