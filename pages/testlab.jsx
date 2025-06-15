import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {EditorView} from "@codemirror/view";
export default function PythonPlayground() {
    const [pyodide, setPyodide] = useState(null);
    const [output, setOutput] = useState('');
    const [code, setCode] = useState(`print("Hello from Python!")`);

    useEffect(() => {
        const loadPyodideScript = async () => {
            if (!window.loadPyodide) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.1/full/pyodide.js';
                script.onload = async () => {
                    const pyodideInstance = await (window).loadPyodide({
                        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.1/full/',
                    });
                    await pyodideInstance.loadPackage(['requests']);
                    setPyodide(pyodideInstance);
                };
                document.body.appendChild(script);
            }
        };

        loadPyodideScript();
    }, []);

    const runCode = async () => {
        if (!pyodide) return;
        try {
            const result = pyodide.runPython(code);
            // TODO: Implement functions {input, print} and my own console
            setOutput(String(result));
        } catch (err) {
            setOutput(err.message);
        }
    };

    // if (!pyodide) return <h1>Loading python environment</h1>

    return (
        <div>
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
                            lineHeight: "1.6",
                            backgroundColor: "#1e1e1e",
                            color: "#ffffff",
                        },
                        ".cm-gutters": {
                            backgroundColor: "#1e1e1e",
                            color: "#999999",
                            border: "none",
                        },
                    }),
                ]}
                basicSetup={{
                    lineNumbers: true,
                    highlightActiveLine: true,
                    highlightActiveLineGutter: true,
                }}
                onChange={(e) => setCode(e)}
            />
            <button onClick={runCode} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Run Python
            </button>
        </div>
    );

}
