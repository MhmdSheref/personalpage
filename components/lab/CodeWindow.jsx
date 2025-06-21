import PythonPlayground from "@/components/lab/PythonPlayground";
import {useEffect, useState} from "react";

export default function CodeWindow({lang="py", file, code, packages}) {
    if (lang === "py") {
        const [finalCode, setFinalCode] = useState("")
        useEffect(() => {
            if (code) {
                setFinalCode(code)
            } else if (file) {
                fetch(file).then((res => res.text())).then(text => setFinalCode(text))
            }
            document.pyodideMplTarget = document.getElementById('plot-target')
        }, []);
        return (
            <PythonPlayground code={finalCode} packages={packages}/>
        )
    }
}