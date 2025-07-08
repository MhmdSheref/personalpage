import ForceGraph2D from 'react-force-graph-2d';
import React, {useEffect, useRef} from "react";

export default React.memo(function ForceGraph({blogs, setActiveBlogId}) {
    const fgRef = useRef(null);
    const hoveredNode = useRef(null)

    useEffect(() => {
        fgRef.current?.d3Force('link').distance(40);
        fgRef.current.d3Force('link').strength(0.5);
        fgRef.current.zoom(4, 0)

    }, []);
    function dataFromBlogs(blogs) {
        let nodes = []
        let links = []

        blogs.forEach((blogEntry) => {
            nodes.push({
                id:blogEntry.id,
                label:blogEntry.title,
                val:blogEntry.tags.length + 1,
                tags:blogEntry.tags,
                isNew:blogEntry.isNew,
                color:blogEntry.color,
            })

            for (const link of blogEntry.links) {
                links.push({
                    source:blogEntry.id,
                    target:link,
                    color:"#363636",
                })
            }
        })
        return {nodes, links}
    }
    const handleNodeClick = node => {
        setActiveBlogId(node.id)
        fgRef.current.centerAt(node.x, node.y, 500);
        fgRef.current.zoom(8-node.val+Math.random(), 500);
    };

    const handleNodeHover = (node) => {
        hoveredNode.current = node
    };



    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(" ");
        let line = "";
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + " ";
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, x, y);
                line = words[i] + " ";
                y+= lineHeight;
            }
            else {
                line = testLine
            }
        }
        ctx.fillText(line, x, y)
    }

    function nodePaint(node, ctx) {
        if (node.isNew) {
            if (node.isNew) {
                ctx.strokeStyle = "mediumpurple";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(node.x, node.y, Math.sqrt(node.val || 1) * 4 , 0, 2 * Math.PI, false);
                ctx.stroke(); // outline only
            }
        }

        if (hoveredNode.current === node) {
            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.beginPath();
            ctx.arc(node.x, node.y, Math.sqrt(node.val || 1) * 4, 0, 2 * Math.PI, false);
            ctx.fill(); // circle
        }


        ctx.fillStyle = "#dfdcdc"
        ctx.font = '3px Literata';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        wrapText(ctx, node.label, node.x, node.y + node.val+6, 50, 3)
    }

    // gen a number persistent color from around the palette
    const getColor = n => (
        n.color? n.color : '#' + (
            ([...(n.tags? n.tags : "a")].reduce((acc, val, i)=> ((i === 0? acc : 0) + val.charCodeAt(0))) * 1234567)
            % Math.pow(2, 24)).toString(16).padStart(6, '0')
        )


    return (
        <ForceGraph2D
            graphData={dataFromBlogs(blogs)}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            autoPauseRedraw={false}
            ref={fgRef}
            maxZoom={10}
            minZoom={3}
            linkWidth={3}
            nodeAutoColorBy={getColor}
            nodeCanvasObjectMode={() => "after"}
            nodeCanvasObject={(node, ctx) => nodePaint(node, ctx)}


        />
    );
});