import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    ImgInfo: {
      type: String,
      trim: true,
    },

    ImgInfoPath: {
      type: String,
      trim: true,
    },
  },
  {
    _id: true,
  }
);

const FlatAptFloorPlanSchema = new mongoose.Schema(
  {
    BHK: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "1BHK",
        "2BHK",
        "3BHK",
        "4BHK",
        "5BHK",
        "6BHK",
        "6.5BHK",
      ],
    },

    CalculationArea: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Super Built Up Area In Sq. Ft.",
        "Built Up Area",
        "Carpet Area",
      ],
    },

    AreaInSqFt: {
      type: Number,
      default: 0,
    },

    PricePerSqft: {
      type: Number,
      default: 0,
    },

    TotalPricePerBHK: {
      type: Number,
      default: 0,
    },

    Block: {
      type: String,
      trim: true,
      default: "",
    },

    Direction: {
      type: String,
      trim: true,
      default: "",
    },

    Toilet: {
      type: Number,
      default: 0,
    },

    NoofBalcony: {
      type: Number,
      default: 0,
    },

    Description: {
      type: String,
      trim: true,
      default: "",
    },

    BuiltUpArea: {
      type: Number,
      default: 0,
    },

    CarpetArea: {
      type: Number,
      default: 0,
    },

    BhRmId: {
      type: String,
      default: null,
      trim: true,
    },

    ActualSqFt: {
      type: Number,
      default: 0,
    },

    Images: {
      type: [ImageSchema],
      default: [],
    },

    IsActive: {
      type: Boolean,
      default: true,
    },

    IsDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const IHVPlotAreaSchema = new mongoose.Schema(
  {
    // ================================
    // IMAGES
    // ================================
    Images: {
      type: [ImageSchema],
      default: [],
    },

    CalculationArea: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Super Built Up Area In Sq. Ft.",
        "Built Up Area",
        "Carpet Area",
      ],
    },

    // ================================
    // AREA DETAILS
    // ================================
    PlotArea: {
      type: Number,
      default: 0,
      min: 0,
    },

    AreaUnit: {
      type: String,
      trim: true,
      enum: [
        "sq.ft",
        "sq.yards",
        "sq.m.",
        "acres",
        "marla",
        "cents",
        "bigha",
        "Katha",
        "kanal",
        "grounds",
        "ares",
        "biswa",
        "guntha",
        "aankadam",
        "hectares",
        "rood",
        "chataks",
        "perch"
      ],
    },

    TotalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    BuiltUpArea: {
      type: Number,
      default: 0,
      min: 0,
    },

    CarpetArea: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ================================
    // BEDROOM / BATHROOM
    // ================================
    NoOfBedRoom: {
      type: Number,
      default: 1,
      min: 1,
      max: 20,
    },

    NoOfBathRoom: {
      type: Number,
      default: 1,
      min: 1,
      max: 20,
    },

    NoOfBalcony: {
      type: Number,
      default: 1,
      min: 1,
      max: 20,
    },

    // ================================
    // FURNISHED TYPE
    // ================================
    FurnishedType: {
      type: String,
      trim: true,
      enum: [
        "Furnished",
        "Semi Furmished",
        "Unfurnished"
      ],
    },

    // ================================
    // FLOOR DETAILS
    // ================================
    TotalNumberOfFloor: {
      type: Number,
      default: 1,
      min: 1,
      max: 20,
    },

    TypeOfFlooring: {
      type: String,
      trim: true,
      enum: [
        "Marble",
        "Vitrified Tile",
        "Vinyl",
        "Hardwood",
        "Granite",
        "Bamboo",
        "Concrete",
        "Laminate",
        "Linoleum",
        "Terrazzo",
        "Brick",
        "Red Oxide",
        "Bare Shell"
      ],
    },

    // ================================
    // OTHER ROOMS
    // ================================
    ServentRoom: {
      type: Boolean,
      default: false,
    },

    PujaRoom: {
      type: Boolean,
      default: false,
    },

    StudyRoom: {
      type: Boolean,
      default: false,
    },

    StoreRoom: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const CommercialFloorPlanSchema = new mongoose.Schema(
  {
    // =========================================
    // IMAGES
    // =========================================
    Images: {
      type: [ImageSchema],
      default: [],
    },

    CalculationArea: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Super Built Up Area In Sq. Ft.",
        "Built Up Area",
        "Carpet Area",
      ],
    },

    // =========================================
    // AREA DETAILS
    // =========================================
    SuperBuiltUpArea: {
      type: Number,
      default: 0,
      min: 0,
    },

    BuiltUpArea: {
      type: Number,
      default: 0,
      min: 0,
    },

    CarpetArea: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =========================================
    // PRICE DETAILS
    // =========================================
    PricePerSqFt: {
      type: Number,
      default: 0,
      min: 0,
    },

    TotalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =========================================
    // FLOOR DETAILS
    // =========================================
    TotalNoOfFloors: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =========================================
    // COMMERCIAL DETAILS
    // =========================================
    Block: {
      type: String,
      default: "",
      trim: true,
    },

    EntranceWidth: {
      type: Number,
      default: 0,
      min: 0,
    },

    CeilingHeight: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =========================================
    // FLOORING
    // =========================================
    TypeOfFlooring: {
      type: String,
      trim: true,
      enum: [
        "Marble",
        "Vitrified Tile",
        "Vinyl",
        "Hardwood",
        "Granite",
        "Bamboo",
        "Concrete",
        "Laminate",
        "Linoleum",
        "Terrazzo",
        "Brick",
        "Red Oxide",
        "Bare Shell"
      ],
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);


