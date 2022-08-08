import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Detail = () => {
    const { id } = useParams()
    console.log("id", id)
    const {data, isLoading, error} = useFetch("http://localhost:8000/blogs/" + id)
    return ( 
        <div className="detail">
            <h2>Page de Detail - {id}</h2>
            {error && <div>Oups no blog found</div>}
            {isLoading && <div>Loading ...</div>}
            {data && <div className="blog-detail" key={data.id}>
                <p className="title">{data.title}</p>
                <p className="">{data.content}</p>
            </div>
            }
        </div>
     );
}
 
export default Detail;