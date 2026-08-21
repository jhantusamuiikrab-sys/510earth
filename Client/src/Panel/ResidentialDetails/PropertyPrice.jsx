import React from "react";
import "../../../src/assets/Font/css/style.css";
import "../../../src/assets/content/style.css";

const PropertyPrice = ({ property }) => {

  if (!property) {
    return null;
  }

  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (totalPrice) => {

    if (totalPrice === null || totalPrice === undefined) {
      return "";
    }

    const priceString = String(totalPrice);
    const strlen = priceString.length;

    // 6 digits = Lakhs
    // Example: 450000 -> 4 Lakhs
    if (strlen >= 6 && strlen <= 7) {

      if (strlen === 6) {
        return `${priceString.substring(0, 1)} Lakhs`;
      }

      if (strlen === 7) {
        return `${priceString.substring(0, 2)} Lakhs`;
      }

    }

    // More than 7 digits = Crores
    if (strlen > 7) {

      const value =
        Number(
          priceString.substring(0, strlen - 5)
        ) / 100;

      return `${value.toFixed(2).replace(/\.?0+$/, "")} Cr`;
    }

    return "";
  };


  // ==========================================
  // SORT BHK TYPES
  // Razor:
  // Model.floorpriceB.OrderBy(x => x.BHKType)
  // ==========================================

  const floorPrices = [...(property.floorpriceB || [])]
    .sort((a, b) =>
      String(a.BHKType || "").localeCompare(
        String(b.BHKType || "")
      )
    );


  return (
    <section className="price_area">

      <div className="container">

        <div className="row justify-content-center">


          {/* ==========================================
              BHK PRICE
          ========================================== */}

          {floorPrices.map((item, index) => {

            const price = formatPrice(
              item.TotalPricePerBHK
            );

            if (!price) {
              return null;
            }

            return (
              <div
                className="col-md-4 col-6 col-pad-right"
                key={item._id || index}
              >

                <a className="price_btn text-decoration-none">

                  {String(item.BHKType || "")
                    .replace(/\s/g, "")}

                  {" : "}

                  <span>
                    {price}
                  </span>

                  {" "}Onwards*

                </a>

              </div>
            );

          })}


          {/* ==========================================
              E-BROCHURE
          ========================================== */}

          {property.EBrocher &&
            property.EBrocher.trim() !== "" && (

              <div className="col-md-12">

                <a
                  href="#"
                  id="click-me"
                  className="download_btn"
                >
                  Download E-Brochure{" "}
                  <i className="fas fa-download"></i>
                </a>

              </div>

            )}


        </div>

      </div>

    </section>
  );
};

export default PropertyPrice;