const LandPlotSchema = new mongoose.Schema(
  {
    PlotArea: {
      type: Number,
      default: 0,
    },

    PlotAreaUnit: {
      type: String,
      trim: true,
      enum: [
        "sq.ft",
        "sq.yards",
        "sq.m.",
        "acres",
        "marla",
        "cents",
        "bigha",
        "Katha",
        "kanal",
        "grounds",
        "ares",
        "biswa",
        "guntha",
        "aankadam",
        "hectares",
        "rood",
        "chataks",
        "perch"
      ],
    },

    PriceUnit: {
      type: String,
      trim: true,
      default: null,
    },

    TotalPrice: {
      type: Number,
      default: 0,
    },

    LengthOfPlot: {
      type: Number,
      default: 0,
    },

    BreadthOfPlot: {
      type: Number,
      default: 0,
    },

    PropertyFacing: {
      type: String,
      trim: true,
      enum: [
        "North",
        "South",
        "East",
        "West",
        "North-East",
        "North-West",
        "South-East",
        "South-West"
      ],
    },

    RoadFacingWidth: {
      type: Number,
      default: 0,
    },

    RFWidthUnit: {
      type: String,
      trim: true,
      enum: [
        "Feet",
        "Meter"
      ],
    },

  },
  {
    _id: true,
    timestamps: true,
  }
);

