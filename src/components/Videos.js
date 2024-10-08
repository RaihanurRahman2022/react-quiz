import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";
import useVideoList from './../hooks/useVideoList';
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1);
  const {loading, error, videos, hasMore} = useVideoList(page);

  return (
    <div>
      {
        videos.length > 0 && (
          <InfiniteScroll
          dataLength ={videos.length}
          hasMore={hasMore}
          next={()=>setPage((prev) => prev + 8)}
          loader="Loading..."
          >
            {videos.map((video) => 
              video.noq > 0 ? (
                <Link to={{ 
                  pathname: `/quiz/${video.youtubeID}`,
                  state: {
                    videoTitle: video.title
                  }
                }} key={video.youtubeID}>
                <Video title={video.title} id={video.youtubeID}  noq={video.noq}/>
              </Link>
              ): (
                <Video title={video.title} key={video.youtubeID} id={video.youtubeID}  noq={video.noq}/>
              )
            )} 
          </InfiniteScroll>
        )
      }
      {!loading && videos.length === 0 && (
        <div>No Data found!</div>
      )}
      {!error && (
        <div>There was an error!</div>
      )}
      {
        loading && <div>Loading...</div>
      }
    </div>
  );
}
