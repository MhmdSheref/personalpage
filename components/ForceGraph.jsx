// import ForceGraph2D from 'react-force-graph-2d';
import React from "react";
import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(
    () => import('react-force-graph-2d'),
    { ssr: false }
);
export default React.memo(function ForceGraph({blogs, setActiveBlogId}) {


        function dataFromBlogs(blogs) {
        let nodes = []
        let links = []

        blogs.forEach((blogEntry) => {
            nodes.push({
                id:blogEntry.id,
                label:blogEntry.title,
                val:blogEntry.tags.length + 1,
                tags:blogEntry.tags,
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
        // Example: Log node or trigger modal/open panel/etc.
        setActiveBlogId(node.id)
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

    function nodePaint(node, color, ctx) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.val+3, 0, 2 * Math.PI, false);
        ctx.fill(); // circle

        ctx.fillStyle = "#dfdcdc"
        ctx.font = '3px Sans-Serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        wrapText(ctx, node.label, node.x, node.y + node.val + 6, 50, 3)
    }

    // gen a number persistent color from around the palette
    const getColor = n => '#' + (
        ([...n].reduce((acc, val, i)=> ((i === 0? acc : 0) + val.charCodeAt(0))) * 12345678)
        % Math.pow(2, 24)).toString(16).padStart(6, '0');


    return (
        <ForceGraph2D
            graphData={dataFromBlogs(blogs)}
            onNodeClick={handleNodeClick}
            // nodeLabel="label"
            // nodeAutoColorBy="id"
            maxZoom={10}
            minZoom={1}
            nodeCanvasObject={(node, ctx) => nodePaint(node, getColor(node.tags[0]? node.tags[0] : "a"), ctx)}
            // nodePointerAreaPaint={nodePaint}
        />
    );
});