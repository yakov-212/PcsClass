import { useEffect,useState } from "react";
export default function FetchList({Component,url}){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=> {
        
        (async function () {
            try {
                const response = await fetch(url);
                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (error) {
                console.error("Failed to fetch:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);
        
    if (loading) return <p>Loading...</p>;
    return(
        <>
            <Component data={data}/>
        </>
    )
}