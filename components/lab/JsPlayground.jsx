import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
} from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";
import {useRef} from "react";


export default function JsPlayground ({files}) {
    const refPreview = useRef(null);
    function handleClick(e) {
        // Get the coordinates of the click
        const { clientX, clientY } = e;

        // Hide the overlay temporarily
        const el = e.currentTarget;
        el.style.pointerEvents = "none";

        // Get the underlying element at that position
        const target = document.elementFromPoint(clientX, clientY);

        // Restore pointer events
        el.style.pointerEvents = "auto";

        // Dispatch a new click event to the underlying element
        if (target) {
            target.dispatchEvent(
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    clientX,
                    clientY,
                    view: window
                })
            );
        }
    }

    return (
        <SandpackProvider template="static" theme={atomDark} files={files}>
            <SandpackLayout>
                <SandpackCodeEditor showLineNumbers />
                <div style={{ position: "relative", flex:"1 1 0px", width:"100%", height: "300px" }}>
                    <SandpackPreview id={"preview"} ref={refPreview} style={{ width: "100%", height: "100%" }}  />
                    <div
                        onDoubleClick={(e) => {
                            e.currentTarget.parentElement.querySelector("#preview").requestFullscreen()
                        }}
                        onClick={handleClick}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 10,
                            background: "transparent",
                            cursor: "pointer",
                        }}
                    />
                </div>
            </SandpackLayout>
        </SandpackProvider>
    )

}

// files ={{"filepath":{code:"code", active: true}}} //on starting file active:true