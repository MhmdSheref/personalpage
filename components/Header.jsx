import {useState} from "react";
import Link from "next/link";
import styles from "@/styles/header.module.css"
import {Fira_Code} from "next/font/google";

const firaCode = Fira_Code({
    subsets: ['latin'],
})
export default function Header() {
    const [hamChecked, setHamChecked] = useState(false)

    return (
        <header className={styles.Header}>
            <div className={styles.HeaderContent}>
                <span className={styles.Label}>
                    <Link href={"/"} style={{boxShadow:"none", borderBottom:"none"}}>
                    <span className={styles.Name}>
                        Mohamed Sheref
                    </span>
                    </Link>
                    <span className={styles.Comment + " " + firaCode.className}>//Undefined but not Null</span>
                </span>
                <label className={styles.HamMenu}>
                    <img src="/hamMenu.svg" alt="Hamburger Menu" />
                    <input style={{display:"none"}} type="checkbox" onChange={(e)=>setHamChecked(e.target.checked)}/>
                </label>
                <nav className={styles.Nav + " " + (hamChecked? styles.Open : null)}>
                    <Link href="/"><span>Home</span></Link>
                    <Link href="/lab"><span>Lab</span></Link>
                    <Link href="/about"><span>About Me</span></Link>
                </nav>
            </div>
        </header>
    )
}