import Link from "next/link";
export default function Header() {
    return (
        <header>
            <div className='header-content'>
            <span>Welcome to my website</span>
            <nav>
                <Link href="/"><span>Home</span></Link>
                <Link href=""><span>Lab</span></Link>
                <Link href=""><span>Socials</span></Link>

            </nav>
            </div>
        </header>
    )
}