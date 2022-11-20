import {useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setBlog] = useState(null)
    const [isloading, setisLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const abort = new AbortController()
        fetch(url, {signal: abort.signal}).then(response => {
            if (!response.ok){
                console.log('dala')
                throw Error("An unknow error has occured")
            }
            return response.json()
        }).then(data=>{
            console.log("data", data)
            setBlog(data)
            setisLoading(false)

        }).catch(err=>{
            if (err.name === "AbortError"){
                console.log("abort detected")
            }
            console.log("err", err)
            setError(true)
            setisLoading(false)
        })
        return ()=> abort.abort()
        }, [url])

        return {data, isloading, error}

}
 
export default useFetch;