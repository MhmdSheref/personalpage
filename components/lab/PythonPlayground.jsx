import {useEffect, useRef, useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {EditorView} from "@codemirror/view";
import styles from "@/styles/code.module.css"
import {Fira_Code} from "next/font/google";

const firaCode = Fira_Code({
    subsets: ['latin'],
    variable: "--font-fira"
})
export default function PythonPlayground(props) {
    const [pyodide, setPyodide] = useState(null);
    const [output, setOutput] = useState("");
    const [code, setCode] = useState(props.code);
    const refInput = useRef(null)


    // Loading pyodide
    useEffect(() => {
        const loadPyodideScript = async () => {
            if (!window.loadPyodide) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.1/full/pyodide.js';
                script.onload = async () => {
                    const pyodideInstance = await (window).loadPyodide({
                        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.1/full/',
                    });
                    await pyodideInstance.loadPackage(props.packages);

                    // Setting custom behaviors
                    pyodideInstance.globals.set("print", t=>handleOutput(t+"\n"));
                    pyodideInstance.globals.set("input", await handleInput);

                    setPyodide(pyodideInstance);

                };
                document.body.appendChild(script);
            }
        };

        loadPyodideScript();
    }, []);

    useEffect(() => {
        setCode(props.code)
    }, [props.code]);



    const runCode = async () => {
        if (!pyodide) return;
        try {
            await pyodide.runPythonAsync(code);
        } catch (err) {
            handleOutput(err.message);
            console.warn(err.message);
        }
    };


    async function handleSubmit(inp) {
        return new Promise(resolve => {
            inp.onkeyup = (e) => {
                if (e.key === 'Enter') {
                    resolve(inp.value);
                }
            };
        });
    }

    function handleOutput(output) {
        setOutput(prevState => prevState + output)
    }

    async function handleInput(output) {
        handleOutput(output? output : "")
        const input = await handleSubmit(refInput.current);
        handleOutput( input + "\n")
        refInput.current.value = "";
        return input

    }

    // if (!pyodide) return <h1>Loading python environment</h1>
    return (
        <div>
            <div className={styles.pyContainer}>
                <CodeMirror
                    value={code}
                    height="300px"
                    theme="dark"
                    extensions={[
                        python(),
                        EditorView.lineWrapping,
                        EditorView.theme({
                            "&": {
                                fontFamily: `'Fira Code', 'Source Code Pro', monospace`,
                                fontSize: "14px",
                            },
                        }),
                    ]}
                    onChange={(e) => setCode(e)}
                />
                <div className={firaCode.className + " " + styles.console} >
                    {output}
                    <span className={styles.consoleInput}><input ref={refInput}/></span>
                </div>
            </div>
            <button className={styles.button} onClick={runCode} disabled={!pyodide}>
                {pyodide? "Run Python": "Loading..."}
            </button>
            <button className={styles.button} onClick={() => setOutput("")}>
                Clear Console
            </button>
        </div>
    );

}