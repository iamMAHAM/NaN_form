import { useParams } from "react-router-dom";

const Detail = () => {
    const { id } = useParams()
    return ( 
        <div className="detail">
            <h2>Page de Detail - {id}</h2>
        </div>
     );
}
 
export default Detail;