import { Link } from "react-router-dom";

const BlogList = ({blogs, title}) => {
    return ( 
        <div className="bloglist">
            <h1>{title}</h1>
        {blogs.map(blog=>(
            <div className="blog-card" key={blog.id}>
                <Link className="blog-title" to={`/blogs/${blog.id}`}>{blog.title}</Link>
                <div className="blog-pub-date">released at : {blog.realeaseDate}</div>
                <div className="blog-author">published by : {blog.author}</div>
            </div>
        ))}
        </div>
     );
}
 
export default BlogList;