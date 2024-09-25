
import { useEffect, useState } from "react";

export default function useFetch(url, method, headers) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [result, setResult] = useState(null);


    useEffect(()=>{
        async function requestfetch() {
            try {
                setLoading(true);
                setError(false);
                const respose = await fetch(url,{
                    method: method || "GET",
                    headers: headers
                });
                const data = await respose.json();

                setLoading(false);
                setResult(data);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        requestfetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return {
        loading,
        error,
        result
    }
}