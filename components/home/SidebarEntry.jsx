import Tags from "@/components/Tags";
import Image from "next/image";
import React from "react";
import styles from "@/styles/sidebar.module.css"
import Link from "next/link";

export default React.memo(function SidebarEntry({blog}) {
    return (
        <Link href={"/blogs/"+blog.id} style={{color:"inherit"}}>
        <section className={`${styles.SidebarEntry} ${blog.isNew? styles.new : null}`}>
            <Image src={blog.images?.[0]?.img || "/T.svg"}
                   alt={blog.images?.[0]?.alt || "Cover Image"}
                   width={150} height={150}
                   quality={95}
            />
            <p>{blog.title}</p>
            <Tags tags={blog.tags.length? [blog.tags[0]] : []}/>
            <time>{blog.date}</time>
        </section>
        </Link>
    );
})

// import Link from "next/link";
//
// export default function SidebarEntry(props) {
//
//     return (
//         <Link className="SidebarEntry" href={`/blogs/${props.id}`}>
//             <img src={props.img.src? props.img.src : "/T.svg"} alt={props.img.alt? props.img.alt : "No Cover Image"}/>
//             <p>{props.text}</p>
//             <time>{props.date}</time>
//         </Link>
//     );
// }