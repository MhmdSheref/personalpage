import Link from "next/link";
import styles from "@/styles/header.module.css"
import {Fira_Code} from "next/font/google";

const firaCode = Fira_Code({
    subsets: ['latin'],
})
export default function Header() {
    return (
        <header>
            <div className='header-content'>
            <span className={styles.Label}>
                <span className={styles.Name}>Mohamed Sheref</span>
                <span className={styles.Comment + " " + firaCode.className}>//Undefined but not Null</span>
            </span>
                <nav>
                <Link href="/"><span>Home</span></Link>
                <Link href="/lab"><span>Lab</span></Link>
                <Link href="/"><span>Socials</span></Link>
            </nav>
            </div>
        </header>
    )
}