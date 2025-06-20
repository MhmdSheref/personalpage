import {labs} from "@/lib/labs"
import LabCard from "@/components/lab/LabCard";
import styles from "@/styles/lab.module.css"
export default function Lab() {

    return (
        <>
            <div className={styles.Title}><h1>Welcome to the lab!</h1></div>
            <div className={styles.gridContainer}>
                <div className={styles.grid}>
                    {labs.map((labEntry)=>(
                        <LabCard labEntry={labEntry}/>
                    ))}
                </div>
            </div>
        </>

)
}