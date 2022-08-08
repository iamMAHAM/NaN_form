const Add = () => {
    return ( 
        <div className="create">
            <h2>Add a new article</h2>
            <div className="addFormular">
                <form className="form">
                    <input type="text" name="author" placeholder="author Name"/>
                    <textarea name="content" cols="30" rows="10"></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default Add;