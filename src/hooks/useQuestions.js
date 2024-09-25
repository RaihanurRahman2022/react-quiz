
import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from 'react';

export default function useQuestions(videoId) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchQuestions(){
            //database realated works
            const db = getDatabase();
            const quizeRef = ref(db, "quiz/" + videoId + "/questions");
            const quizQuery = query(
                quizeRef,
                orderByKey()
            );

            try{
                setError(false);
                setLoading(true);

                //requst firebase database
                const snapshot = await get(quizQuery);
                console.log(snapshot);
                setLoading(false);

                if(snapshot.exists()){
                    console.log(snapshot.val());
                    setQuestions((prevQuestions) =>{
                        return [...prevQuestions, ...Object.values(snapshot.val())]
                    });
                }
            }
            catch(err){
                console.log(err); 
                setError(true);
                setLoading(false);
            }
        }
        
        
        fetchQuestions();
    },[videoId]);

    return {
        loading,
        error,
        questions,
    };
}
