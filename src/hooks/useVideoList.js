
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";
import { useEffect, useState } from 'react';

export default function useVideoList(page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState([]);

    useEffect(() => {
        async function fetchVideos(){
            //database realated works
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt(""+ page),
                limitToFirst(8)
            );

            try{
                setError(false);
                setLoading(true);

                //requst firebase database
                const snapshot = await get(videoQuery);
                console.log(snapshot);
                setLoading(false);

                if(snapshot.exists()){
                    console.log(snapshot.val());
                    setVideos((prevVideos) =>{
                        return [...prevVideos, ...Object.values(snapshot.val())]
                    });
                }
                else{
                    setHasMore(false);
                }
            }
            catch(err){
                console.log(err); 
                setError(true);
                setLoading(false);
            }
        }
        
        
        fetchVideos();
    },[page]);

    return {
        loading,
        error,
        videos,
        hasMore
    };
}
