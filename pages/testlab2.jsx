import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
} from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

export default function jsPlayground () {
    return (
        <SandpackProvider template="vanilla" theme={atomDark}>
            <SandpackLayout>
                <SandpackCodeEditor showLineNumbers />
                <SandpackPreview />
            </SandpackLayout>
        </SandpackProvider>
    )

}

// files ={{"filepath":{code:"code", active: true}}} //on starting file active:true