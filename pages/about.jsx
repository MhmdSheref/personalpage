import styles from "@/styles/socials.module.css"
import Image from "next/image";
import Head from "next/head";

const age = (() => {
    const [d, m, y] = "17/9/2006".split("/").map(Number);
    const today = new Date();
    let age = today.getFullYear() - y;
    if (
        today.getMonth() + 1 < m ||
        (today.getMonth() + 1 === m && today.getDate() < d)
    ) {
        age--;
    }
    return age;
})();

export default function About() {
    return (
        <div className={styles.container}>
            <Head>
                <title>{`About Me | Mohamed Sheref`}</title>
                <meta property="og:site_name" content="Mohamed Sheref" />
                <meta property="og:title" content="About Me | Mohmaed Sheref" />
                <meta property="og:description" content={`
                Hi
I exist

I'm Mohamed Sheref, also known online as MhmdSheref or just Sheref. I am a${age===18?"n":""} ${age}-year-old Biomedical Engineering student at Cairo University who is deeply fascinated by these wonderful machines we call computers.
`} />
                <meta property="og:url" content="https://mhmdsheref.vercel.app/" />
                <meta property="og:type" content="website" />

                <meta name="description" content={`
                Hi
I exist

I'm Mohamed Sheref, also known online as MhmdSheref or just Sheref. I am a${age===18?"n":""} ${age}-year-old Biomedical Engineering student at Cairo University who is deeply fascinated by these wonderful machines we call computers.
`}/>
                <meta property="og:image" content="https://github.com/mhmdsheref.png" />
                <meta property="og:image:width" content="128" />
                <meta property="og:image:height" content="128" />

            </Head>

            <div className={styles.card}>
                <div className={styles.Head}>
                    <span>
                        <h1>Hi</h1>
                        <h3>I exist</h3>
                    </span>
                    <div className={styles.imgCont}>
                        <Image src={"https://github.com/mhmdsheref.png"} alt={"A picture of me, Mohamed Sheref"} width={128} height={128}/>
                    </div>
                </div>

                <p>
                    I'm <span className={styles.em}> Mohamed Sheref</span>, also known online as
                    <span className={styles.em}> MhmdSheref </span> or just
                    <span className={styles.em}> Sheref</span>.
                    I am a{age===18?"n":""} {age}-year-old Biomedical Engineering student at Cairo University who is deeply
                    fascinated by these wonderful machines we call computers.
                </p>
                <p>
                    My interests shift over time, usually every few months, but the pattern stays the same:
                    It's always something related to tech or computers. Right now that includes:
                </p>
                    <ul>
                        <li>Programming</li>
                        <li>Generative AI and LLMs</li>
                        <li>Game Development</li>
                        <li>Graphic Design</li>
                        <li>3D Modeling</li>
                        <li>Reading</li>
                        <li>Watching Anime</li>
                    </ul>

                <p>So in short, you could just say I'm a <span className={styles.em}>Computer Nerd</span></p>

                <p>I'm not on social media much but you can reach out to me here:</p>
                <ul>
                    <li>Discord: <a target="_blank" rel="noopener noreferrer" href="https://discord.com/users/324519572806041600">@Sheref_</a></li>
                    <li>Github: <a target="_blank" rel="noopener noreferrer" href="https://github.com/MhmdSheref/">MhmdSheref</a></li>
                    <li>Itch.io: <a target="_blank" rel="noopener noreferrer" href="https://mhmdsheref.itch.io/">MhmdSheref</a></li>
                    <li>Email: <a target="_blank" rel="noopener noreferrer" href="mailto:mhmdsherefio@gmail.com">mhmdsherefIO@gmail.com</a></li>

                </ul>
                <p>Now go read my blogs</p>
            </div>

        </div>
    )

}