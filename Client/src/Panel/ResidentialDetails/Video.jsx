import React from "react";
import "../../assets/paneldesign/css/Video.css";

const Video = () => {

  // ==========================================
  // TEST VIDEO
  // ==========================================

  const videoName =
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  const isYouTube =
    videoName.includes("youtube.com") ||
    videoName.includes("youtu.be");


  // ==========================================
  // YOUTUBE URL -> EMBED URL
  // ==========================================

  const getYouTubeEmbedUrl = (url) => {

    try {

      if (url.includes("youtube.com/watch")) {

        const videoId =
          new URL(url).searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }


      if (url.includes("youtu.be/")) {

        const videoId =
          url
            .split("youtu.be/")[1]
            .split("?")[0];

        return `https://www.youtube.com/embed/${videoId}`;
      }


      if (url.includes("youtube.com/embed/")) {
        return url;
      }


      return url;

    } catch (error) {

      console.error(
        "YouTube URL error:",
        error
      );

      return url;
    }
  };


  return (

    <section
      id="videos"
      className="videos_section"
    >

      <div className="container">


        {/* =====================================
            VIDEO HEADING
        ===================================== */}

        <div className="video_heading">

          <h2>
            VIDEO
          </h2>

          <div className="video_heading_line">
            <span></span>
          </div>

        </div>


        {/* =====================================
            VIDEO
        ===================================== */}

        <div className="video_wrapper_outer">

          <div className="video_wrapper">

            {isYouTube ? (

              <iframe
                src={getYouTubeEmbedUrl(videoName)}
                title="Property Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            ) : (

              <video
                className="property_video"
                controls
                preload="metadata"
              >

                <source
                  src={`/IndeptHVVideo/${videoName}`}
                  type="video/mp4"
                />

                Your browser does not support
                the video tag.

              </video>

            )}

          </div>

        </div>

      </div>

    </section>

  );
};

export default Video;