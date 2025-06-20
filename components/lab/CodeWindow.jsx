import PythonPlayground from "@/components/lab/PythonPlayground";
import {useEffect, useState} from "react";

export default function CodeWindow({lang, file, code}) {
    if (lang === "py") {
        const [finalCode, setFinalCode] = useState("")
        useEffect(() => {
            if (code) {
                setFinalCode(code)
            } else if (file) {
                fetch(file).then((res => res.text())).then(text => setFinalCode(text))
            }
        }, []);
        return (
            <PythonPlayground code={finalCode}/>
        )
    }
    if (lang === "js") {
        return (
            <>
                <canvas id={"canvas"}/>


            </>
        )
    }
}