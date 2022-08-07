
const BlogList = ({blogs, title}) => {
    return ( 
        <div className="bloglist">
            <h1>{title}</h1>
        {blogs.map(blog=>(
            <div className="blog-card" key={blog.id}>
                <a className="blog-title" href="">{blog.title}</a>
                <div className="blog-pub-date">released at : {blog.realeaseDate}</div>
                <div className="blog-author">published by : {blog.author}</div>
            </div>
        ))}
        </div>
     );
}
 
export default BlogList;