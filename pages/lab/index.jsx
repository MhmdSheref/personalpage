import Link from "next/link";

export default function Lab() {
    return (
        <>
            <h1>UNDER CONSTRUCTION</h1>
            <h3>But for now you can try out these 2 upcoming features:</h3>
            <Link href={"/lab/testlab"}>Python test lab</Link><br/>
            <Link href={"/lab/testlab2"}>JavaScript test lab</Link>
        </>

)
}