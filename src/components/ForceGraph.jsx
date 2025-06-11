import ForceGraph2D from 'react-force-graph-2d';
import React from "react";
export default React.memo(function ForceGraph({blogs, setActiveBlogId}) {
    function dataFromBlogs(blogs) {
        let nodes = []
        let links = []

        blogs.forEach((blogEntry) => {
            nodes.push({
                id:blogEntry.id,
                label:blogEntry.title,
                val:blogEntry.tags.length + 1})

            for (const link of blogEntry.links) {
                links.push({
                    source:blogEntry.id,
                    target:link,
                    color:"white"})
            }
        })
        return {nodes, links}
    }

    const handleNodeClick = node => {
        // Example: Log node or trigger modal/open panel/etc.
        setActiveBlogId(node.id)
    };

    return (
        <ForceGraph2D
            graphData={dataFromBlogs(blogs)}
            onNodeClick={handleNodeClick}
            nodeLabel="label"
            nodeAutoColorBy="id"
            maxZoom={10}
            minZoom={1}
        />
    );
});