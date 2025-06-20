import { useEffect, useRef } from "react";
import { createNoise3D } from 'simplex-noise';

export default function FlowField({
                                      width = 1280,
                                      height = 720,
                                      factor = 16,
                                      partNum = 500,
                                      defaultStopped = false,
                                      mode = "waves",
                                      disappearing = true,
                                      showGrid = false,
                                      randomColors = false,
                                      color = "#ff0000",
                                      transparency = true,
                                      speed = 5,
                                      timeFactor = 1,
                                  }) {
    const noise3D = createNoise3D();
    const ctx = useRef(null);
    const refCanvas = useRef(null);
    const animationRef = useRef(null);
    const stopped = useRef(false); // initialized as false

    // Refs for all props (to be used inside anim)
    const modeRef = useRef(mode);
    const disappearingRef = useRef(disappearing);
    const showGridRef = useRef(showGrid);
    const randomColorsRef = useRef(randomColors);
    const colorRef = useRef(color);
    const transparencyRef = useRef(transparency);
    const speedRef = useRef(speed);
    const timeFactorRef = useRef(timeFactor);

    const gridWidth = Math.ceil(width / factor + 1);
    const gridHeight = Math.ceil(width / factor + 1);
    const gridTotal = gridWidth * gridHeight;

    useEffect(() => { stopped.current = defaultStopped }, [defaultStopped]);

    // Update refs when props change
    useEffect(() => { modeRef.current = mode }, [mode]);
    useEffect(() => { disappearingRef.current = disappearing }, [disappearing]);
    useEffect(() => { showGridRef.current = showGrid }, [showGrid]);
    useEffect(() => { randomColorsRef.current = randomColors }, [randomColors]);
    useEffect(() => { colorRef.current = color }, [color]);
    useEffect(() => { transparencyRef.current = transparency }, [transparency]);
    useEffect(() => { speedRef.current = speed }, [speed]);
    useEffect(() => { timeFactorRef.current = timeFactor }, [timeFactor]);

    function startAnimation(animFn) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(animFn);
    }

    useEffect(() => {
        const canvas = refCanvas.current;
        if (!canvas) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const wasStopped = stopped.current;
                stopped.current = !entry.isIntersecting || defaultStopped;
                if (!stopped.current && wasStopped) {
                    startAnimation(anim);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(canvas);
        return () => observer.unobserve(canvas);
    }, [defaultStopped]);

    function normalize([x, y]) {
        const norm = Math.sqrt(x * x + y * y);
        return norm === 0 ? [x, y] : [x / norm, y / norm];
    }

    let grid = [];

    function noise_grid() {
        grid = [];
        for (let i = 0; i < gridTotal; i++) {
            const random = 2 * (Math.random() - 0.5);
            grid.push([Math.cos(random * Math.PI), Math.sin(random * Math.PI)]);
        }
    }

    function perlin_grid(t) {
        grid = [];
        for (let i = 0; i < gridTotal; i++) {
            const j = Math.floor(i / gridWidth);
            const perlin_noise = noise3D((i % gridWidth + 1) / gridWidth, (j + 1) / gridHeight, t / 4 * timeFactorRef.current);
            grid.push([Math.cos(perlin_noise * Math.PI), Math.sin(perlin_noise * Math.PI)]);
        }
    }

    function point_grid(X, Y, push = false) {
        grid = [];
        for (let i = 0; i < gridTotal; i++) {
            const j = Math.floor(i / gridWidth);
            let point = [X - (i % gridWidth + 1) * factor, Y - (j + 1) * factor];
            if (push) point = [-point[0], -point[1]];
            grid.push(normalize(point));
        }
    }

    function stroke_grid() {
        for (let i = 0; i < grid.length; i++) {
            const j = Math.floor(i / gridWidth);
            const x = (i % gridWidth) * factor + factor / 2;
            const y = j * factor + factor / 2;
            const dx = grid[i][0] * 10;
            const dy = grid[i][1] * 10;
            const endX = x + dx;
            const endY = y + dy;
            const angle = Math.atan2(dy, dx);
            const headLength = 5;

            ctx.current.beginPath();
            ctx.current.strokeStyle = "white";
            ctx.current.moveTo(x, y);
            ctx.current.lineTo(endX, endY);
            ctx.current.stroke();

            ctx.current.beginPath();
            ctx.current.moveTo(endX, endY);
            ctx.current.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
            ctx.current.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
            ctx.current.lineTo(endX, endY);
            ctx.current.fillStyle = "white";
            ctx.current.fill();
        }
    }

    function color_randomizer() {
        return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
    }

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.movementVector = [0, 0];
        this.baseColor = color_randomizer();

        this.move = function () {
            const pos = { x: this.x, y: this.y };
            const useColor = randomColorsRef.current ? this.baseColor : colorRef.current + (transparencyRef.current ? "35" : "ff");
            const speed = speedRef.current;

            let idx = Math.round(pos.x / factor) + gridWidth * Math.round(pos.y / factor);
            idx = Math.max(0, Math.min(idx, gridTotal - 1));
            this.movementVector[0] += grid[idx][0] / 20;
            this.movementVector[1] += grid[idx][1] / 20;
            this.movementVector = normalize(this.movementVector);

            const new_pos = [pos.x + this.movementVector[0] * speed, pos.y + this.movementVector[1] * speed];
            this.x = new_pos[0];
            this.y = new_pos[1];

            ctx.current.beginPath();
            ctx.current.strokeStyle = useColor;
            ctx.current.moveTo(pos.x, pos.y);
            ctx.current.lineTo(new_pos[0], new_pos[1]);
            ctx.current.stroke();

            if (modeRef.current === "speed") {
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.movementVector = [0, 0];
                }
            } else {
                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;
            }
        };
    }

    let anim;

    useEffect(() => {
        const canvas = refCanvas.current;
        if (!canvas) return;

        const canvasCtx = canvas.getContext("2d");
        ctx.current = canvasCtx;
        canvasCtx.fillStyle = "rgba(0,0,0)";
        canvasCtx.fillRect(0, 0, width, height);

        const particles = Array.from({ length: partNum }, () =>
            new Particle(Math.random() * width, Math.random() * height)
        );
        const counter = { current: 0 };

        anim = function () {
            if (stopped.current) return;

            switch (modeRef.current) {
                case "waves":
                    perlin_grid(counter.current / 120);
                    break;
                case "perlin":
                    perlin_grid(0);
                    break;
                case "noise":
                    noise_grid();
                    break;
                case "center":
                    point_grid(width / 2, height / 2);
                    break;
                case "straight":
                    grid = Array(gridTotal).fill([1, 0]);
                    break;
                case "speed":
                    point_grid(width / 2, height / 2, true);
                    if (disappearingRef.current) {
                        canvasCtx.fillRect(0, 0, width, height);
                    }
                    break;
            }

            if (showGridRef.current) {
                canvasCtx.fillStyle = "rgba(0,0,0,1)";
                canvasCtx.fillRect(0, 0, width, height);
                stroke_grid();
            }

            canvasCtx.fillStyle = "rgba(0,0,0,0.05)";
            if (counter.current % 5 === 0 && disappearingRef.current) {
                canvasCtx.fillRect(0, 0, width, height);
            }

            if (!showGridRef.current) {
                particles.forEach((p) => p.move());
            }

            counter.current++;
            animationRef.current = requestAnimationFrame(anim);
        }

        if (!defaultStopped) {
            animationRef.current = requestAnimationFrame(anim);
        }

        return () => cancelAnimationFrame(animationRef.current);
    }, [width, height, partNum, defaultStopped]);

    return (
        <div
            style={{
                overflow: "hidden",
                width: "100%",
                maxWidth: "max-content",
                display: "flex",
                justifyContent: "center",
            }}
            onClick={() => {
                if (stopped.current) {
                    stopped.current = false;
                    startAnimation(anim);
                }
            }}
        >
            <canvas ref={refCanvas} width={width} height={height} />
        </div>
    );
}
