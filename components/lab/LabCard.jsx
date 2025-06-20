import Link from "next/link";
import {labs} from "@/lib/labs"
import Image from "next/image";
import styles from "@/styles/lab.module.css"

export default function LabCard({}) {
    const labEntry = labs[0]
    return (
        <div className={styles.card}>
            <Link key={labEntry.id} href={`/lab/${labEntry.id}`}>
                <section>
                    <Image src={labEntry.image.img} alt={labEntry.image.alt} width={300} height={200} quality={100}
                           className={styles.Image}/>
                    <div className={styles.textCont}>
                        <h2>
                            {labEntry.title}
                        </h2>
                        <p>
                            {labEntry.desc}
                        </p>
                        <time>
                            {labEntry.date}
                        </time>
                    </div>

                </section>
            </Link>
        </div>
    )

}