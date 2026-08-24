import React from "react";

import LandCoverBanner from "./LandDetails/LandCoverBanner";
import LandVideo from "./LandDetails/LandVideo";
import LandAbout from "./LandDetails/LandAbout";
import LandMasterPlan from "./LandDetails/LandMasterPlan";
import LandElevation from "./LandDetails/LandElevation";
import LandFloorPlans from "./LandDetails/LandFloorPlans";
import LandAmenities from "./LandDetails/LandAmenities";
import LandNearby from "./LandDetails/LandNearby";
import dummyLandData from "./LandDetails/dummyLandData";


const LandDetails = () => {
  const property = dummyLandData;

  return (
    <>
      {/* Land Cover Banner */}
      <LandCoverBanner
        LandcvrimgBnr={property.LandcvrimgBnr}
      />
        {/* Land Video Section */}
        <LandVideo
          VideoThumbnailImage={property.VideoThumbnailImage}
          YouTubeLink={property.YouTubeLink}
          LandVTImgAltTxt={property.LandVTImgAltTxt}
          LandVTImgTitle={property.LandVTImgTitle}
          LPVDTempModel={property.LPVDTempModel}
        />

        {/* Land About Section */}
        <LandAbout
          Aboutlst={property.Aboutlst}
          LpABTempModel={property.LpABTempModel}
          LandAPImgAltTxt={property.LandAPImgAltTxt}
          LandAPImgTitle={property.LandAPImgTitle}
        />

        <LandMasterPlan
        MasterPlanImage={property.MasterPlanImage}
        LandMPImgAltTxt={property.LandMPImgAltTxt}
        LandMPImgTitle={property.LandMPImgTitle}
        LpMSTempModel={property.LpMSTempModel}
      />

      <LandElevation
        LOETempModel={property.LOETempModel}
        LpABTempModel={property.LpABTempModel}
      />

      <LandFloorPlans
        LfpTempModel={property.LfpTempModel}
        LpABTempModel={property.LpABTempModel}
      />
      <LandAmenities
        amineties={property.amineties}
      />
        <LandNearby
        nearbies={property.nearbies}
        mapimageTitle={property.mapimageTitle}
      />

    </>
  );
};

export default LandDetails;