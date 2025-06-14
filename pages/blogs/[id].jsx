import BlogArticle from "@/components/BlogArticle";
import {blogs} from "@/blogs";
import styles from "@/styles/blog.module.css"

export const getStaticPaths = async () => {
    const paths = blogs.map((blog) => ({
        params: {id: blog.id.toString()},
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) => {
    const blog = blogs.find((i) => i.id.toString() === params?.id);

    if (!blog) {
        return { notFound: true };
    }

    return {
        props: { blog },
    };
};

export default function Blog(props) {
    console.log(props)
    return (
        <div className={styles.container}>
        <BlogArticle blog={props.blog}/>
        </div>
    );
}
