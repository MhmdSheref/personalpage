import FlowField from "@/components/lab/labContent/FlowField";
import styles from "@/styles/lab.module.css";
import { useState } from "react";

export default function FlowFieldController() {
    const [color, setColor] = useState("#ff0000");
    const [mode, setMode] = useState("waves");
    const [disappearing, setDisappearing] = useState(true);
    const [transparency, setTransparency] = useState(true);
    const [randomColors, setRandomColors] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [partNum, setPartNum] = useState(500);
    const [speed, setSpeed] = useState(5);
    const [timeFactor, setTimeFactor] = useState(1);
    const [resetKey, setResetKey] = useState(0);

    return (
        <>
            <div className={styles.canvasContainer}>
                <FlowField
                    key={resetKey} // forces reset when needed
                    color={color}
                    mode={mode}
                    disappearing={disappearing}
                    transparency={transparency}
                    randomColors={randomColors}
                    showGrid={showGrid}
                    partNum={partNum}
                    speed={speed}
                    timeFactor={timeFactor}
                />
            </div>

            <div className={styles.dataContainer}>
                <fieldset className={styles.fieldset}>
                    <legend>Mode</legend>
                    {[
                        "waves",
                        "perlin",
                        "noise",
                        "center",
                        "straight",
                        "speed"
                    ].map((m) => (
                        <label key={m}>
                            <input
                                type="radio"
                                name="mode"
                                value={m}
                                checked={mode === m}
                                onChange={() => setMode(m)}
                            />
                            {m.charAt(0).toUpperCase() + m.slice(1)}
                        </label>
                    ))}
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <legend>Toggles</legend>
                    <label>
                        <input
                            type="checkbox"
                            checked={disappearing}
                            onChange={(e) => setDisappearing(e.target.checked)}
                        />
                        Disappearing
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={transparency}
                            onChange={(e) => setTransparency(e.target.checked)}
                        />
                        Transparency
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={randomColors}
                            onChange={(e) => setRandomColors(e.target.checked)}
                        />
                        Random Colors
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={showGrid}
                            onChange={(e) => setShowGrid(e.target.checked)}
                        />
                        Show Grid
                    </label>
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <legend>Numbers</legend>
                    <label>
                        Number of particles:
                        <br />
                        <input
                            type="number"
                            value={partNum}
                            step={100}
                            onChange={(e) => setPartNum(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Speed:
                        <br />
                        <input
                            type="number"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Time Factor:
                        <br />
                        <input
                            type="number"
                            value={timeFactor}
                            onChange={(e) => setTimeFactor(Number(e.target.value))}
                        />
                    </label>
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <legend>Misc</legend>
                    <label>
                        Color:
                        <br />
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.currentTarget.value)}
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="button"
                            value="Restart"
                            onClick={() => setResetKey((k) => k + 1)}
                        />
                    </label>
                </fieldset>
            </div>
        </>
    );
}
