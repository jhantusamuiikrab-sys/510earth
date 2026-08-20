import React, { useRef, useState, useEffect } from "react"; // Added useEffect import
// Import your layout stylesheet safely
import "../../assets/Font/NewHome/style.css";
import "../../assets/Content/style.css";
import "../../../src/style/LeadingSection.css";

const LeadingSection = () => {
  const [visibility, setVisibility] = useState({
    img: false,
    content: false,
  });
  
  const targetsRef = useRef({});
  const setTargetRef = (key) => (el) => {
    if (el) targetsRef.current[key] = el;
  };

  // 1. Unified Single IntersectionObserver Context
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const name = entry.target.getAttribute("data-anim-id");
          if (name) {
            setVisibility((prev) => ({
              ...prev,
              [name]: entry.isIntersecting,
            }));
          }
        });
      },
      { threshold: 0.2 } // Slightly lowered for faster mobile triggering
    );

    Object.values(targetsRef.current).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="leading_area py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* Main Header Heading */}
            <h1 className="fw-bold mb-4">
              India's Top Property Site |{" "}
              <span className="text-primary">Real Estate Agent</span> In India
            </h1>

            <div className="row g-4 align-items-center">
              {/* Left Side: Image Container (Coming from Left to Right) */}
              <div className="col-md-4 d-flex">
                <div 
                  ref={setTargetRef("img")}
                  data-anim-id="img"
                  className={`leading_left w-100 animation ${visibility.img ? "active" : ""}`}
                >
                  <img
                    src="/images/lead_img.webp"
                    alt="510Earth"
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
              </div>

              {/* Right Side: Text Paragraphs Container (Coming from Right to Left) */}
              <div className="col-md-8 d-flex">
                <div
                  ref={setTargetRef("content")}
                  data-anim-id="content"
                  className={`leading_right text-secondary second_animation ${visibility.content ? "active" : ""}`}
                  style={{ lineHeight: "1.7", fontSize: "15px" }}
                >
                  <p className="mb-3">
                    510earth is a leading and fast-growing real estate broker in
                    Salt Lake Sector V, Kolkata. Since our inception into the
                    industry, we have built and maintained an unbeatable
                    reputation for our transparency and unmatched
                    professionalism. Our experienced and skilled professionals
                    specialize in offering the best advice and on-time delivery.
                    We relentlessly strive to build a home that beckons a good
                    lifestyle and a better tomorrow. Besides the four walls of
                    your house, 510earth offers you to experience life beyond a
                    square foot.
                  </p>
                  <p className="mb-0">
                    We are a prominent, steadfast, trustworthy real estate
                    consultant in Kolkata. As a rapidly developing company in
                    Kolkata, we convert real estate into real assets. At
                    present, lively and diligent entrepreneurs having matchless
                    focus manages the group. We offer real estate solutions that
                    include furnished apartments and commercial office space
                    across Kolkata. As a prominent and trusted real estate
                    agent, we strive to set up our credentials as a brand that
                    entered the field to offer sincere services to all our
                    clients approaching for help. Real estate is a field where
                    requirements vary among clients. Therefore, we ensure to
                    provide our clients with individual and commercial
                    requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadingSection;