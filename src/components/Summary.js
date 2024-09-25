import { useMemo } from "react";
import successImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  const getKeyword = useMemo(() =>{
    if(score / (noq * 5) * 100 < 50){
      return "failed";
    }
    else if(score / (noq * 5) * 100 < 75){
      return "good";
    }
    else if(score / (noq * 5) * 100 < 100){
      return "very good";
    }
    else return "execllent";
  },[score, noq]);
  const url = `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`;
  const headers = {
    Authorization: process.env.RACT_APP_PEXELS_API_KEY
  }
  const {loading, error, result} = useFetch(url, "GET", headers);
  const image = result ? result?.photos[0].src.medium : successImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={classes.badge}>Loading you badge.....</div>}
      {error && <div className={classes.badge}>An error occured!</div>}
      {
        !loading && !error && (
          <>
            <div className={classes.badge}>
              <img src={image} alt="Success" />
            </div>
          </>
        )
      }
    </div>
  );
}
