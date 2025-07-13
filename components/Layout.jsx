import Header from "@/components/Header";
import { Analytics } from '@vercel/analytics/next';
export default function Layout({children}) {
    return (
        <>
            <Header/>
            <div className="AllContent">{children}</div>
            <Analytics />
        </>
    )

}