const LandPlotFloorDetailsSchema = new mongoose.Schema(
  {
    // -----------------------------------------
    // KATHA / SUB HEADING
    // -----------------------------------------
    Katha: {
      type: String,
      trim: true,
      default: "",
    },

    // -----------------------------------------
    // GROUND FLOOR
    // -----------------------------------------
    GroundFloorDescription: {
      type: String,
      trim: true,
      default: "",
    },

    GroundFloorImages: {
      type: [ImageSchema],
      default: [],
    },

    // -----------------------------------------
    // FIRST FLOOR
    // -----------------------------------------
    FirstFloorDescription: {
      type: String,
      trim: true,
      default: "",
    },

    FirstFloorImages: {
      type: [ImageSchema],
      default: [],
    },

    // -----------------------------------------
    // STATUS
    // -----------------------------------------
    IsActive: {
      type: Boolean,
      default: true,
    },

    IsDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const LandOurElevationSchema = new mongoose.Schema(
  {
    LOEKatha: {
      type: String,
      trim: true,
      default: "",
    },

    LOEGroundDes: {
      type: String,
      trim: true,
      default: null,
    },

    LOEGroundImgs: {
      type: [ImageSchema],
      default: [],
    },

    LOEFirstDes: {
      type: String,
      trim: true,
      default: null,
    },

    LOEFirstImgs: {
      type: [ImageSchema],
      default: [],
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const LandCoverPhotoViewSchema = new mongoose.Schema(
  {
    // -----------------------------------------
    // PROPERTY LOCATION
    // -----------------------------------------
    CVPropertyLocation: {
      type: String,
      trim: true,
      default: "",
    },

    // -----------------------------------------
    // PROPERTY PRICE
    // -----------------------------------------
    CVPropertyPrice: {
      type: String,
      trim: true,
      default: "",
    },

    // -----------------------------------------
    // PROPERTY TYPE
    // -----------------------------------------
    CVPropertyType: {
      type: String,
      trim: true,
      default: "",
    },

    // -----------------------------------------
    // PROPERTY TYPE DESCRIPTION
    // -----------------------------------------
    CVPTypeDesc: {
      type: String,
      trim: true,
      default: "",
    },

    // -----------------------------------------
    // COVER IMAGE
    // -----------------------------------------
    CVLandCvrImgName: {
      type: String,
      trim: true,
      default: "",
    },

    // -----------------------------------------
    // IMAGE ALT TEXT
    // -----------------------------------------
    CVLandCvrImgAltTxt: {
      type: String,
      trim: true,
      default: null,
    },

    // -----------------------------------------
    // IMAGE TITLE
    // -----------------------------------------
    CVLandCvrImgTitle: {
      type: String,
      trim: true,
      default: null,
    },


    // -----------------------------------------
    // COVER IMAGE Description
    // -----------------------------------------
    CoverImagedsc: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const VideoDescriptionSchema = new mongoose.Schema(
  {
    VdProjectName: {
      type: String,
      trim: true,
      default: "",
    },

    VdComapanyName: {
      type: String,
      trim: true,
      default: "",
    },

    VdDes: {
      type: String,
      trim: true,
      default: "",
    },

    Youtubevideolink: {
      type: String,
      trim: true,
      default: "",
    },

    YoutubeVideoThumbnail: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const PropertySchema = new mongoose.Schema(
  {
    /* =====================================================       
       Listing
    ===================================================== */

    // Listing.PropertyType
    PropertyType: {
      type: String,
      trim: true,
    },

    // Listing.SubPropertyType
    SubPropertyType: {
      type: String,
      trim: true,
    },

    // Listing.PropertyName
    propertyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // Listing.City
    displaycity: {
      type: String,
      trim: true,
      index: true,
    },

    // Listing.Location
    location: {
      type: String,
      trim: true,
      index: true,
    },

    // Listing.ListingImage
    listingImage: {
      type: String,
      trim: true,
    },

    // Listing.LstImageAltText
    listingImageAltText: {
      type: String,
      trim: true,
    },

    // Listing.LstImageTitle
    listingImageTitle: {
      type: String,
      trim: true,
    },

    // Listing.ProjectStatus
    projectStatus: {
      type: String,
      trim: true,
    },

    // Listing.Price
    price: {
      type: Number,
      default: 0,
    },

    // Listing.BuildupArea
    buildupArea: {
      type: Number,
      default: 0,
    },

    // MainPage.CarpetArea
    carpetArea: {
      type: Number,
      default: 0,
    },

    // Listing.PlotArea
    plotArea: {
      type: Number,
      default: 0,
    },

    // Listing.IsFeatured
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Listing.Negotiable
    negotiable: {
      type: Boolean,
      default: false,
    },

    // Listing.PlotSize
    plotSize: {
      type: String,
      trim: true,
    },

    // Listing.mainFeature
    mainFeature: {
      type: String,
      trim: true,
    },

    // Listing.PossessionMonthYear
    possessionMonthYear: {
      type: String,
      trim: true,
    },

    // Listing.IsParkingExists
    isParkingExists: {
      type: Boolean,
      default: false,
    },

    // Listing.OpenParking
    openParking: {
      type: Boolean,
      default: false,
    },

    // Listing.NoOfopenParking
    NoOfopenParking: {
      type: Number,
      default: 0,
    },

    // Listing.OpenParkingPrice
    openParkingPrice: {
      type: Number,
      default: 0,
    },

    // Listing.CovererParking
    covererParking: {
      type: Boolean,
      default: false,
    },

    // Listing.NoOfcoverParking
    NoOfcoverParking: {
      type: Number,
      default: 0,
    },

    // Listing.CoveredParkingPrice
    coveredParkingPrice: {
      type: Number,
      default: 0,
    },

    // Listing.MechanicalParking
    mechanicalParking: {
      type: Boolean,
      default: false,
    },

    // Listing.NoOfmechanicalParking
    NoOfmechanicalParking: {
      type: Number,
      default: 0,
    },

    // Listing.MechanicalParkingPrice
    mechanicalParkingPrice: {
      type: Number,
      default: 0,
    },

    // Listing.BasementParking
    basementParking: {
      type: Boolean,
      default: false,
    },

    // Listing.NoOfBasementParking
    NoOfBasementParking: {
      type: Number,
      default: 0,
    },

    // Listing.BasementParkingPrice
    BasementParkingPrice: {
      type: Number,
      default: 0,
    },

    // Listing.TotalFloorsOfTheBuilding
    totalFloorsOfBuilding: {
      type: Number,
      default: 0,
    },

    // Listing.Display_Location
    displayLocation: {
      type: String,
      trim: true,
    },

    // Listing.Newhtmleditor
    newHtmlEditor: {
      type: String,
      default: "",
    },

    // Listing.PriceByUnit
    priceByUnit: {
      type: Number,
      default: 0,
    },

    // Listing.AgreementNumber
    agreementNumber: {
      type: String,
      trim: true,
    },

    // Listing.ZoneId
    zoneId: {
      type: Number,
      default: null,
    },

    // Listing.ZoneArea
    zoneArea: {
      type: String,
      trim: true,
    },

    // Listing.IsBoxPrice
    isBoxPrice: {
      type: Boolean,
      default: false,
    },

    // Listing.IsBoxPriceWithParking
    isBoxPriceWithParking: {
      type: Boolean,
      default: false,
    },


    /* =====================================================
       MAIN PAGE INFORMATION      
    ===================================================== */

    LandPlotCoverImage: {
      type: [LandCoverPhotoViewSchema],
      default: [],
    },

    // MainPage.CoverPhoto
    coverPhoto: {
      type: String,
      trim: true,
    },

    // MainPage.CvrImgAltTxt
    coverPhotoAltText: {
      type: String,
      trim: true,
    },

    // MainPage.CvrImgTitle
    coverPhotoTitle: {
      type: String,
      trim: true,
    },

    // MainPage.Caption
    caption: {
      type: String,
      trim: true,
    },

    // MainPage.Overview
    overview: {
      type: String,
      default: "",
    },

    // =====================================================
    // FLOOR PLANS
    // =====================================================

    FlatAptFloorPlans: {
      type: [FlatAptFloorPlanSchema],
      default: [],
    },

    IHVPlotAreaDetails: {
      type: [IHVPlotAreaSchema],
      default: [],
    },

    CommercialFloorPlans: {
      type: [CommercialFloorPlanSchema],
      default: [],
    },

    LandplotDtls: {
      type: [LandPlotSchema],
      default: [],
    },

    LandPlotFloorDetails: {
      type: [LandPlotFloorDetailsSchema],
      default: [],
    },

    LandPlotElevation: {
      type: [LandOurElevationSchema],
      default: [],
    },

    // MainPage.Amenities
    Amenities: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Amenity",
        },
      ],
      default: [],
    },

    // MainPage.Nearby
    NearbyPlaces: {
      type: [
        {
          nearbyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nearby",
            required: true,
          },

          distance: {
            type: String,
            trim: true,
            default: "",
          },

          distanceValue: {
            type: Number,
            default: null,
          },

          distanceUnit: {
            type: String,
            enum: ["km", "m", "min"],
            default: "km",
          },
        },
      ],
      default: [],
    },


    // MainPage.Gallery
    gallery: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },

    // MainPage.SitePlanImage
    sitePlanImage: {
      type: String,
      trim: true,
    },

    // MainPage.SPlanImgAltText
    sitePlanImageAltText: {
      type: String,
      trim: true,
    },

    // MainPage.SPlanImgTitle
    sitePlanImageTitle: {
      type: String,
      trim: true,
    },

    // MainPage.SitePlanTotalFloors
    sitePlanTotalFloors: {
      type: String,
      default: 0,
    },

    // MainPage.SitePlanTotalLandArea
    sitePlanTotalLandArea: {
      type: String,
      trim: true,
    },

    // MainPage.SitePlanDescription
    sitePlanDescription: {
      type: String,
      default: "",
    },

    // MainPage.Map
    map: {
      type: String,
      trim: true,
    },

    // MainPage.MapImgAltTxt
    mapImageAltText: {
      type: String,
      trim: true,
    },

    // MainPage.MapImgTitle
    mapImageTitle: {
      type: String,
      trim: true,
    },

    // MainPage.EBrochure
    eBrochure: {
      type: String,
      trim: true,
    },

    // MainPage.PropertyAge
    propertyAge: {
      type: String,
      default: "",
      trim: true,
    },

    // MainPage.PropertyAge
    WashRoomType: {
      type: String,
      default: "",
      trim: true,
    },

    // MainPage.Washroom
    washroom: {
      type: Number,
      default: 0,
    },

    NoOfMeetingRoom: {
      type: Number,
      default: 0,
    },

    NoOfCabin: {
      type: Number,
      default: 0,
    },

    MinNoOfSeat: {
      type: Number,
      default: 0,
    },

    MaxNoOfSeat: {
      type: Number,
      default: 0,
    },

    PantryType: {
      type: String,
      default: "",
      trim: true,
    },

    ConferenceRoom: {
      type: String,
      default: "",
      trim: true,
    },

    ReceptionArea: {
      type: String,
      default: "",
      trim: true,
    },

    LoadingUnloadingFacility: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },

    // MainPage.Ownership
    ownership: {
      type: String,
      trim: true,
    },

    // MainPage.Description
    description: {
      type: String,
      default: "",
    },

    // MainPage.USP
    usp: {
      type: [String],
      default: [],
    },

    // MainPage.BoundaryWall
    boundaryWall: {
      type: Boolean,
      default: false,
    },

    LPFloorsallowedforconstruction: {
      type: Number,
      default: 0,
    },


    LPNoOfOpenSide: {
      type: Number,
      default: 0,
    },

    LPconstructiondoneonproperty: {
      type: Boolean,
      default: false,
    },

    Authority: {
      type: String,
      trim: true,
    },

    // MainPage.TotalNumberofTowers
    totalNumberOfTowers: {
      type: Number,
      default: 0,
    },

    // MainPage.TotalOpenSpace
    totalOpenSpace: {
      type: String,
      trim: true,
    },

    // MainPage.TotalProjectSize
    totalProjectSize: {
      type: String,
      trim: true,
    },

    // MainPage.Video
    videoDescription: {
      type: [VideoDescriptionSchema],
      default: [],
    },

    // MainPage.SocialMediaPhoto
    socialMediaPhoto: {
      type: String,
      trim: true,
    },

    // MainPage.ResSocialMediaImgAltTxt
    socialMediaImageAltText: {
      type: String,
      trim: true,
    },

    // MainPage.ResSocialMediaImgTitle
    socialMediaImageTitle: {
      type: String,
      trim: true,
    },

    /* =====================================================       
       MainPageAddOn
    ===================================================== */

    // MainPageAddOn.FullAddress
    fullAddress: {
      type: String,
      trim: true,
    },

    // MainPage.GSTapplicable
    GSTapplicable: {
      type: Boolean,
      default: false,
    },

    // MainPageAddOn.PLCharges
    GSTCharges: {
      type: Number,
      default: 0,
    },

    // MainPageAddOn.TaxGovtCharge
    TaxGovtCharge: {
      type: String,
      trim: true,
    },


    // MainPageAddOn.PLCharges
    plCharges: {
      type: Number,
      default: 0,
    },

    // MainPageAddOn.FECharges
    feCharges: {
      type: Number,
      default: 0,
    },

    // MainPageAddOn.OtherCharges
    otherCharges: {
      type: Number,
      default: 0,
    },

    // MainPageAddOn.PossessionDate
    possessionDate: {
      type: Date,
      default: null,
    },

    // MainPageAddOn.DevelopersName
    developersName: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.DevelopersAddress
    developersAddress: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.DevelopersPhoneNumber
    developersPhoneNumber: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.DevelopersWebsite
    developersWebsite: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.DevelopersEmailId   
    developersEmailId: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    // MainPageAddOn.ConPersonName
    contactPersonName: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.ConPersonPhNo
    contactPersonPhone: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.ConPersonAltPhNo
    contactPersonAlternatePhone: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.contactPersonEmailId
    contactPersonEmailId: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    // MainPageAddOn.ConPersonDesignation
    contactPersonDesignation: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.PersonShowProperty
    personShowProperty: {
      type: Boolean,
      default: false,
    },

    // MainPageAddOn.PersonPhoneNumber
    personSPPhoneNumber: {
      type: String,
      trim: true,
    },

    personSpAltPhoneNumber: {
      type: String,
      trim: true,
    },

    personSpEmailId: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    // MainPageAddOn.RateNegoPersonName
    rateNegotiationPersonName: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.RateNegoPersonPhNo
    rateNegotiationPersonPhone: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.RateNegoPersonPhNo
    rateNegotiationPersonAltPhone: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.RateNegoPersonsEmailid      
    rateNegotiationPersonsEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    // Communication flags
    isDeveloperCommunicationPhone: {
      type: Boolean,
      default: false,
    },

    isDeveloperCommunicationEmail: {
      type: Boolean,
      default: false,
    },

    iscontactPersonCommunicationPhone: {
      type: Boolean,
      default: false,
    },

    iscontactPersonCommunicationEmail: {
      type: Boolean,
      default: false,
    },

    isPersonSPCommunicationPhone: {
      type: Boolean,
      default: false,
    },

    isPersonSPCommunicationEmail: {
      type: Boolean,
      default: false,
    },

    isRateCommunicationPhone: {
      type: Boolean,
      default: false,
    },

    isRateCommunicationEmail: {
      type: Boolean,
      default: false,
    },

    // MainPageAddOn.DevelopersWebsite
    propertyWebsite: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.PaymentScheduleImage
    paymentScheduleImage: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.PaymentScheduleImageUploadDate
    paymentScheduleImageUploadDate: {
      type: Date,
      default: null,
    },

    // MainPageAddOn.CostSheetImage
    costSheetImage: {
      type: String,
      trim: true,
    },

    // MainPageAddOn.CostSheetUploadDate
    costSheetUploadDate: {
      type: Date,
      default: null,
    },

    /* =====================================================       
       MapLocation
    ===================================================== */

    // MapLocation.State
    state: {
      type: String,
      trim: true,
      index: true,
    },

    // MapLocation.City
    city: {
      type: String,
      trim: true,
    },

    // MapLocation.Location
    maplocation: {
      type: String,
      trim: true,
    },

    // MapLocation.Adress
    address: {
      type: String,
      trim: true,
    },

    street: {
      type: String,
      trim: true,
    },

    locality: {
      type: String,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },

    // MapLocation.Latitude
    latitude: {
      type: Number,
      default: null,
    },

    // MapLocation.Longitude
    longitude: {
      type: Number,
      default: null,
    },

    /* =====================================================
       SEO INFORMATION 
    ===================================================== */

    // SEO.Title
    title: {
      type: String,
      trim: true,
    },

    // SEO.Description
    seodescription: {
      type: String,
      default: "",
    },

    // SEO.Keywords
    keywords: {
      type: String,
      trim: true,
    },

    // SEO.GoogleTagManager
    googleTagManager: {
      type: String,
      trim: true,
    },

    // SEO.URLMapping
    urlMapping: {
      type: String,
      trim: true,
      index: true,
    },

    // SEO.SeoImage
    seoImage: {
      type: String,
      trim: true,
    },

    // SEO.SeoImageAltText
    seoImageAltText: {
      type: String,
      trim: true,
    },

    // SEO.SeoImageTitle
    seoImageTitle: {
      type: String,
      trim: true,
    },

    /* =====================================================
       GLOBAL STATUS
    ===================================================== */

    PropertyStatus: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isDelete: {
      type: Boolean,
      default: false,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "PropertyInfo",
  }
);

const Property = mongoose.model("PropertyInfo", PropertySchema);

export default Property;