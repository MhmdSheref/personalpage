export default function SidebarEntry(props) {

    return (
        <section className="SidebarEntry" onClick={()=>props.setActiveBlogId(props.id)}>
            <img src={props.img.src? props.img.src : "/T.svg"} alt={props.img.alt? props.img.alt : "No Cover Image"}/>
            <p>{props.text}</p>
            <time>{props.date}</time>
        </section>
    );
}