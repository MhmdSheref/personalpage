import { useRef, useState, useEffect } from "react";
import styles from "@/styles/lab.module.css"
import Head from "next/head";
import Link from "next/link";

export default function Glitch() {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const [data, setData] = useState({
        mode: "offset",
        img: imgRef.current,
        minMagnitude: 100,
        maxMagnitude: 500,
        direction: "horizontal",
        minSizeX: 500,
        maxSizeX: 500,
        minSizeY: 100,
        maxSizeY: 100,
        count: 1000,
        drawBaseImg: true,
        colorMode: "RGB",
        GradientMin1: 0,
        GradientMax1: 255,
        GradientMin2: 0,
        GradientMax2: 255,
        GradientMin3: 0,
        GradientMax3: 255,
        pixelsPerColor: 1,
    });


    useEffect(() => {
        imgRef.current = new Image();
        setData((prev)=>({...prev, img: imgRef.current}))
    }, []);
    function createEmptyCanvas(e) {
        canvasRef.current.width = document.getElementById("imgWidth").value;
        canvasRef.current.height = document.getElementById("imgHeight").value;
        switch (data.mode) {
            case "gradient":
                gradient(data)
        }
    }

    // --- File handling ---
    function loadImageFromFile(file) {
        if (!file || !file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        imgRef.current = new Image();
        setData((prevData)=>({...prevData, img:imgRef.current}))
        imgRef.current.onload = () => {
            canvasRef.current.width = imgRef.current.naturalWidth;
            canvasRef.current.height = imgRef.current.naturalHeight;
            canvasRef.current.getContext("2d").drawImage(imgRef.current, 0, 0);
            switch (data.mode) {
                case "offset":
                    offset({...data, img:imgRef.current});
                    break;
                case "gradient":
                    gradient(data)
                    break;
            }
            URL.revokeObjectURL(url); // free memory
        };
        imgRef.current.src = url;
    }

    function handleFiles(e) {
        loadImageFromFile(e.target.files[0]);
    }

    // --- Drag & Drop ---
    useEffect(() => {
        function handleDrop(e) {
            e.preventDefault();
            if (e.dataTransfer.files.length > 0) {
                loadImageFromFile(e.dataTransfer.files[0]);
            }
        }
        function preventDefaults(e) {
            e.preventDefault();
        }

        window.addEventListener("dragover", preventDefaults);
        window.addEventListener("drop", handleDrop);

        return () => {
            window.removeEventListener("dragover", preventDefaults);
            window.removeEventListener("drop", handleDrop);
        };
    }, []);

    // --- Paste ---
    useEffect(() => {
        function handlePaste(e) {
            for (const item of e.clipboardData.items) {
                if (item.type.startsWith("image/")) {
                    const file = item.getAsFile();
                    loadImageFromFile(file);
                }
            }
        }
        window.addEventListener("paste", handlePaste);
        return () => window.removeEventListener("paste", handlePaste);
    }, []);

    function handleValChange(e) {
        setData((prev) => ({ ...prev, [e.target.id ? e.target.id : e.target.name]: e.target.value }));
        switch (data.mode) {
            case "offset":
                offset({...data, [e.target.id ? e.target.id : e.target.name]: e.target.value})
                break;
            case "gradient":
                gradient({...data, [e.target.id ? e.target.id : e.target.name]: e.target.value});
                break;
        }
    }

    function handleBoolChange(e) {
        setData((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
        switch (data.mode) {
            case "offset":
                offset({ ...data, [e.target.id]: e.target.checked })
                break;
            case "gradient":
                gradient({ ...data, [e.target.id]: e.target.checked });
                break;
        }    }

    function switchImgSource() {
        imgRef.current.src = canvasRef.current.toDataURL();
    }
    
    function handleDownloadImg() {
        const link = document.createElement("a");
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, "-");
        link.download = `${data.mode}_${timestamp}.png`; // filename
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
    }

    function hsvToRgb(h, s, v) {
        s /= 100;
        v /= 100;

        let c = v * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = v - c;

        let r1, g1, b1;

        if (h >= 0 && h < 60) [r1, g1, b1] = [c, x, 0];
        else if (h < 120)     [r1, g1, b1] = [x, c, 0];
        else if (h < 180)     [r1, g1, b1] = [0, c, x];
        else if (h < 240)     [r1, g1, b1] = [0, x, c];
        else if (h < 300)     [r1, g1, b1] = [x, 0, c];
        else                  [r1, g1, b1] = [c, 0, x];

        let r = Math.round((r1 + m) * 255);
        let g = Math.round((g1 + m) * 255);
        let b = Math.round((b1 + m) * 255);

        return `rgb(${r}, ${g}, ${b})`;
    }


    function offset({
                        img = imgRef.current,
                        minMagnitude = 100,
                        maxMagnitude = 500,
                        direction = "horizontal",
                        minSizeX = 500,
                        maxSizeX = 500,
                        minSizeY = 100,
                        maxSizeY = 100,
                        drawBaseImg = true,
                        count = 1000,
                    }) {
        minMagnitude /= 10;
        maxMagnitude /= 10;
        minSizeX /= 10;
        maxSizeX /= 10;
        minSizeY /= 10;
        maxSizeY /= 10;
        const ctx = canvasRef.current.getContext("2d");
        let offsetX = 0;
        let offsetY = 0;
        if (img.naturalWidth === 0) {
            console.warn("Please add an image first")
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            return
        }

        if (drawBaseImg)
            ctx.drawImage(img, 0, 0);
        else
            ctx.clearRect(0, 0, img.naturalWidth, img.naturalHeight);

        for (let i = 0; i < count; i++) {
            let startX = Math.random() * img.naturalWidth;
            let startY = Math.random() * img.naturalHeight;
            switch (direction.toLowerCase()) {
                case "right":
                    offsetX = minMagnitude + Math.random() * (maxMagnitude - minMagnitude);
                    offsetY = 0;
                    break;
                case "left":
                    offsetX = -(minMagnitude + Math.random() * (maxMagnitude - minMagnitude));
                    offsetY = 0;
                    break;
                case "down":
                    offsetX = 0;
                    offsetY = minMagnitude + Math.random() * (maxMagnitude - minMagnitude);
                    break;
                case "up":
                    offsetX = 0;
                    offsetY = -(minMagnitude + Math.random() * (maxMagnitude - minMagnitude));
                    break;
                case "horizontal":
                    offsetX =
                        (Math.random() > 0.5 ? -1 : 1) *
                        (minMagnitude + Math.random() * (maxMagnitude - minMagnitude));
                    offsetY = 0;
                    break;
                case "vertical":
                    offsetX = 0;
                    offsetY =
                        (Math.random() > 0.5 ? -1 : 1) *
                        (minMagnitude + Math.random() * (maxMagnitude - minMagnitude));
                    break;
            }

            const sizeX = minSizeX + Math.random() * (maxSizeX - minSizeX);
            const sizeY = minSizeY + Math.random() * (maxSizeY - minSizeY);
            ctx.drawImage(
                img,
                startX,
                startY,
                sizeX,
                sizeY,
                startX + offsetX,
                startY + offsetY,
                sizeX,
                sizeY
            );
        }
    }

    function gradient({
        pixelsPerColor = 1,
        direction = "horizontal",
        ...data
    }) {
        const img = canvasRef.current;

        function pickRandomColor({colorMode, GradientMin1, GradientMax1, GradientMin2, GradientMax2, GradientMin3, GradientMax3}) {
            GradientMin1 = parseInt(GradientMin1)
            GradientMax1 = parseInt(GradientMax1)
            GradientMin2 = parseInt(GradientMin2)
            GradientMax2 = parseInt(GradientMax2)
            GradientMin3 = parseInt(GradientMin3)
            GradientMax3 = parseInt(GradientMax3)
            const pick1 = Math.floor(GradientMin1 + Math.random() * (GradientMax1 - GradientMin1 + 1))
            const pick2 = Math.floor(GradientMin2 + Math.random() * (GradientMax2 - GradientMin2 + 1))
            const pick3 = Math.floor(GradientMin3 + Math.random() * (GradientMax3 - GradientMin3 + 1))


            switch (colorMode) {
                case "HSV":
                    return hsvToRgb(pick1, pick2, pick3);
                case "RGB":
                default:
                    return `rgb(${pick1}, ${pick2}, ${pick3})`
            }

        }
        const ctx = canvasRef.current.getContext("2d");
        switch (direction.toLowerCase()) {
            case "vertical":
                for (let i = 0; i < img.height; i++) {
                    if (i % pixelsPerColor !== 0) {continue}
                    ctx.fillStyle = pickRandomColor(data);
                    ctx.fillRect(0, i, img.width, pixelsPerColor)
                }
                break;
            case "horizontal":
            default:
                for (let i = 0; i < img.width; i++) {
                    if (i % pixelsPerColor !== 0) {continue}
                    ctx.fillStyle = pickRandomColor(data);
                    ctx.fillRect(i, 0, pixelsPerColor, img.height)
                }
                break;

        }
    }

    return (
        <>
            <Head>
                <title>Glitchifier | Mohamed Sheref</title>
            </Head>
            <canvas width={800} height={600} style={{maxWidth: "Min(1220px, 100%)", padding:10, boxSizing:"border-box"}} ref={canvasRef}></canvas>
            <div>
                <button onClick={()=>{document.getElementById("offset").style.display="block";document.getElementById("gradient").style.display="none"; setData((prev)=>({...prev, mode:"offset"})); offset(data)}}>Random Offset</button>
                <button onClick={()=>{document.getElementById("offset").style.display="none";document.getElementById("gradient").style.display="block"; setData((prev)=>({...prev, mode:"gradient"})); gradient(data)}}>Noise Gradient</button>
            </div>
            <fieldset style={{maxWidth: "Min(1200px, 100%)", boxSizing:"border-box", margin:10}} id="offset">
                <legend>Options:</legend>
                <input type="file" accept="image/*" onChange={handleFiles} />
                <p>You can also drag and drop or paste an image anywhere here on the site</p>
                <span className={styles.option}>
                    <button onClick={handleValChange}>Reroll</button>
                </span>
                <span className={styles.option}>
          <label htmlFor="count">Count: {data.count}</label>
          <input
              className={styles.rangeInp}
              id="count"
              type="range"
              defaultValue={1000}
              min={0}
              max={10000}
              onChange={handleValChange}
          />
        </span>
                <span className={styles.option}>
          <label htmlFor="minMagnitude">
            Minimum Offset: {data.minMagnitude}
          </label>
          <input
              className={styles.rangeInp}
              id="minMagnitude"
              type="range"
              defaultValue={100}
              min={0}
              max={1000}
              onChange={handleValChange}
          />
        </span>
                <span className={styles.option}>
          <label htmlFor="maxMagnitude">
            Maximum Offset: {data.maxMagnitude}
          </label>
          <input
              className={styles.rangeInp}
              id="maxMagnitude"
              type="range"
              defaultValue={500}
              min={0}
              max={1000}
              onChange={handleValChange}
          />
        </span>
                <span className={styles.option}>
          <label htmlFor="minSizeX">
            Minimum Slice Width: {data.minSizeX}
          </label>
          <input
              className={styles.rangeInp}
              id="minSizeX"
              type="range"
              defaultValue={500}
              min={1}
              max={1000}
              onChange={handleValChange}
          />
        </span>
                <span className={styles.option}>
          <label htmlFor="maxSizeX">
            Maximum Slice Width: {data.maxSizeX}
          </label>
          <input
              className={styles.rangeInp}
              id="maxSizeX"
              type="range"
              defaultValue={500}
              min={1}
              max={1000}
              onChange={handleValChange}
          />
        </span>
                <span className={styles.option}>
          <label htmlFor="minSizeY">
            Minimum Slice Height: {data.minSizeY}
          </label>
          <input
              className={styles.rangeInp}
              id="minSizeY"
              type="range"
              defaultValue={100}
              min={1}
              max={1000}
              onChange={handleValChange}
          />
        </span>
                <span className={styles.option}>
          <label htmlFor="maxSizeY">
            Maximum Slice Height: {data.maxSizeY}
          </label>
          <input
              className={styles.rangeInp}
              id="maxSizeY"
              type="range"
              defaultValue={100}
              min={1}
              max={1000}
              onChange={handleValChange}
          />
        </span>
                <span className={styles.option}>
          <label>
            Offset Direction:
            <select id="direction" name="direction" onChange={handleValChange}>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
              <option value="right">Right</option>
              <option value="left">Left</option>
              <option value="down">Down</option>
              <option value="up">Up</option>
            </select>
          </label>
        </span>

                <span>
          <label htmlFor="drawBaseImg">Background image:</label>
          <input
              id="drawBaseImg"
              type="checkbox"
              defaultChecked
              onChange={handleBoolChange}
          />
        </span>
                <br/>
                <br/>

                <span className={styles.option}>
          <button onClick={switchImgSource}>Use Current Image As Base</button>
        </span>
                <br/>
                <span className={styles.option}>
                    <button onClick={handleDownloadImg}>Download Image</button>
                </span>
            </fieldset>
            <fieldset style={{maxWidth: "Min(1200px, 100%)", boxSizing:"border-box", margin:10, display:"none"}} id="gradient">
                <legend>Options:</legend>
                <span className={styles.option}>
                    <label htmlFor="imgWidth">Width:</label>
                    <input id="imgWidth" type="number" defaultValue={800} min={1} max={10000}/>
                </span>
                <span className={styles.option}>
                    <label htmlFor="imgHeight">Height:</label>
                    <input id="imgHeight" type="number" defaultValue={600} min={1} max={10000}/>
                </span>
                <span className={styles.option}>
                    <button onClick={createEmptyCanvas}>Create Image</button>
                </span>
                <br/>
                <span className={styles.option}>
                    <button onClick={handleValChange}>Reroll</button>
                </span>

                <span>
                    <label htmlFor="colorMode">Color Mode:</label>
                    <label>
                        <input defaultChecked type="radio" name="colorMode" value="RGB" onChange={handleValChange}/>
                        RGB
                    </label>
                    <label>
                        <input type="radio" name="colorMode" value="HSV" onChange={handleValChange}/>
                        HSV
                    </label>
                </span>
                <span className={styles.option}>
                    <label htmlFor="GradientMin1">{data.colorMode === "RGB"? "Min Red" : "Min Hue"}: {data.GradientMin1}</label>
                    <input
                        className={styles.rangeInp}
                        id="GradientMin1"
                        type="range"
                        defaultValue={0}
                        min={0}
                        max={data.colorMode === "RGB"? 255 : 360}
                        onChange={handleValChange}
                    />
                </span>
                <span className={styles.option}>
                    <label htmlFor="GradientMax1">{data.colorMode === "RGB"? "Max Red" : "Max Hue"}: {data.GradientMax1}</label>
                    <input
                        className={styles.rangeInp}
                        id="GradientMax1"
                        type="range"
                        defaultValue={255}
                        min={0}
                        max={data.colorMode === "RGB"? 255 : 360}
                        onChange={handleValChange}
                    />
                </span>
                <span className={styles.option}>
                    <label htmlFor="GradientMin2">{data.colorMode === "RGB"? "Min Green" : "Min Saturation"}: {data.GradientMin2}</label>
                    <input
                        className={styles.rangeInp}
                        id="GradientMin2"
                        type="range"
                        defaultValue={0}
                        min={0}
                        max={data.colorMode === "RGB"? 255 : 100}
                        onChange={handleValChange}
                    />
                </span>
                <span className={styles.option}>
                    <label htmlFor="GradientMax2">{data.colorMode === "RGB"? "Max Green" : "Max Saturation"}: {data.GradientMax2}</label>
                    <input
                        className={styles.rangeInp}
                        id="GradientMax2"
                        type="range"
                        defaultValue={255}
                        min={0}
                        max={data.colorMode === "RGB"? 255 : 100}
                        onChange={handleValChange}
                    />
                </span>
                <span className={styles.option}>
                    <label htmlFor="GradientMin3">{data.colorMode === "RGB"? "Min Blue" : "Min Value"}: {data.GradientMin3}</label>
                    <input
                        className={styles.rangeInp}
                        id="GradientMin3"
                        type="range"
                        defaultValue={0}
                        min={0}
                        max={data.colorMode === "RGB"? 255 : 100}
                        onChange={handleValChange}
                    />
                </span>
                <span className={styles.option}>
                    <label htmlFor="GradientMax3">{data.colorMode === "RGB"? "Max Blue" : "Max Value"}: {data.GradientMax3}</label>
                    <input
                        className={styles.rangeInp}
                        id="GradientMax3"
                        type="range"
                        defaultValue={255}
                        min={0}
                        max={data.colorMode === "RGB"? 255 : 100}
                        onChange={handleValChange}
                    />
                </span>
                <span>
                    <label htmlFor="pixelsPerColor">Pixels Per Color: </label>
                    <input id="pixelsPerColor" type="number" defaultValue={1} min={1} max={1000} onChange={handleValChange}/>
                </span>
                <span className={styles.option}>
          <label>
            Gradient Direction:
            <select id="direction" name="direction" onChange={handleValChange}>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </label>
        </span>
                <br/>
                <span className={styles.option}>
                    <button onClick={switchImgSource}>Use Current Image As Base</button>
                </span>
                <br/>
                <span className={styles.option}>
                    <button onClick={handleDownloadImg}>Download Image</button>
                </span>
            </fieldset>
            <Link href={"/blogs/glitch-art"}>Link to related blog post</Link>
        </>
    );
}