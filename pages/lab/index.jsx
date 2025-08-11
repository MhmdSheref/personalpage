import {labs} from "@/lib/labs"
import LabCard from "@/components/lab/LabCard";
import styles from "@/styles/lab.module.css"
import Head from "next/head";
export default function Lab() {

    return (
        <>
            <Head>
                <title>Lab | Mohamed Sheref</title>
            </Head>
            <div className={styles.Title}><h1>Welcome to the lab!</h1></div>
            <div className={styles.gridContainer}>
                <div className={styles.grid}>
                    {labs.map((labEntry)=>(
                        <LabCard key={labEntry.id} labEntry={labEntry}/>
                    ))}
                </div>
            </div>
        </>

)
}