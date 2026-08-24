import React from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";
const LandVideo = ({
  VideoThumbnailImage,
  YouTubeLink,
  LandVTImgAltTxt,
  LandVTImgTitle,
  LPVDTempModel,
}) => {
  // Same condition as:
  // !string.IsNullOrEmpty(Model.VideoThumbnailImage)
  // && !string.IsNullOrEmpty(Model.YouTubeLink)

  if (!VideoThumbnailImage || !YouTubeLink) {
    return null;
  }

  return (
    <section className="video_area">
      <div className="container">
        <div className="row">

          <div className="col-md-8">
            <div className="video_wrap">

              <a
                className="play-video"
                data-fancybox=""
                href={YouTubeLink}
              >
                <div className="video_box">

                  <img
                    src={`${VideoThumbnailImage}`}
                    alt={LandVTImgAltTxt || ""}
                    title={LandVTImgTitle || ""}
                  />

                  <img
                    src="/Images/play_btn.webp"
                    className="play_btn"
                    alt="Play"
                  />

                </div>
              </a>

            </div>
          </div>

          {LPVDTempModel && (
            <div className="col-md-4 sec-ab">
              <div className="box-about wow zoomIn animated animated">

                <h2>
                  {LPVDTempModel.VdProjectName}
                </h2>

                <h4>
                  {LPVDTempModel.VdComapanyName}
                </h4>

                <h3>
                  {LPVDTempModel.VdDes}
                </h3>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default LandVideo;