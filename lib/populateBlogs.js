import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'public', 'mdx');
const imageMarkdownRegex = /!\[(.*?)]\((.*?)\)/g;
const imageHTMLRegex = /<Image\s+[^>]*?(src|alt)=["']([^"']+)["'][^>]*?(src|alt)=["']([^"']+)["'][^>]*?>/g;
function compareDatesDesc(a, b) {
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateB - dateA; // descending (newest first)
}

// Utility: Extract images from markdown content


function extractImagesFromContent(content) {
    const images = [];

    // Extract Markdown images
    let match;
    while ((match = imageMarkdownRegex.exec(content)) !== null) {
        images.push({ alt: match[1], img: match[2] });
    }

    // Extract HTML <img> tags, regardless of order
    while ((match = imageHTMLRegex.exec(content)) !== null) {
        const attr1 = match[1]; // "src" or "alt"
        const val1 = match[2];
        const val2 = match[4];

        const img = attr1 === 'src' ? val1 : val2;
        const alt = attr1 === 'alt' ? val1 : val2;

        images.push({ alt, img });
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
        id:slug,
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
    }).sort(compareDatesDesc)
        ;
}
