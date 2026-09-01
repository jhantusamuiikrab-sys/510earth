import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiImage,
  FiLayers,
  FiMapPin,
  FiPlus,
  FiSave,
  FiSearch,
  FiTrash2,
  FiUpload,
  FiUser,
  FiHome,
  FiDollarSign,
  FiSettings,
  FiGlobe,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMap,
  FiInfo,
  FiCheckCircle,
  FiX,
  FiNavigation,
  FiFileText
} from "react-icons/fi";

import "../assets/Content/PropertyEntry.css";

/* =========================================================
   API
========================================================= */

const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ||
  "http://localhost:3000";

const API_URL = `${SERVER_URL}/api`;

const getImageUrl = (image) => {
  if (!image) return null;

  // Already a complete URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }
  // Backend returns path such as:
  // /uploads/amenities/amenity-123.webp
  return `${SERVER_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

const PROPERTY_API =
  `${API_URL}/properties`;

const NEARBY_API =
  `${API_URL}/nearby`;

const AMENITY_API =
  `${API_URL}/amenities`;


/* =========================================================
   CONSTANTS
========================================================= */

const BHK_OPTIONS = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "5 BHK",
  "6 BHK",
  "6.5 BHK",
];

const PROPERTY_CATEGORIES = [
  "Flat Apartment",
  "Independent House Villa",
  "Commercial",
  "Land",
];

const COMMERCIAL_SUB_PROPERTY_TYPES = [
  "Retail Space/Shop",
  "Office Space",
  "Warehouse",
  "Industry",
  "Hospital",
  "Hotel",
];

const LAND_TYPES = [
  "Residential Land",
  "Commercial Land",
  "Industrial Land",
  "Agricultural Land",
  "Farm Land",
  "Plot",
];

const SUITABLE_BUSINESS_API = `${API_URL}/suitable-business`;
const LOADING_UNLOADING_API = `${API_URL}/loading-unloading-facility`;
const CSC_API = `${API_URL}/csc`;



/* =========================================================
   PROPERTY INITIAL STATE
========================================================= */

const initialProperty = {
  // =====================================================
  // LISTING
  // =====================================================

  propertyName: "",
  catagory: "",
  subPropertyType: "",
  landType: "",
  displaycity: "",
  location: "",

  listingImage: null,
  listingImageAltText: "",
  listingImageTitle: "",

  projectStatus: "",
  price: "",
  buildupArea: "",
  carpetArea: "",
  plotArea: "",

  isFeatured: false,
  negotiable: false,

  plotSize: "",
  mainFeature: "",
  possessionMonthYear: "",

  isParkingExists: false,

  openParking: "",
  openParkingPrice: "",

  covererParking: "",
  coveredParkingPrice: "",

  mechanicalParking: "",
  mechanicalParkingPrice: "",

  totalFloorsOfBuilding: "",
  displayLocation: "",
  newHtmlEditor: "",
  priceByUnit: "",
  agreementNumber: "",
  zoneId: "",
  zoneArea: "",

  isBoxPrice: false,
  isBoxPriceWithParking: false,
  isNonCalcArea: false,


  // =====================================================
  // MAIN PAGE
  // =====================================================

  coverPhoto: null,
  coverPhotoAltText: "",
  coverPhotoTitle: "",

  caption: "",
  overview: "",

  sitePlanImage: null,
  sitePlanImageAltText: "",
  sitePlanImageTitle: "",

  sitePlanTotalFloors: "",
  sitePlanTotalLandArea: "",
  sitePlanDescription: "",

  map: null,
  mapImageAltText: "",
  mapImageTitle: "",

  eBrochure: null,

  propertyAge: "",
  washroom: "",
  ownership: "",
  description: "",
  usp: "",
  boundaryWall: "",

  totalNumberOfTowers: "",
  totalOpenSpace: "",
  totalProjectSize: "",

  video: "",

  socialMediaPhoto: null,
  socialMediaImageAltText: "",
  socialMediaImageTitle: "",


  // =====================================================
  // ADD ON
  // =====================================================

  fullAddress: "",

  plCharges: "",
  feCharges: "",
  otherCharges: "",

  possessionDate: "",

  developersName: "",
  developersAddress: "",
  developersPhoneNumber: "",
  developersWebsite: "",
  developersEmailId: "",

  contactPersonName: "",
  contactPersonPhone: "",
  contactPersonAlternatePhone: "",
  contactPersonDesignation: "",

  personShowProperty: "",
  personSPPhoneNumber: "",
  personSpAltPhoneNumber: "",

  rateNegotiationPersonName: "",
  rateNegotiationPersonPhone: "",
  rateNegotiationPersonAltPhone: "",
  rateNegotiationPersonsEmail: "",

  isDeveloperCommunicationPhone: false,
  isDeveloperCommunicationEmail: false,

  isPersonCommunicationPhone: false,
  isPersonCommunicationEmail: false,

  isRateCommunicationPhone: false,
  isRateCommunicationEmail: false,

  contactPersonsEmail: "",

  isContactPersonPhone: false,
  isContactPersonEmail: false,

  propertyWebsite: "",

  paymentScheduleImage: null,
  paymentScheduleImageUploadDate: "",

  costSheetImage: null,
  costSheetUploadDate: "",

  maintenanceCharges: "",


  // =====================================================
  // LOCATION
  // =====================================================

  state: "",
  city: "",
  maplocation: "",
  address: "",
  street: "",
  locality: "",
  pincode: "",
  latitude: "",
  longitude: "",


  // =====================================================
  // SEO
  // =====================================================

  title: "",
  seodescription: "",
  keywords: "",
  googleTagManager: "",
  urlMapping: "",

  seoImage: null,
  seoImageAltText: "",
  seoImageTitle: "",


  // =====================================================
  // GLOBAL
  // =====================================================

  PropertyStatus: "",
  isActive: true,
};


/* =========================================================
   FLOOR PLAN
========================================================= */

const createEmptyFloorPlan = (bhk) => ({
  BHK: bhk || "",

  AreaInSqFt: "",
  PricePerSqft: "",
  TotalPricePerBHK: "",

  Block: "",
  Direction: "",

  Toilet: "",
  NoofBalcony: "",

  Description: "",

  BuiltUpArea: "",
  CarpetArea: "",

  BhRmId: "",
  ActualSqFt: "",

  Images: [],
});


/* =========================================================
   FIELD COMPONENTS
========================================================= */

const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon: Icon,
  disabled = false,
}) => {
  return (
    <div className="property-field">
      <label>
        {label}

        {required && (
          <span className="required">*</span>
        )}
      </label>

      <div
        className={`property-input-wrap ${Icon ? "has-icon" : ""
          }`}
      >
        {Icon && (
          <Icon className="property-input-icon" />
        )}

        <input
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
};


const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => {
  return (
    <div className="property-field property-field-full">
      <label>{label}</label>

      <textarea
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
};


const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
}) => {
  return (
    <div className="property-field">
      <label>
        {label}

        {required && (
          <span className="required">*</span>
        )}
      </label>

      <select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        required={required}
      >
        <option value="">
          Select {label}
        </option>

        {options.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};


const Toggle = ({
  label,
  name,
  checked,
  onChange,
}) => {
  return (
    <label className="property-toggle">
      <input
        type="checkbox"
        name={name}
        checked={Boolean(checked)}
        onChange={onChange}
      />

      <span className="toggle-slider" />

      <span className="toggle-label">
        {label}
      </span>
    </label>
  );
};


/* =========================================================
   FILE UPLOAD FIELD
========================================================= */

const FileUpload = ({
  label,
  name,
  file,
  existingUrl,
  onChange,
  accept = "image/*",
  required = false,
}) => {
  const [preview, setPreview] =
    useState(existingUrl || null);

  useEffect(() => {
    if (!file) {
      setPreview(existingUrl || null);
      return;
    }

    const url =
      URL.createObjectURL(file);

    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, existingUrl]);

  const isPdf =
    file?.type === "application/pdf" ||
    existingUrl?.toLowerCase().endsWith(".pdf");

  return (
    <div className="property-file-upload">
      <label>
        {label}

        {required && (
          <span className="required">*</span>
        )}
      </label>

      <label className="property-upload-box">
        {preview && !isPdf ? (
          <img
            src={preview}
            alt={label}
            className="property-upload-preview"
          />
        ) : isPdf ? (
          <div className="property-pdf-preview">
            <FiFileText />
            <strong>
              {file?.name || "PDF document"}
            </strong>
          </div>
        ) : (
          <div className="property-upload-empty">
            <FiUpload />

            <strong>
              Click to upload
            </strong>

            <span>
              {accept.includes("pdf")
                ? "PDF · Max 10MB"
                : "JPG, PNG, WEBP, SVG · Max 5MB"}
            </span>
          </div>
        )}

        <input
          type="file"
          name={name}
          accept={accept}
          onChange={(e) =>
            onChange(e.target.files?.[0] || null)
          }
        />
      </label>

      {file && (
        <small className="uploaded-file-name">
          {file.name}
        </small>
      )}
    </div>
  );
};


/* =========================================================
   SECTION
========================================================= */

const Section = ({
  icon: Icon,
  title,
  description,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] =
    useState(defaultOpen);

  return (
    <section
      className={`property-section ${open ? "open" : ""
        }`}
    >
      <button
        type="button"
        className="property-section-header"
        onClick={() =>
          setOpen((prev) => !prev)
        }
      >
        <div className="section-heading">
          <div className="section-icon">
            <Icon />
          </div>

          <div>
            <h3>{title}</h3>

            {description && (
              <p>{description}</p>
            )}
          </div>
        </div>

        <div className="section-arrow">
          {open ? (
            <FiChevronUp />
          ) : (
            <FiChevronDown />
          )}
        </div>
      </button>

      {open && (
        <div className="property-section-body">
          {children}
        </div>
      )}
    </section>
  );
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

const PropertyEntry = () => {
  const [property, setProperty] =
    useState(initialProperty);

  const [activeTab, setActiveTab] =
    useState("basic");

  const [saving, setSaving] =
    useState(false);

  const [savedPropertyId, setSavedPropertyId] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  /* =====================================================
     CATEGORY
  ===================================================== */

  const [propertyCategory, setPropertyCategory] =
    useState("");

  const [subPropertyType, setSubPropertyType] =
    useState("");

  const [landType, setLandType] =
    useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [suitableBusinesses, setSuitableBusinesses] = useState([]);
  const [selectedSuitableBusinesses, setSelectedSuitableBusinesses] = useState([]);
  const [loadingUnloadingFacilities, setLoadingUnloadingFacilities] = useState([]);
  const [selectedLoadingUnloadingFacilities, setSelectedLoadingUnloadingFacilities] = useState([]);
  const [loadingCommercialOptions, setLoadingCommercialOptions] = useState(false);


  /* =====================================================
     AMENITIES / NEARBY
  ===================================================== */

  const [amenities, setAmenities] =
    useState([]);

  const [nearbyList, setNearbyList] =
    useState([]);

  const [selectedAmenities, setSelectedAmenities] =
    useState([]);

  const [nearbyDistances, setNearbyDistances] =
    useState({});

  const [loadingRelated, setLoadingRelated] =
    useState(false);


  /* =====================================================
     FLOOR PLANS
  ===================================================== */

  const [selectedBHK, setSelectedBHK] =
    useState("");

  const [floorPlans, setFloorPlans] =
    useState([]);


  /* =====================================================
     GALLERY FILES
  ===================================================== */

  const [galleryImages, setGalleryImages] =
    useState([]);


  /* =====================================================
     PROPERTY FILE HANDLER
  ===================================================== */

  const handleFileChange = (
    field,
    file
  ) => {
    if (!file) return;

    const isPdf =
      file.type === "application/pdf";

    const maxSize = isPdf
      ? 10 * 1024 * 1024
      : 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        isPdf
          ? "PDF size must be less than 10MB."
          : "Image size must be less than 5MB."
      );

      return;
    }

    setError("");

    setProperty((prev) => ({
      ...prev,
      [field]: file,
    }));
  };


  /* =====================================================
     GENERAL CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    console.log("name:", name);
    console.log("value:", value);

    setProperty((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (name === "propertyCategory") {
      setPropertyCategory(value);
    }
  };


  /* =====================================================
     STATE / CITY
  ===================================================== */

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const response = await axios.get(`${CSC_API}/states`, {
          withCredentials: true,
        });
        setStates(response.data?.data || []);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to load states.");
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (!property.state) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        setLoadingCities(true);
        const response = await axios.get(`${CSC_API}/cities`, {
          params: { state: property.state },
          withCredentials: true,
        });
        setCities(response.data?.data || []);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to load cities.");
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [property.state]);

  const getOptionValue = (item) => item?._id || item?.id || item?.Name || item?.name;
  const getOptionLabel = (item) => item?.Name || item?.name || item?.StateName || item?.CityName || "";

  /* =====================================================
     COMMERCIAL OPTIONS
  ===================================================== */

  useEffect(() => {
    if (propertyCategory !== "Commercial") {
      setSuitableBusinesses([]);
      setSelectedSuitableBusinesses([]);
      setLoadingUnloadingFacilities([]);
      setSelectedLoadingUnloadingFacilities([]);
      return;
    }

    const fetchCommercialOptions = async () => {
      try {
        setLoadingCommercialOptions(true);
        const requests = [
          axios.get(SUITABLE_BUSINESS_API, { withCredentials: true }),
          axios.get(LOADING_UNLOADING_API, { withCredentials: true }),
        ];
        const [businessResponse, loadingResponse] = await Promise.all(requests);

        const businesses = businessResponse.data?.data || [];
        const facilities = loadingResponse.data?.data || [];

        setSuitableBusinesses(
          businesses.filter((item) => item.IsActive !== false && item.isActive !== false)
        );
        setLoadingUnloadingFacilities(
          facilities.filter((item) => item.IsActive !== false && item.isActive !== false)
        );
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.data?.message ||
          "Failed to load commercial options."
        );
      } finally {
        setLoadingCommercialOptions(false);
      }
    };

    fetchCommercialOptions();
  }, [propertyCategory]);

  const toggleId = (setter) => (id) => {
    setter((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const toggleSuitableBusiness = toggleId(setSelectedSuitableBusinesses);
  const toggleLoadingUnloading = toggleId(setSelectedLoadingUnloadingFacilities);

  /* =====================================================
     CATEGORY CHANGE
  ===================================================== */

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setPropertyCategory(value);
    setSubPropertyType("");
    setLandType("");
    setSelectedAmenities([]);
    setNearbyDistances({});
    setAmenities([]);
    setNearbyList([]);
    setSelectedSuitableBusinesses([]);
    setSelectedLoadingUnloadingFacilities([]);

    setProperty((prev) => ({
      ...prev,
      catagory: value,
      subPropertyType: "",
      landType: "",
    }));

    setFloorPlans([]);
    setSelectedBHK("");
  };


  const handleSubPropertyTypeChange = (e) => {
    const value = e.target.value;
    setSubPropertyType(value);
    setProperty((prev) => ({ ...prev, subPropertyType: value }));
    setSelectedSuitableBusinesses([]);
    setSelectedLoadingUnloadingFacilities([]);
  };

  const handleLandTypeChange = (e) => {
    const value = e.target.value;
    setLandType(value);
    setProperty((prev) => ({ ...prev, landType: value }));
  };

  /* =====================================================
     FETCH AMENITIES + NEARBY
  ===================================================== */

  useEffect(() => {
    if (!propertyCategory) {
      setAmenities([]);
      setNearbyList([]);
      return;
    }

    const fetchRelatedData =
      async () => {
        try {
          setLoadingRelated(true);
          setError("");

          const [
            nearbyResponse,
            amenityResponse,
          ] = await Promise.all([
            axios.get(
              `${NEARBY_API}/active`,
              {
                params: {
                  catagory:
                    propertyCategory,
                },
                withCredentials: true,
              }
            ),

            axios.get(
              `${AMENITY_API}/active`,
              {
                params: {
                  catagory:
                    propertyCategory,
                },
                withCredentials: true,
              }
            ),
          ]);

          setNearbyList(
            nearbyResponse.data?.data ||
            []
          );

          setAmenities(
            amenityResponse.data?.data ||
            []
          );
        } catch (err) {
          console.error(err);

          setError(
            err?.response?.data?.message ||
            "Failed to load nearby and amenities."
          );
        } finally {
          setLoadingRelated(false);
        }
      };

    fetchRelatedData();
  }, [propertyCategory]);


  /* =====================================================
     AMENITY CHECKBOX
  ===================================================== */

  const handleAmenityToggle = (
    amenityId
  ) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenityId)) {
        return prev.filter(
          (id) => id !== amenityId
        );
      }

      return [
        ...prev,
        amenityId,
      ];
    });
  };


  /* =====================================================
     NEARBY DISTANCE
  ===================================================== */

  const handleNearbyDistance = (
    nearbyId,
    value
  ) => {
    setNearbyDistances((prev) => ({
      ...prev,
      [nearbyId]: value,
    }));
  };


  /* =====================================================
     GALLERY IMAGE
  ===================================================== */

  const handleGalleryImages = (
    e
  ) => {
    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    const invalid = files.find(
      (file) =>
        file.size >
        5 * 1024 * 1024
    );

    if (invalid) {
      setError(
        "Each gallery image must be less than 5MB."
      );

      return;
    }

    setError("");

    setGalleryImages((prev) => [
      ...prev,
      ...files,
    ]);
  };


  const removeGalleryImage = (
    index
  ) => {
    setGalleryImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };


  /* =====================================================
     FLOOR PLAN
  ===================================================== */

  const addFloorPlan = () => {
    if (!selectedBHK) {
      setError(
        "Please select a BHK first."
      );

      return;
    }

    setError("");

    setFloorPlans((prev) => [
      ...prev,
      createEmptyFloorPlan(
        selectedBHK
      ),
    ]);
  };


  const updateFloorPlan = (
    index,
    field,
    value
  ) => {
    setFloorPlans((prev) => {
      const copy = [...prev];

      copy[index] = {
        ...copy[index],
        [field]: value,
      };

      return copy;
    });
  };


  const removeFloorPlan = (
    index
  ) => {
    setFloorPlans((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };


  /* =====================================================
     FLOOR PLAN IMAGE
  ===================================================== */

  const addFloorPlanImage = (
    floorIndex,
    file
  ) => {
    if (!file) return;

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Floor plan image must be less than 5MB."
      );

      return;
    }

    setFloorPlans((prev) => {
      const copy = [...prev];

      copy[floorIndex] = {
        ...copy[floorIndex],

        Images: [
          ...copy[floorIndex].Images,

          {
            GalleryImgInfo:
              file.name,

            GalleryImgInfoPath:
              file,
          },
        ],
      };

      return copy;
    });
  };


  const removeFloorPlanImage = (
    floorIndex,
    imageIndex
  ) => {
    setFloorPlans((prev) => {
      const copy = [...prev];

      copy[floorIndex] = {
        ...copy[floorIndex],

        Images:
          copy[floorIndex].Images.filter(
            (_, i) =>
              i !== imageIndex
          ),
      };

      return copy;
    });
  };


  /* =====================================================
     CREATE PROPERTY FORM DATA
  ===================================================== */

  const buildPropertyFormData =
    () => {
      const formData =
        new FormData();

      /*
       * Normal fields
       */

      Object.entries(property).forEach(
        ([key, value]) => {
          if (
            value === null ||
            value === undefined
          ) {
            return;
          }

          if (value instanceof File) {
            return;
          }

          formData.append(
            key,
            String(value)
          );
        }
      );


      /*
       * Property category
       */

      formData.append(
        "catagory",
        propertyCategory
      );

      formData.append("subPropertyType", subPropertyType || "");
      formData.append("landType", landType || "");

      formData.append(
        "suitableBusinesses",
        JSON.stringify(selectedSuitableBusinesses)
      );

      formData.append(
        "loadingUnloadingFacilities",
        JSON.stringify(selectedLoadingUnloadingFacilities)
      );


      /*
       * Single file fields
       */

      const fileFields = [
        "listingImage",
        "coverPhoto",
        "sitePlanImage",
        "map",
        "eBrochure",
        "socialMediaPhoto",
        "paymentScheduleImage",
        "costSheetImage",
        "seoImage",
      ];

      fileFields.forEach(
        (field) => {
          if (
            property[field] instanceof File
          ) {
            formData.append(
              field,
              property[field]
            );
          }
        }
      );


      /*
       * Gallery images
       */

      galleryImages.forEach(
        (file) => {
          formData.append(
            "galleryImages",
            file
          );
        }
      );


      /*
       * Amenities
       *
       * Send JSON so backend can
       * parse selected IDs.
       */

      formData.append(
        "amenities",
        JSON.stringify(
          selectedAmenities
        )
      );


      /*
       * Nearby + distance
       *
       * Example:
       * [
       *   {
       *     nearbyId: "...",
       *     name: "Airport",
       *     distance: "5 KM"
       *   }
       * ]
       */

      const nearbyPayload =
        nearbyList
          .filter(
            (item) =>
              nearbyDistances[
              item._id
              ] !== undefined &&
              nearbyDistances[
              item._id
              ] !== ""
          )
          .map((item) => ({
            nearbyId: item._id,
            name: item.name,
            distance:
              nearbyDistances[
              item._id
              ],
          }));

      formData.append(
        "nearby",
        JSON.stringify(
          nearbyPayload
        )
      );


      return formData;
    };


  /* =====================================================
     CREATE PROPERTY
  ===================================================== */

  const createProperty =
    async () => {
      try {
        setSaving(true);
        setError("");
        setMessage("");
        console.log(property.propertyName.trim());
        if (!property.propertyName.trim()) {
          setError(
            "Property name is required."
          );
          setActiveTab("basic");
          return;
        }

        if (!propertyCategory) {
          setError(
            "Please select property category."
          );
          setActiveTab("basic");
          return;
        }

        const formData =
          buildPropertyFormData();

        const response = await axios.post(
          PROPERTY_API,
          formData,
          {
            withCredentials: true,
          }
        );

        // const response =
        //   await axios.post(
        //     PROPERTY_API,
        //     formData,
        //     {
        //       withCredentials: true,

        //       headers: {
        //         "Content-Type":
        //           "multipart/form-data",
        //       },
        //     }
        //   );

        if (
          !response.data?.success
        ) {
          throw new Error(
            response.data?.message ||
            "Failed to create property."
          );
        }

        const created =
          response.data.data;

        setSavedPropertyId(
          created._id
        );

        setMessage(
          "Property created successfully. You can now add floor plans."
        );

        setActiveTab(
          "floorplans"
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data
            ?.message ||
          err?.message ||
          "Failed to create property."
        );
      } finally {
        setSaving(false);
      }
    };


  /* =====================================================
     SAVE FLOOR PLANS
  ===================================================== */

  const saveFloorPlans =
    async () => {
      if (!savedPropertyId) {
        setError(
          "Please save the property first."
        );

        return;
      }

      if (!floorPlans.length) {
        setMessage(
          "No floor plans to save."
        );

        return;
      }

      try {
        setSaving(true);
        setError("");
        setMessage("");

        for (
          const floorPlan of floorPlans
        ) {
          const formData =
            new FormData();

          /*
           * Basic floor plan fields
           */

          Object.entries(
            floorPlan
          ).forEach(
            ([key, value]) => {
              if (
                key === "Images"
              ) {
                return;
              }

              if (
                value !== null &&
                value !== undefined
              ) {
                formData.append(
                  key,
                  String(value)
                );
              }
            }
          );


          /*
           * Floor plan images
           */

          floorPlan.Images.forEach(
            (image) => {
              if (
                image.GalleryImgInfoPath instanceof
                File
              ) {
                formData.append(
                  "Images",
                  image.GalleryImgInfoPath
                );

                formData.append(
                  "GalleryImgInfo",
                  image.GalleryImgInfo ||
                  image.GalleryImgInfoPath
                    .name
                );
              }
            }
          );


          await axios.post(
            `${PROPERTY_API}/${savedPropertyId}/floor-plans`,
            formData,
            {
              withCredentials: true,

              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );
        }

        setMessage(
          "All floor plans saved successfully."
        );

        setFloorPlans([]);
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data
            ?.message ||
          err?.message ||
          "Failed to save floor plans."
        );
      } finally {
        setSaving(false);
      }
    };


  /* =====================================================
     COMPLETION
  ===================================================== */

  const completion =
    useMemo(() => {
      const fields =
        Object.entries(
          property
        );

      const ignoredFileFields = [
        "listingImage",
        "coverPhoto",
        "sitePlanImage",
        "map",
        "eBrochure",
        "socialMediaPhoto",
        "paymentScheduleImage",
        "costSheetImage",
        "seoImage",
      ];

      const booleanFields = [
        "isFeatured",
        "negotiable",
        "isParkingExists",
        "isBoxPrice",
        "isBoxPriceWithParking",
        "isNonCalcArea",
        "isDeveloperCommunicationPhone",
        "isDeveloperCommunicationEmail",
        "isPersonCommunicationPhone",
        "isPersonCommunicationEmail",
        "isRateCommunicationPhone",
        "isRateCommunicationEmail",
        "isContactPersonPhone",
        "isContactPersonEmail",
        "isActive",
      ];

      let filled = 0;

      fields.forEach(
        ([key, value]) => {
          if (
            ignoredFileFields.includes(
              key
            )
          ) {
            if (value instanceof File) {
              filled++;
            }

            return;
          }

          if (
            booleanFields.includes(
              key
            )
          ) {
            if (value === true) {
              filled++;
            }

            return;
          }

          if (
            value !== "" &&
            value !== null &&
            value !== undefined
          ) {
            filled++;
          }
        }
      );

      if (propertyCategory) {
        filled++;
      }

      if (
        selectedAmenities.length
      ) {
        filled++;
      }

      if (
        Object.keys(
          nearbyDistances
        ).length
      ) {
        filled++;
      }

      if (floorPlans.length) {
        filled++;
      }

      const total =
        fields.length + 4;

      return Math.min(
        Math.round(
          (filled / total) *
          100
        ),
        100
      );
    }, [
      property,
      propertyCategory,
      selectedAmenities,
      nearbyDistances,
      floorPlans,
      subPropertyType,
      landType,
      selectedSuitableBusinesses,
      selectedLoadingUnloadingFacilities,
    ]);


  /* =====================================================
     TABS
  ===================================================== */

  const tabs = [
    {
      id: "basic",
      label: "Basic Details",
      icon: FiHome,
    },

    {
      id: "listing",
      label: "Listing & Pricing",
      icon: FiDollarSign,
    },

    {
      id: "media",
      label: "Media & Documents",
      icon: FiImage,
    },

    {
      id: "nearby",
      label: "Nearby & Amenities",
      icon: FiMapPin,
    },

    {
      id: "developer",
      label: "Developer & Contact",
      icon: FiUser,
    },

    {
      id: "location",
      label: "Location",
      icon: FiMap,
    },

    {
      id: "seo",
      label: "SEO",
      icon: FiSearch,
    },

    {
      id: "floorplans",
      label: "Floor Plans",
      icon: FiLayers,
    },
  ];


  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="property-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="property-topbar">

        <div className="property-header-left">

          <button
            type="button"
            className="back-button"
            onClick={() =>
              window.history.back()
            }
          >
            <FiArrowLeft />
          </button>

          <div>
            <div className="breadcrumb">
              Properties
              <span>/</span>
              New Property
            </div>

            <h1>
              {savedPropertyId
                ? "Property Details"
                : "Add New Property"}
            </h1>
          </div>

        </div>


        <div className="property-header-actions">

          <div className="completion-box">

            <div className="completion-info">
              <span>
                Completion
              </span>

              <strong>
                {completion}%
              </strong>
            </div>

            <div className="completion-bar">
              <span
                style={{
                  width:
                    `${completion}%`,
                }}
              />
            </div>

          </div>


          {!savedPropertyId ? (
            <button
              type="button"
              className="primary-btn"
              onClick={
                createProperty
              }
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  Save Property
                </>
              )}
            </button>
          ) : (
            <div className="saved-badge">
              <FiCheck />
              Property Saved
            </div>
          )}

        </div>

      </header>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="property-content">

        {/* ALERT */}

        {message && (
          <div className="success-alert">
            <FiCheckCircle />

            <span>
              {message}
            </span>

            <button
              onClick={() =>
                setMessage("")
              }
            >
              <FiX />
            </button>
          </div>
        )}


        {error && (
          <div className="error-alert">

            <FiInfo />

            <span>
              {error}
            </span>

            <button
              onClick={() =>
                setError("")
              }
            >
              <FiX />
            </button>

          </div>
        )}


        {/* =================================================
            TAB NAVIGATION
        ================================================= */}

        <div className="property-tabs">

          {tabs.map((tab) => {
            const Icon =
              tab.icon;

            return (
              <button
                type="button"
                key={tab.id}
                className={
                  activeTab ===
                    tab.id
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setActiveTab(
                    tab.id
                  );

                  window.scrollTo({
                    top: 0,
                    behavior:
                      "smooth",
                  });
                }}
              >
                <Icon />
                <span>
                  {tab.label}
                </span>
              </button>
            );
          })}

        </div>


        {/* =================================================
            BASIC DETAILS
        ================================================= */}

        {activeTab === "basic" && (
          <div className="tab-content">

            <Section
              icon={FiHome}
              title="Property Information"
              description="Basic information about your property."
            >

              <div className="property-grid">

                <TextInput
                  label="Property Name"
                  name="propertyName"
                  value={
                    property.propertyName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Green Valley Residency"
                  required
                />

                <SelectInput
                  label="Property Category"
                  name="propertyCategory"
                  value={
                    propertyCategory
                  }
                  onChange={
                    handleCategoryChange
                  }
                  required
                  options={PROPERTY_CATEGORIES.map(
                    (category) => ({
                      value:
                        category,
                      label:
                        category,
                    })
                  )}
                />

                {propertyCategory === "Commercial" && (
                  <SelectInput
                    label="Sub Property Type"
                    name="subPropertyType"
                    value={subPropertyType}
                    onChange={handleSubPropertyTypeChange}
                    required
                    options={COMMERCIAL_SUB_PROPERTY_TYPES.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                )}

                {propertyCategory === "Land" && (
                  <SelectInput
                    label="Land Type"
                    name="landType"
                    value={landType}
                    onChange={handleLandTypeChange}
                    required
                    options={LAND_TYPES.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                )}

                <TextInput
                  label="Display City"
                  name="displaycity"
                  value={
                    property.displaycity
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Kolkata"
                />

                <TextInput
                  label="Location"
                  name="location"
                  value={
                    property.location
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="New Town, Kolkata"
                  icon={FiMapPin}
                />

                <SelectInput
                  label="Project Status"
                  name="projectStatus"
                  value={
                    property.projectStatus
                  }
                  onChange={
                    handleChange
                  }
                  options={[
                    {
                      value:
                        "New",
                      label:
                        "New",
                    },
                    {
                      value:
                        "Under Construction",
                      label:
                        "Under Construction",
                    },
                    {
                      value:
                        "Ready to Move",
                      label:
                        "Ready to Move",
                    },
                    {
                      value:
                        "Completed",
                      label:
                        "Completed",
                    },
                  ]}
                />

                <TextInput
                  label="Possession Month / Year"
                  name="possessionMonthYear"
                  value={
                    property.possessionMonthYear
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="December 2026"
                  icon={
                    FiCalendar
                  }
                />

                <TextInput
                  label="Property Age"
                  name="propertyAge"
                  value={
                    property.propertyAge
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="2 years"
                />

                <TextInput
                  label="Ownership"
                  name="ownership"
                  value={
                    property.ownership
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Freehold"
                />

                <TextInput
                  label="Agreement Number"
                  name="agreementNumber"
                  value={
                    property.agreementNumber
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Agreement number"
                />

                <TextInput
                  label="Property Status"
                  name="PropertyStatus"
                  value={
                    property.PropertyStatus
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Available"
                />

              </div>


              <div className="toggle-grid">

                <Toggle
                  label="Featured Property"
                  name="isFeatured"
                  checked={
                    property.isFeatured
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Negotiable Price"
                  name="negotiable"
                  checked={
                    property.negotiable
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Active Property"
                  name="isActive"
                  checked={
                    property.isActive
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </Section>

          </div>
        )}


        {/* =================================================
            LISTING
        ================================================= */}

        {activeTab === "listing" && (
          <div className="tab-content">

            <Section
              icon={FiDollarSign}
              title="Pricing & Area"
              description="Configure property pricing and area information."
            >

              <div className="property-grid">

                <TextInput
                  label="Price"
                  name="price"
                  type="number"
                  value={
                    property.price
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="7500000"
                />

                <TextInput
                  label="Price By Unit"
                  name="priceByUnit"
                  value={
                    property.priceByUnit
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Per Sq.Ft"
                />

                <TextInput
                  label="Built-up Area"
                  name="buildupArea"
                  type="number"
                  value={
                    property.buildupArea
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="1500"
                />

                <TextInput
                  label="Carpet Area"
                  name="carpetArea"
                  type="number"
                  value={
                    property.carpetArea
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="1200"
                />

                <TextInput
                  label="Plot Area"
                  name="plotArea"
                  type="number"
                  value={
                    property.plotArea
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="2000"
                />

                <TextInput
                  label="Plot Size"
                  name="plotSize"
                  value={
                    property.plotSize
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="40 x 50"
                />

                <TextInput
                  label="Main Feature"
                  name="mainFeature"
                  value={
                    property.mainFeature
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Premium 3 BHK"
                />

                <TextInput
                  label="Zone ID"
                  name="zoneId"
                  value={
                    property.zoneId
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Zone ID"
                />

                <TextInput
                  label="Zone Area"
                  name="zoneArea"
                  value={
                    property.zoneArea
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Residential"
                />

              </div>


              <div className="toggle-grid">

                <Toggle
                  label="Box Price"
                  name="isBoxPrice"
                  checked={
                    property.isBoxPrice
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Box Price With Parking"
                  name="isBoxPriceWithParking"
                  checked={
                    property.isBoxPriceWithParking
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Non Calculated Area"
                  name="isNonCalcArea"
                  checked={
                    property.isNonCalcArea
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </Section>


            <Section
              icon={FiSettings}
              title="Parking & Building"
              description="Parking and building configuration."
            >

              <div className="toggle-grid">

                <Toggle
                  label="Parking Available"
                  name="isParkingExists"
                  checked={
                    property.isParkingExists
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>


              <div className="property-grid">

                <TextInput
                  label="Open Parking"
                  name="openParking"
                  value={
                    property.openParking
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="2"
                />

                <TextInput
                  label="Open Parking Price"
                  name="openParkingPrice"
                  type="number"
                  value={
                    property.openParkingPrice
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="150000"
                />

                <TextInput
                  label="Covered Parking"
                  name="covererParking"
                  value={
                    property.covererParking
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="1"
                />

                <TextInput
                  label="Covered Parking Price"
                  name="coveredParkingPrice"
                  type="number"
                  value={
                    property.coveredParkingPrice
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="250000"
                />

                <TextInput
                  label="Mechanical Parking"
                  name="mechanicalParking"
                  value={
                    property.mechanicalParking
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="1"
                />

                <TextInput
                  label="Mechanical Parking Price"
                  name="mechanicalParkingPrice"
                  type="number"
                  value={
                    property.mechanicalParkingPrice
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="300000"
                />

                <TextInput
                  label="Total Floors"
                  name="totalFloorsOfBuilding"
                  type="number"
                  value={
                    property.totalFloorsOfBuilding
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="15"
                />

              </div>

            </Section>

          </div>
        )}


        {/* =================================================
            MEDIA & DOCUMENTS
        ================================================= */}

        {activeTab === "media" && (
          <div className="tab-content">

            <Section
              icon={FiImage}
              title="Property Media"
              description="Upload all property images and documents."
            >

              <div className="property-file-grid">

                <FileUpload
                  label="Listing Image"
                  name="listingImage"
                  file={
                    property.listingImage
                  }
                  onChange={(file) =>
                    handleFileChange(
                      "listingImage",
                      file
                    )
                  }
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                />

                <FileUpload
                  label="Cover Photo"
                  name="coverPhoto"
                  file={
                    property.coverPhoto
                  }
                  onChange={(file) =>
                    handleFileChange(
                      "coverPhoto",
                      file
                    )
                  }
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                />

                <FileUpload
                  label="Site Plan Image"
                  name="sitePlanImage"
                  file={
                    property.sitePlanImage
                  }
                  onChange={(file) =>
                    handleFileChange(
                      "sitePlanImage",
                      file
                    )
                  }
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                />

                <FileUpload
                  label="Map Image"
                  name="map"
                  file={
                    property.map
                  }
                  onChange={(file) =>
                    handleFileChange(
                      "map",
                      file
                    )
                  }
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                />

                <FileUpload
                  label="Social Media Photo"
                  name="socialMediaPhoto"
                  file={
                    property.socialMediaPhoto
                  }
                  onChange={(file) =>
                    handleFileChange(
                      "socialMediaPhoto",
                      file
                    )
                  }
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                />

                <FileUpload
                  label="SEO Image"
                  name="seoImage"
                  file={
                    property.seoImage
                  }
                  onChange={(file) =>
                    handleFileChange(
                      "seoImage",
                      file
                    )
                  }
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                />

              </div>

            </Section>


            {/* =================================================
                GALLERY
            ================================================= */}

            <Section
              icon={FiImage}
              title="Gallery Images"
              description="Upload multiple property gallery images."
            >

              <div className="gallery-upload-area">

                <label className="secondary-btn">

                  <FiPlus />

                  Add Gallery Images

                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                    onChange={
                      handleGalleryImages
                    }
                    hidden
                  />

                </label>

              </div>


              {galleryImages.length > 0 && (
                <div className="gallery-preview-grid">

                  {galleryImages.map(
                    (
                      file,
                      index
                    ) => (
                      <div
                        className="gallery-preview-item"
                        key={`${file.name}-${index}`}
                      >

                        <img
                          src={URL.createObjectURL(
                            file
                          )}
                          alt={
                            file.name
                          }
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeGalleryImage(
                              index
                            )
                          }
                        >
                          <FiTrash2 />
                        </button>

                        <span>
                          {file.name}
                        </span>

                      </div>
                    )
                  )}

                </div>
              )}

            </Section>


            {/* =================================================
                DOCUMENTS
            ================================================= */}

            <Section
              icon={FiLayers}
              title="Property Documents"
              description="Upload brochures, payment schedule and cost sheet."
            >

              <div className="property-file-grid">

                <FileUpload
                  label="E-Brochure"
                  name="eBrochure"
                  file={
                    property.eBrochure
                  }
                  onChange={(file) =>
                    handleFileChange(
                      "eBrochure",
                      file
                    )
                  }
                  accept="application/pdf"
                />

                <FileUpload
                  label="Payment Schedule Image"
                  name="paymentScheduleImage"
                  file={
                    property.paymentScheduleImage
                  }
                  onChange={(file) =>
                    handleFileChange(
                      "paymentScheduleImage",
                      file
                    )
                  }
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                />

                <FileUpload
                  label="Cost Sheet Image"
                  name="costSheetImage"
                  file={
                    property.costSheetImage
                  }
                  onChange={(file) =>
                    handleFileChange(
                      "costSheetImage",
                      file
                    )
                  }
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                />

              </div>

            </Section>


            {/* =================================================
                TEXT CONTENT
            ================================================= */}

            <Section
              icon={FiInfo}
              title="Main Page Content"
              description="Content used on the property details page."
            >

              <div className="property-grid">

                <TextInput
                  label="Caption"
                  name="caption"
                  value={
                    property.caption
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Luxury living in Kolkata"
                />

                <TextInput
                  label="Total Towers"
                  name="totalNumberOfTowers"
                  type="number"
                  value={
                    property.totalNumberOfTowers
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="4"
                />

                <TextInput
                  label="Total Open Space"
                  name="totalOpenSpace"
                  value={
                    property.totalOpenSpace
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="70%"
                />

                <TextInput
                  label="Total Project Size"
                  name="totalProjectSize"
                  value={
                    property.totalProjectSize
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="10 Acres"
                />

                <TextInput
                  label="Property Website"
                  name="propertyWebsite"
                  value={
                    property.propertyWebsite
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://..."
                />

                <TextInput
                  label="Video"
                  name="video"
                  value={
                    property.video
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="YouTube / video URL"
                />

              </div>


              <TextArea
                label="Overview"
                name="overview"
                value={
                  property.overview
                }
                onChange={
                  handleChange
                }
                placeholder="Property overview..."
              />

              <TextArea
                label="Description"
                name="description"
                value={
                  property.description
                }
                onChange={
                  handleChange
                }
                placeholder="Detailed property description..."
              />

              <TextArea
                label="USP"
                name="usp"
                value={property.usp}
                onChange={
                  handleChange
                }
                placeholder="Unique selling points..."
              />

              <TextArea
                label="Site Plan Description"
                name="sitePlanDescription"
                value={
                  property.sitePlanDescription
                }
                onChange={
                  handleChange
                }
                placeholder="Site plan description..."
              />

              <div className="property-grid">

                <TextInput
                  label="Boundary Wall"
                  name="boundaryWall"
                  value={
                    property.boundaryWall
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Yes"
                />

                <TextInput
                  label="Washroom"
                  name="washroom"
                  value={
                    property.washroom
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="2"
                />

                <TextInput
                  label="Site Plan Total Floors"
                  name="sitePlanTotalFloors"
                  type="number"
                  value={
                    property.sitePlanTotalFloors
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="15"
                />

                <TextInput
                  label="Total Land Area"
                  name="sitePlanTotalLandArea"
                  value={
                    property.sitePlanTotalLandArea
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="5 Acres"
                />

              </div>

            </Section>

          </div>
        )}


        {/* =================================================
    NEARBY + AMENITIES
================================================= */}

        {activeTab === "nearby" && (
          <div className="tab-content">

            <Section
              icon={FiMapPin}
              title="Nearby & Amenities"
              description="Select amenities and enter distances for nearby locations."
            >

              {/* =================================================
          PROPERTY CATEGORY CHECK
      ================================================= */}

              {!propertyCategory ? (

                <div className="related-empty">

                  <div className="related-empty-icon">
                    <FiHome />
                  </div>

                  <div>
                    <h3>
                      Select Property Category First
                    </h3>

                    <p>
                      Go to Basic Details and select
                      Flat Apartment, Independent House
                      Villa, Commercial or Land.
                    </p>
                  </div>

                </div>

              ) : loadingRelated ? (

                <div className="related-loading">

                  <span className="related-spinner" />

                  <p>
                    Loading nearby and amenities...
                  </p>

                </div>

              ) : (

                {propertyCategory === "Commercial" &&
                  (subPropertyType === "Retail Space/Shop" || subPropertyType === "Warehouse") && (
                    <div className="related-wrapper" style={{ marginBottom: 24 }}>
                      {subPropertyType === "Retail Space/Shop" && (
                        <div className="related-section">
                          <div className="related-heading">
                            <div className="related-heading-left">
                              <div className="related-heading-icon"><FiHome /></div>
                              <div>
                                <h3>Suitable Business</h3>
                                <p>Select one or more suitable businesses for this retail space/shop.</p>
                              </div>
                            </div>
                            <div className="related-count">
                              <FiCheck />
                              <span>{selectedSuitableBusinesses.length} selected</span>
                            </div>
                          </div>

                          {loadingCommercialOptions ? (
                            <div className="related-loading"><span className="related-spinner" /><p>Loading suitable businesses...</p></div>
                          ) : suitableBusinesses.length === 0 ? (
                            <div className="related-empty small"><div className="related-empty-icon small"><FiInfo /></div><div><strong>No active suitable businesses found</strong><span>Add suitable businesses from Suitable Business Management.</span></div></div>
                          ) : (
                            <div className="amenities-checkbox-grid">
                              {suitableBusinesses.map((item) => {
                                const id = getOptionValue(item);
                                const selected = selectedSuitableBusinesses.includes(id);
                                return (
                                  <label key={id} className={`amenity-checkbox-card ${selected ? "selected" : ""}`}>
                                    <input type="checkbox" checked={selected} onChange={() => toggleSuitableBusiness(id)} />
                                    <span className="amenity-check-box">{selected && <FiCheck />}</span>
                                    {item.Image || item.image ? <div className="property-amenity-image"><img src={getImageUrl(item.Image || item.image)} alt={getOptionLabel(item)} /></div> : <div className="amenity-card-icon"><FiHome /></div>}
                                    <div className="amenity-card-content"><strong>{getOptionLabel(item)}</strong></div>
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {subPropertyType === "Warehouse" && (
                        <div className="related-section">
                          <div className="related-heading">
                            <div className="related-heading-left">
                              <div className="related-heading-icon nearby"><FiNavigation /></div>
                              <div>
                                <h3>Loading / Unloading Facility</h3>
                                <p>Select all available loading and unloading facilities.</p>
                              </div>
                            </div>
                            <div className="related-count nearby-count"><FiCheck /><span>{selectedLoadingUnloadingFacilities.length} selected</span></div>
                          </div>

                          {loadingCommercialOptions ? (
                            <div className="related-loading"><span className="related-spinner" /><p>Loading facilities...</p></div>
                          ) : loadingUnloadingFacilities.length === 0 ? (
                            <div className="related-empty small"><div className="related-empty-icon small"><FiInfo /></div><div><strong>No active loading/unloading facilities found</strong><span>Add facilities from Loading / Unloading Facility Management.</span></div></div>
                          ) : (
                            <div className="amenities-checkbox-grid">
                              {loadingUnloadingFacilities.map((item) => {
                                const id = getOptionValue(item);
                                const selected = selectedLoadingUnloadingFacilities.includes(id);
                                return (
                                  <label key={id} className={`amenity-checkbox-card ${selected ? "selected" : ""}`}>
                                    <input type="checkbox" checked={selected} onChange={() => toggleLoadingUnloading(id)} />
                                    <span className="amenity-check-box">{selected && <FiCheck />}</span>
                                    {item.Image || item.image ? <div className="property-amenity-image"><img src={getImageUrl(item.Image || item.image)} alt={getOptionLabel(item)} /></div> : <div className="amenity-card-icon"><FiNavigation /></div>}
                                    <div className="amenity-card-content"><strong>{getOptionLabel(item)}</strong></div>
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                <div className="related-wrapper">

                  {/* =================================================
              AMENITIES
          ================================================= */}

                  <div className="related-section">

                    <div className="related-heading">

                      <div className="related-heading-left">

                        <div className="related-heading-icon">
                          <FiCheckCircle />
                        </div>

                        <div>
                          <h3>
                            Amenities
                          </h3>

                          <p>
                            Select all amenities available
                            for this property.
                          </p>
                        </div>

                      </div>

                      <div className="related-count">
                        <FiCheck />

                        <span>
                          {selectedAmenities.length}
                          {" "}
                          selected
                        </span>
                      </div>

                    </div>


                    {/* =================================================
                AMENITIES EMPTY
            ================================================= */}

                    {amenities.length === 0 ? (

                      <div className="related-empty small">

                        <div className="related-empty-icon small">
                          <FiInfo />
                        </div>

                        <div>
                          <strong>
                            No active amenities found
                          </strong>

                          <span>
                            No active amenities are available
                            for this property category.
                          </span>
                        </div>

                      </div>

                    ) : (

                      <div className="amenities-checkbox-grid">

                        {amenities.map((amenity) => {

                          const isSelected =
                            selectedAmenities.includes(
                              amenity._id
                            );

                          return (

                            <label
                              key={amenity._id}
                              className={`amenity-checkbox-card ${isSelected
                                  ? "selected"
                                  : ""
                                }`}
                            >

                              {/* Hidden checkbox */}
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() =>
                                  handleAmenityToggle(
                                    amenity._id
                                  )
                                }
                              />

                              {/* =================================================
                          TOP CHECK
                      ================================================= */}

                              <span className="amenity-check-box">
                                {isSelected && (
                                  <FiCheck />
                                )}
                              </span>


                              {/* =================================================
                          IMAGE / ICON
                      ================================================= */}

                              {amenity.image ? (

                                <div className="property-amenity-image">

                                  <img
                                    src={getImageUrl(
                                      amenity.image
                                    )}
                                    alt={
                                      amenity.name ||
                                      "Amenity"
                                    }
                                    onError={(e) => {
                                      e.currentTarget.style.display =
                                        "none";

                                      const fallback =
                                        e.currentTarget
                                          .nextElementSibling;

                                      if (fallback) {
                                        fallback.style.display =
                                          "flex";
                                      }
                                    }}
                                  />

                                  <div className="amenity-image-fallback">
                                    <FiImage />
                                  </div>

                                </div>

                              ) : (

                                <div className="amenity-card-icon">
                                  <FiCheckCircle />
                                </div>

                              )}


                              {/* =================================================
                          NAME
                      ================================================= */}

                              <div className="amenity-card-content">

                                <strong>
                                  {amenity.name}
                                </strong>

                                {amenity.catagory && (
                                  <small>
                                    {amenity.catagory}
                                  </small>
                                )}

                              </div>

                            </label>
                          );
                        })}

                      </div>

                    )}

                  </div>


                  {/* =================================================
              NEARBY LOCATIONS
          ================================================= */}

                  <div className="related-section">

                    <div className="related-heading">

                      <div className="related-heading-left">

                        <div className="related-heading-icon nearby">
                          <FiNavigation />
                        </div>

                        <div>
                          <h3>
                            Nearby Locations
                          </h3>

                          <p>
                            Enter the distance from this
                            property for each nearby location.
                          </p>
                        </div>

                      </div>

                      <div className="related-count nearby-count">

                        <FiMapPin />

                        <span>
                          {
                            Object.keys(
                              nearbyDistances
                            ).filter(
                              (id) =>
                                nearbyDistances[id]
                            ).length
                          }
                          {" "}
                          added
                        </span>

                      </div>

                    </div>


                    {/* =================================================
                NEARBY EMPTY
            ================================================= */}

                    {nearbyList.length === 0 ? (

                      <div className="related-empty small">

                        <div className="related-empty-icon small">
                          <FiNavigation />
                        </div>

                        <div>
                          <strong>
                            No active nearby locations
                          </strong>

                          <span>
                            No active nearby locations were
                            found for this property category.
                          </span>
                        </div>

                      </div>

                    ) : (

                      <div className="nearby-input-list">

                        {nearbyList.map((nearby) => (

                          <div
                            className="nearby-distance-row"
                            key={nearby._id}
                          >

                            {/* =================================================
                        LEFT INFORMATION
                    ================================================= */}

                            <div className="nearby-distance-info">

                              {nearby.image ? (

                                <div className="nearby-image-wrapper">

                                  <img
                                    src={getImageUrl(
                                      nearby.image
                                    )}
                                    alt={
                                      nearby.name ||
                                      "Nearby location"
                                    }
                                    onError={(e) => {
                                      e.currentTarget.style.display =
                                        "none";

                                      const fallback =
                                        e.currentTarget
                                          .nextElementSibling;

                                      if (fallback) {
                                        fallback.style.display =
                                          "flex";
                                      }
                                    }}
                                  />

                                  <div className="nearby-image-fallback">
                                    <FiMapPin />
                                  </div>

                                </div>

                              ) : (

                                <div className="nearby-distance-icon">
                                  <FiMapPin />
                                </div>

                              )}


                              <div className="nearby-location-details">

                                <strong>
                                  {nearby.name}
                                </strong>

                                {nearby.catagory && (
                                  <small>
                                    {nearby.catagory}
                                  </small>
                                )}

                                {nearby.faIconClass && (
                                  <em>
                                    {nearby.faIconClass}
                                  </em>
                                )}

                              </div>

                            </div>


                            {/* =================================================
                        DISTANCE
                    ================================================= */}

                            <div className="nearby-distance-control">

                              <span className="distance-label">
                                Distance
                              </span>

                              <div className="distance-input-wrapper">

                                <input
                                  type="text"
                                  value={
                                    nearbyDistances[
                                    nearby._id
                                    ] || ""
                                  }
                                  onChange={(e) =>
                                    handleNearbyDistance(
                                      nearby._id,
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g. 5 KM"
                                />

                                <span className="distance-unit">
                                  KM
                                </span>

                              </div>

                            </div>

                          </div>

                        ))}

                      </div>

                    )}

                  </div>

                </div>

              )}

            </Section>

          </div>
        )}


        {/* =================================================
            DEVELOPER
        ================================================= */}

        {activeTab === "developer" && (
          <div className="tab-content">

            <Section
              icon={FiUser}
              title="Developer Information"
              description="Developer and builder details."
            >

              <div className="property-grid">

                <TextInput
                  label="Developer Name"
                  name="developersName"
                  value={
                    property.developersName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="ABC Developers"
                />

                <TextInput
                  label="Developer Phone"
                  name="developersPhoneNumber"
                  value={
                    property.developersPhoneNumber
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+91 9876543210"
                  icon={FiPhone}
                />

                <TextInput
                  label="Developer Email"
                  name="developersEmailId"
                  value={
                    property.developersEmailId
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="developer@example.com"
                  icon={FiMail}
                />

                <TextInput
                  label="Developer Website"
                  name="developersWebsite"
                  value={
                    property.developersWebsite
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://..."
                  icon={FiGlobe}
                />

              </div>

              <TextArea
                label="Developer Address"
                name="developersAddress"
                value={
                  property.developersAddress
                }
                onChange={
                  handleChange
                }
                placeholder="Developer office address..."
              />

            </Section>


            <Section
              icon={FiPhone}
              title="Contact Person"
              description="Property contact person information."
            >

              <div className="property-grid">

                <TextInput
                  label="Contact Person Name"
                  name="contactPersonName"
                  value={
                    property.contactPersonName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="John Doe"
                />

                <TextInput
                  label="Designation"
                  name="contactPersonDesignation"
                  value={
                    property.contactPersonDesignation
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Sales Manager"
                />

                <TextInput
                  label="Phone"
                  name="contactPersonPhone"
                  value={
                    property.contactPersonPhone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+91..."
                />

                <TextInput
                  label="Alternate Phone"
                  name="contactPersonAlternatePhone"
                  value={
                    property.contactPersonAlternatePhone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+91..."
                />

                <TextInput
                  label="Email"
                  name="contactPersonsEmail"
                  value={
                    property.contactPersonsEmail
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="contact@example.com"
                />

              </div>


              <div className="toggle-grid">

                <Toggle
                  label="Show Contact Phone"
                  name="isContactPersonPhone"
                  checked={
                    property.isContactPersonPhone
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Show Contact Email"
                  name="isContactPersonEmail"
                  checked={
                    property.isContactPersonEmail
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Developer Phone Communication"
                  name="isDeveloperCommunicationPhone"
                  checked={
                    property.isDeveloperCommunicationPhone
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Developer Email Communication"
                  name="isDeveloperCommunicationEmail"
                  checked={
                    property.isDeveloperCommunicationEmail
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Person Phone Communication"
                  name="isPersonCommunicationPhone"
                  checked={
                    property.isPersonCommunicationPhone
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Person Email Communication"
                  name="isPersonCommunicationEmail"
                  checked={
                    property.isPersonCommunicationEmail
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </Section>


            <Section
              icon={FiDollarSign}
              title="Rate Negotiation Contact"
              description="Contact information for price negotiations."
            >

              <div className="property-grid">

                <TextInput
                  label="Name"
                  name="rateNegotiationPersonName"
                  value={
                    property.rateNegotiationPersonName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Sales Executive"
                />

                <TextInput
                  label="Phone"
                  name="rateNegotiationPersonPhone"
                  value={
                    property.rateNegotiationPersonPhone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+91..."
                />

                <TextInput
                  label="Alternate Phone"
                  name="rateNegotiationPersonAltPhone"
                  value={
                    property.rateNegotiationPersonAltPhone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+91..."
                />

                <TextInput
                  label="Email"
                  name="rateNegotiationPersonsEmail"
                  value={
                    property.rateNegotiationPersonsEmail
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="sales@example.com"
                />

              </div>


              <div className="toggle-grid">

                <Toggle
                  label="Phone Communication"
                  name="isRateCommunicationPhone"
                  checked={
                    property.isRateCommunicationPhone
                  }
                  onChange={
                    handleChange
                  }
                />

                <Toggle
                  label="Email Communication"
                  name="isRateCommunicationEmail"
                  checked={
                    property.isRateCommunicationEmail
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </Section>


            <Section
              icon={FiDollarSign}
              title="Charges"
              description="Property charges and maintenance."
            >

              <div className="property-grid">

                <TextInput
                  label="PL Charges"
                  name="plCharges"
                  value={
                    property.plCharges
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="50000"
                />

                <TextInput
                  label="FE Charges"
                  name="feCharges"
                  value={
                    property.feCharges
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="50000"
                />

                <TextInput
                  label="Other Charges"
                  name="otherCharges"
                  value={
                    property.otherCharges
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="25000"
                />

                <TextInput
                  label="Maintenance Charges"
                  name="maintenanceCharges"
                  value={
                    property.maintenanceCharges
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="5000/month"
                />

              </div>

            </Section>

          </div>
        )}


        {/* =================================================
            LOCATION
        ================================================= */}

        {activeTab === "location" && (
          <div className="tab-content">

            <Section
              icon={FiMapPin}
              title="Property Address"
              description="Complete property location details."
            >

              <div className="property-grid">

                <SelectInput
                  label="State"
                  name="state"
                  value={property.state}
                  onChange={(e) => {
                    setProperty((prev) => ({ ...prev, state: e.target.value, city: "" }));
                  }}
                  options={states.map((item) => ({
                    value: item.StateName || item.name || item.Name || item._id,
                    label: item.StateName || item.name || item.Name,
                  }))}
                  required
                />

                <SelectInput
                  label="City"
                  name="city"
                  value={property.city}
                  onChange={handleChange}
                  options={cities.map((item) => ({
                    value: item.CityName || item.name || item.Name || item._id,
                    label: item.CityName || item.name || item.Name,
                  }))}
                  required
                />

                <TextInput
                  label="Locality"
                  name="locality"
                  value={
                    property.locality
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="New Town"
                />

                <TextInput
                  label="Street"
                  name="street"
                  value={
                    property.street
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Street name"
                />

                <TextInput
                  label="Pincode"
                  name="pincode"
                  value={
                    property.pincode
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="700156"
                />

                <TextInput
                  label="Map Location"
                  name="maplocation"
                  value={
                    property.maplocation
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Google Maps location"
                  icon={FiMap}
                />

              </div>


              <TextArea
                label="Full Address"
                name="fullAddress"
                value={
                  property.fullAddress
                }
                onChange={
                  handleChange
                }
                placeholder="Complete property address..."
              />

              <TextArea
                label="Address"
                name="address"
                value={
                  property.address
                }
                onChange={
                  handleChange
                }
                placeholder="Property address..."
              />


              <div className="property-grid">

                <TextInput
                  label="Latitude"
                  name="latitude"
                  value={
                    property.latitude
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="22.5726"
                />

                <TextInput
                  label="Longitude"
                  name="longitude"
                  value={
                    property.longitude
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="88.3639"
                />

                <TextInput
                  label="Display Location"
                  name="displayLocation"
                  value={
                    property.displayLocation
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="New Town, Kolkata"
                />

              </div>

            </Section>


            <div className="map-placeholder">

              <FiMap />

              <h4>
                Map Preview
              </h4>

              <p>
                Enter latitude and
                longitude to display
                the property location.
              </p>

              {property.latitude &&
                property.longitude && (
                  <div className="coordinates">
                    {
                      property.latitude
                    }
                    ,{" "}
                    {
                      property.longitude
                    }
                  </div>
                )}

            </div>

          </div>
        )}


        {/* =================================================
            SEO
        ================================================= */}

        {activeTab === "seo" && (
          <div className="tab-content">

            <Section
              icon={FiSearch}
              title="Search Engine Optimization"
              description="Configure how this property appears in search engines."
            >

              <div className="property-grid">

                <TextInput
                  label="SEO Title"
                  name="title"
                  value={
                    property.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Luxury 3 BHK Apartment in Kolkata"
                />

                <TextInput
                  label="URL Mapping"
                  name="urlMapping"
                  value={
                    property.urlMapping
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="luxury-3-bhk-kolkata"
                />

                <TextInput
                  label="Keywords"
                  name="keywords"
                  value={
                    property.keywords
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="3 BHK, Kolkata, apartment"
                />

                <TextInput
                  label="Google Tag Manager"
                  name="googleTagManager"
                  value={
                    property.googleTagManager
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="GTM-XXXXXXX"
                />

              </div>


              <TextInput
                label="SEO Image Alt Text"
                name="seoImageAltText"
                value={
                  property.seoImageAltText
                }
                onChange={
                  handleChange
                }
                placeholder="Property SEO image"
              />

              <TextInput
                label="SEO Image Title"
                name="seoImageTitle"
                value={
                  property.seoImageTitle
                }
                onChange={
                  handleChange
                }
                placeholder="Property SEO image"
              />


              <TextArea
                label="SEO Description"
                name="seodescription"
                value={
                  property.seodescription
                }
                onChange={
                  handleChange
                }
                placeholder="Enter a concise search engine description..."
                rows={5}
              />


              <div className="seo-preview">

                <span>
                  Google Preview
                </span>

                <h4>
                  {property.title ||
                    "Your Property SEO Title"}
                </h4>

                <div className="seo-url">
                  example.com/
                  {
                    property.urlMapping ||
                    "property-url"
                  }
                </div>

                <p>
                  {
                    property.seodescription ||
                    "Your SEO description will appear here."
                  }
                </p>

              </div>

            </Section>

          </div>
        )}


        {/* =================================================
            FLOOR PLANS
        ================================================= */}

        {activeTab === "floorplans" && (
          <div className="tab-content">

            {!savedPropertyId ? (
              <div className="floorplan-locked">

                <div className="locked-icon">
                  <FiLayers />
                </div>

                <h3>
                  Save the property first
                </h3>

                <p>
                  Save the main property
                  before creating floor
                  plans.
                </p>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={
                    createProperty
                  }
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Save Property First
                    </>
                  )}
                </button>

              </div>
            ) : (
              <>

                {/* =================================================
                    BHK SELECTOR
                ================================================= */}

                <Section
                  icon={FiHome}
                  title="Select BHK Configuration"
                  description="Select a BHK first. You can then create unlimited floor plans for that BHK."
                >

                  <div className="bhk-selector">

                    {BHK_OPTIONS.map(
                      (bhk) => {
                        const count =
                          floorPlans.filter(
                            (plan) =>
                              plan.BHK ===
                              bhk
                          ).length;

                        return (
                          <button
                            type="button"
                            key={bhk}
                            className={
                              selectedBHK ===
                                bhk
                                ? "selected"
                                : ""
                            }
                            onClick={() =>
                              setSelectedBHK(
                                bhk
                              )
                            }
                          >

                            <strong>
                              {bhk}
                            </strong>

                            <span>
                              {count} floor
                              plan
                              {count !==
                                1
                                ? "s"
                                : ""}
                            </span>

                          </button>
                        );
                      }
                    )}

                  </div>

                </Section>


                {/* =================================================
                    ADD FLOOR PLAN
                ================================================= */}

                <div className="floorplan-toolbar">

                  <div>

                    <div className="toolbar-title">

                      <FiLayers />

                      <h2>
                        {selectedBHK
                          ? `${selectedBHK} Floor Plans`
                          : "Floor Plans"}
                      </h2>

                    </div>

                    <p>
                      {selectedBHK
                        ? `Create as many ${selectedBHK} floor plans as required.`
                        : "Select a BHK above to start creating floor plans."}
                    </p>

                  </div>


                  <button
                    type="button"
                    className="primary-btn"
                    onClick={
                      addFloorPlan
                    }
                    disabled={
                      !selectedBHK
                    }
                  >
                    <FiPlus />
                    Add Floor Plan
                  </button>

                </div>


                {/* =================================================
                    FLOOR PLANS
                ================================================= */}

                {selectedBHK &&
                  floorPlans.filter(
                    (plan) =>
                      plan.BHK ===
                      selectedBHK
                  ).length === 0 && (
                    <div className="empty-floorplans">

                      <div className="empty-floor-icon">
                        <FiLayers />
                      </div>

                      <h3>
                        No {selectedBHK} floor
                        plans yet
                      </h3>

                      <p>
                        Click "Add Floor Plan"
                        to create your first
                        {selectedBHK} configuration.
                      </p>

                      <button
                        type="button"
                        className="primary-btn"
                        onClick={
                          addFloorPlan
                        }
                      >
                        <FiPlus />
                        Add {selectedBHK} Floor
                        Plan
                      </button>

                    </div>
                  )}


                <div className="floorplans-list">

                  {floorPlans
                    .map(
                      (
                        floorPlan,
                        actualIndex
                      ) => ({
                        floorPlan,
                        actualIndex,
                      })
                    )
                    .filter(
                      ({
                        floorPlan,
                      }) =>
                        floorPlan.BHK ===
                        selectedBHK
                    )
                    .map(
                      ({
                        floorPlan,
                        actualIndex,
                      }) => (
                        <div
                          className="floor-plan-card"
                          key={
                            actualIndex
                          }
                        >

                          {/* HEADER */}

                          <div className="floor-plan-header">

                            <div className="floor-plan-title">

                              <div className="floor-plan-number">
                                {
                                  floorPlans
                                    .filter(
                                      (
                                        p
                                      ) =>
                                        p.BHK ===
                                        selectedBHK
                                    )
                                    .findIndex(
                                      (
                                        p
                                      ) =>
                                        p ===
                                        floorPlan
                                    ) +
                                  1
                                }
                              </div>

                              <div>

                                <h4>
                                  {
                                    floorPlan.BHK
                                  }
                                </h4>

                                <span>
                                  {floorPlan.AreaInSqFt
                                    ? `${floorPlan.AreaInSqFt} Sq.Ft`
                                    : "Floor plan details"}
                                </span>

                              </div>

                            </div>


                            <button
                              type="button"
                              className="icon-danger-btn"
                              onClick={() =>
                                removeFloorPlan(
                                  actualIndex
                                )
                              }
                            >
                              <FiTrash2 />
                            </button>

                          </div>


                          {/* BODY */}

                          <div className="floor-plan-body">

                            <div className="floor-plan-subtitle">

                              <FiHome />

                              <span>
                                Configuration
                              </span>

                            </div>


                            <div className="property-grid">

                              <TextInput
                                label="Area (Sq.Ft)"
                                type="number"
                                value={
                                  floorPlan.AreaInSqFt
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "AreaInSqFt",
                                    e.target.value
                                  )
                                }
                                placeholder="1200"
                              />

                              <TextInput
                                label="Built-up Area"
                                type="number"
                                value={
                                  floorPlan.BuiltUpArea
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "BuiltUpArea",
                                    e.target.value
                                  )
                                }
                                placeholder="1150"
                              />

                              <TextInput
                                label="Carpet Area"
                                type="number"
                                value={
                                  floorPlan.CarpetArea
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "CarpetArea",
                                    e.target.value
                                  )
                                }
                                placeholder="950"
                              />

                              <TextInput
                                label="Actual Sq.Ft"
                                type="number"
                                value={
                                  floorPlan.ActualSqFt
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "ActualSqFt",
                                    e.target.value
                                  )
                                }
                                placeholder="Actual area"
                              />

                              <TextInput
                                label="Price / Sq.Ft"
                                type="number"
                                value={
                                  floorPlan.PricePerSqft
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "PricePerSqft",
                                    e.target.value
                                  )
                                }
                                placeholder="6500"
                              />

                              <TextInput
                                label="Total Price"
                                type="number"
                                value={
                                  floorPlan.TotalPricePerBHK
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "TotalPricePerBHK",
                                    e.target.value
                                  )
                                }
                                placeholder="7800000"
                              />

                              <TextInput
                                label="Block"
                                value={
                                  floorPlan.Block
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "Block",
                                    e.target.value
                                  )
                                }
                                placeholder="Block A"
                              />

                              <TextInput
                                label="Direction"
                                value={
                                  floorPlan.Direction
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "Direction",
                                    e.target.value
                                  )
                                }
                                placeholder="East"
                              />

                              <TextInput
                                label="Toilet"
                                type="number"
                                value={
                                  floorPlan.Toilet
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "Toilet",
                                    e.target.value
                                  )
                                }
                                placeholder="2"
                              />

                              <TextInput
                                label="Balcony"
                                type="number"
                                value={
                                  floorPlan.NoofBalcony
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "NoofBalcony",
                                    e.target.value
                                  )
                                }
                                placeholder="2"
                              />

                              <TextInput
                                label="BHK Room ID"
                                value={
                                  floorPlan.BhRmId
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateFloorPlan(
                                    actualIndex,
                                    "BhRmId",
                                    e.target.value
                                  )
                                }
                                placeholder="Optional ID"
                              />

                            </div>


                            <TextArea
                              label="Floor Plan Description"
                              value={
                                floorPlan.Description
                              }
                              onChange={(
                                e
                              ) =>
                                updateFloorPlan(
                                  actualIndex,
                                  "Description",
                                  e.target.value
                                )
                              }
                              placeholder="Describe this floor plan..."
                              rows={4}
                            />


                            {/* =================================================
                                FLOOR PLAN IMAGES
                            ================================================= */}

                            <div className="floor-plan-images">

                              <div className="images-heading">

                                <div>

                                  <h5>
                                    <FiImage />
                                    Floor Plan Images
                                  </h5>

                                  <p>
                                    Upload one or more
                                    floor plan drawings.
                                  </p>

                                </div>


                                <label className="secondary-btn">

                                  <FiPlus />

                                  Add Image

                                  <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                                    hidden
                                    onChange={(
                                      e
                                    ) => {
                                      addFloorPlanImage(
                                        actualIndex,
                                        e
                                          .target
                                          .files?.[0]
                                      );

                                      e.target.value =
                                        "";
                                    }}
                                  />

                                </label>

                              </div>


                              {floorPlan.Images
                                .length ===
                                0 ? (
                                <div className="empty-images">

                                  <FiImage />

                                  <span>
                                    No images added
                                  </span>

                                  <small>
                                    Upload floor plan
                                    drawings or
                                    layouts.
                                  </small>

                                </div>
                              ) : (
                                <div className="floor-image-list">

                                  {floorPlan.Images.map(
                                    (
                                      image,
                                      imageIndex
                                    ) => (
                                      <div
                                        className="floor-image-item"
                                        key={
                                          imageIndex
                                        }
                                      >

                                        <div className="floor-image-number">
                                          {
                                            imageIndex +
                                            1
                                          }
                                        </div>


                                        <div className="floor-image-preview">

                                          {image.GalleryImgInfoPath instanceof
                                            File ? (
                                            <img
                                              src={URL.createObjectURL(
                                                image.GalleryImgInfoPath
                                              )}
                                              alt={
                                                image.GalleryImgInfo
                                              }
                                            />
                                          ) : (
                                            <FiImage />
                                          )}

                                        </div>


                                        <div className="floor-image-info">

                                          <strong>
                                            {
                                              image.GalleryImgInfo
                                            }
                                          </strong>

                                          <small>
                                            Floor plan
                                            image
                                          </small>

                                        </div>


                                        <button
                                          type="button"
                                          className="remove-image-btn"
                                          onClick={() =>
                                            removeFloorPlanImage(
                                              actualIndex,
                                              imageIndex
                                            )
                                          }
                                        >
                                          <FiTrash2 />
                                        </button>

                                      </div>
                                    )
                                  )}

                                </div>
                              )}

                            </div>

                          </div>

                        </div>
                      )
                    )}

                </div>


                {/* SAVE FLOOR PLANS */}

                {floorPlans.length >
                  0 && (
                    <div className="floorplan-save-bar">

                      <div>

                        <strong>
                          {
                            floorPlans.length
                          }
                        </strong>{" "}
                        floor plan
                        {floorPlans.length >
                          1
                          ? "s"
                          : ""}{" "}
                        ready

                      </div>


                      <button
                        type="button"
                        className="primary-btn"
                        onClick={
                          saveFloorPlans
                        }
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <span className="spinner" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FiSave />
                            Save Floor Plans
                          </>
                        )}
                      </button>

                    </div>
                  )}

              </>
            )}

          </div>
        )}


        {/* =================================================
            BOTTOM NAVIGATION
        ================================================= */}

        <div className="property-bottom-nav">

          <button
            type="button"
            className="secondary-btn"
            disabled={
              activeTab ===
              tabs[0].id
            }
            onClick={() => {

              const index =
                tabs.findIndex(
                  (tab) =>
                    tab.id ===
                    activeTab
                );

              if (index > 0) {
                setActiveTab(
                  tabs[index - 1]
                    .id
                );

                window.scrollTo({
                  top: 0,
                  behavior:
                    "smooth",
                });
              }

            }}
          >
            <FiArrowLeft />
            Previous
          </button>


          <div className="step-indicator">

            {tabs.map(
              (tab) => (
                <span
                  key={tab.id}
                  className={
                    tab.id ===
                      activeTab
                      ? "active"
                      : ""
                  }
                  title={
                    tab.label
                  }
                />
              )
            )}

          </div>


          {activeTab !==
            "floorplans" ? (
            <button
              type="button"
              className="primary-btn"
              onClick={() => {

                const index =
                  tabs.findIndex(
                    (tab) =>
                      tab.id ===
                      activeTab
                  );

                if (
                  index <
                  tabs.length - 1
                ) {
                  setActiveTab(
                    tabs[
                      index + 1
                    ].id
                  );

                  window.scrollTo({
                    top: 0,
                    behavior:
                      "smooth",
                  });
                }

              }}
            >
              Next
              <FiArrowRight />
            </button>
          ) : (
            <button
              type="button"
              className="primary-btn"
              onClick={
                savedPropertyId
                  ? saveFloorPlans
                  : createProperty
              }
              disabled={saving}
            >
              <FiCheck />
              Finish
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default PropertyEntry;