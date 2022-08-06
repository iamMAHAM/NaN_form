import { useState } from "react"

const Home = () => {
    const [blogs, setBlog] = useState([
        {
            id: 1,
            title: "First Article",
            realeaseDate: "01/01/2020",
            author: "iamMAHAM"
        },

        {
            id: 2,
            title: "Second Article",
            realeaseDate: "02/01/2020",
            author: "iamMAHAM2"
        },

        {
            id: 3,
            title: "Third Article",
            realeaseDate: "03/01/2020",
            author: "iamMAHAM3"
        }
    ])
    return (
        <div className="container">
            {blogs.map(blog=>(
                <div className="blog-card">
                    <p className="blog-title">{blog.title}</p>
                    <div className="blog-pub-date">released at : {blog.realeaseDate}</div>
                    <div className="blog-author">published by : {blog.author}</div>
                </div>
            ))}
        </div>
     );
}

export default Home;