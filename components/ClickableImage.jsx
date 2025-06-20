import Image from "next/image";
import {useState} from "react";

export default function ClickableImage(props) {
    const [imagePrevShown, setImagePrevShown] = useState(false);
    function handleClick() {
        setImagePrevShown(prevState => !prevState)
    }
    return (
        <>
            {imagePrevShown && <Image {...props} style={{position:"absolute"}}/>}
            <Image {...props} onClick={handleClick}/>
        </>

    )

}