import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import {EditorView} from "@codemirror/view";
import styles from "@/styles/code.module.css"


const langMap = {
    js: javascript(),
    javascript: javascript(),
    py: python(),
    python: python(),
};

export default function CodeBlock({code, language}) {
    return (
        <div className={styles.CodeBlock} >
            <CodeMirror
                value={code}
                theme="dark"
                extensions={[
                    langMap[language] || [],
                    EditorView.editable.of(false),
                    EditorView.theme({
                        "&": {
                            fontFamily: `'Fira Code', 'Source Code Pro', monospace`,
                            fontSize: "14px",
                        },
                    }),
                ]}
            />
        </div>
    );

}