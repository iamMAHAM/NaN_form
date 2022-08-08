import { useState } from "react";
import postData from "./postData";
import {useNavigate} from "react-router-dom"

const Add = () => {

    const [title, setTitle] = useState("New Title")
    const [author, setAuthor] = useState("iamMAHAM")
    const [content, setContent] = useState("write your content here")
    const [isPosting, setIsPositing] = useState(false)
    const [addSuccess, setAddSuccess] = useState(false)
    const navigate = useNavigate()

    const handleAddArticle = (e)=>{
        e.preventDefault()
        const tmp = new Date().toISOString().split("T")
        const date = tmp[0] + " " + tmp[1]
        const new_article = {
            id: null,
            title: title,
            realeaseDate: date,
            content: content,
            author: author
        }
        setIsPositing(true)
        setTimeout(()=>{
            postData("http://localhost:8000/blogs/", new_article, (res)=>{
                console.log(res)
                setIsPositing(false)
                setAddSuccess(true)
                navigate("/")
            })
        }, 2000)
    }
    return (
        <div className="create">
            <h2>Add a new article</h2>
            <div className="addFormular">
                <form onSubmit={ handleAddArticle} className="form">
                    <input
                        type="text" name="title" 
                        onChange={((e)=>{setTitle(e.target.value)})}
                        value={title} placeholder="A title"
                    />
                    <input
                        type="text" name="author" 
                        onChange={((e)=>{setAuthor(e.target.value)})}
                        value={author} placeholder="author Name"
                    />
                    <textarea
                        name="content" cols="50" 
                        onChange={((e)=>{setContent(e.target.value)})}
                        value={content} rows="10">
                    </textarea>

                    <button type="submit">Submit</button>
                    {isPosting && <div className="error">posting your data</div>}
                    {addSuccess && <div className="error">Article ajouté avec success</div>}
                </form>
            </div>
        </div>
     );
}
 
export default Add;