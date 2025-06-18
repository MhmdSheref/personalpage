import {useEffect, useState} from "react";
import Link from "next/link";
import styles from "@/styles/header.module.css"
import {Fira_Code} from "next/font/google";
import { useRouter } from 'next/router';

const firaCode = Fira_Code({
    subsets: ['latin'],
})

export default function Header() {
    const [hamChecked, setHamChecked] = useState(false)
    const [showHeader, setShowHeader] = useState(true);
    const { pathname } = useRouter();


    useEffect(() => {
        let lastScrollY = window.scrollY;
        function handleScroll() {
            const currentScrollY = window.scrollY;
            const scrollDown = currentScrollY > lastScrollY;

            if (scrollDown) {setShowHeader(false); setHamChecked(false)}
            else setShowHeader(true);

            lastScrollY = currentScrollY;
        }
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setHamChecked(false)
    }, [pathname]);

    return (
        <header className={styles.Header} style={!showHeader? {top:"-100px"} : null}>
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
                    <input id="HamCheckbox" style={{display:"none"}} type="checkbox" checked={hamChecked} onChange={(e)=>setHamChecked(e.target.checked)}/>
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