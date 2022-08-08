import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    const {data: blogsList, isloading, error} = useFetch("http://localhost:8000/users")
    return (
        <div className="container">
            {error && <div>Une erreur est survenue</div>} 
            {isloading && <div>Loading ...</div>}
            {blogsList && <BlogList blogs={ blogsList } title={"Liste total des blogs"}/>}
        </div> 
     );
}

export default Home;