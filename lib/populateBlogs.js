import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'public', 'mdx');
const imageRegex = /!\[(.*?)]\((.*?)\)/g;

// Utility: Extract images from markdown content
function extractImagesFromContent(content) {
    const images = [];
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
        images.push({ alt: match[1], img: match[2] });
    }
    return images;
}

export function getBlog(slug, includeContent = false) {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    const images = extractImagesFromContent(content);

    return {
        id:parseInt(slug),
        ...frontmatter,
        images,
        content: includeContent ? content : null
    };
}

export function getAllBlogs(includeContent = false) {
    const fileNames = fs.readdirSync(blogsDirectory).filter(f => f.endsWith('.mdx'));
    return fileNames.map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '');
        return getBlog(slug, includeContent);
    });
}
