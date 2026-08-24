import React, { useRef, useState,useEffect } from "react";
import styles from "../../assets/paneldesign/css/MainContent.module.css";
import { Pagination } from "./Pagination";

// Realistic Dataset to match all sidebar filters
const REALISTIC_PROPERTIES = [
  {
    id: 1,
    title: "JMC Green Oaks",
    location: "SILIGURI, DAGAPUR , SILIGURI",
    status: "Ready to Move",
    price: 4025000,
    priceDisplay: "40.25 Lakhs onwards",
    bhk: "2BHK",
    bhkNumeric: 2,
    areaSqFt: 1150,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "DTC Downtown",
    location: "RAJARHAT , RAJARHAT",
    status: "Under Construction",
    price: 6500000,
    priceDisplay: "65 Lakhs onwards",
    bhk: "2BHK, 3BHK, 4BHK",
    bhkNumeric: 3,
    areaSqFt: 1850,
    image:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "JMC Hill View",
    location: "SILIGURI, MATIGARA , SILIGURI",
    status: "Ready to Move",
    price: 3465000,
    priceDisplay: "34.65 Lakhs onwards",
    bhk: "2BHK, 3BHK",
    bhkNumeric: 2,
    areaSqFt: 980,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Grand Horizon Towers",
    location: "NEW TOWN , KOLKATA",
    status: "Under Construction",
    price: 12500000,
    priceDisplay: "1.25 Cr onwards",
    bhk: "3BHK, 4BHK, 5BHK",
    bhkNumeric: 4,
    areaSqFt: 3200,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Imperial Heights Villa",
    location: "EM BYPASS , KOLKATA",
    status: "Resale",
    price: 48000000,
    priceDisplay: "4.80 Cr onwards",
    bhk: "5BHK, 6BHK, 8BHK",
    bhkNumeric: 6,
    areaSqFt: 8500,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Urban Breeze Smart Homes",
    location: "HOWRAH , KOLKATA",
    status: "Ready to Move",
    price: 2200000,
    priceDisplay: "22 Lakhs onwards",
    bhk: "1BHK, 2BHK",
    bhkNumeric: 1,
    areaSqFt: 620,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "The Royal Estate Enclave",
    location: "SECTOR 5 , SALT LAKE",
    status: "Under Construction",
    price: 38000000,
    priceDisplay: "3.80 Cr onwards",
    bhk: "7BHK, 9BHK, 10BHK",
    bhkNumeric: 10,
    areaSqFt: 14500,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Skyline Palms Residency",
    location: "SEVOKE ROAD , SILIGURI",
    status: "Resale",
    price: 8800000,
    priceDisplay: "88 Lakhs onwards",
    bhk: "3BHK, 4BHK",
    bhkNumeric: 3,
    areaSqFt: 2100,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 1,
    title: "JMC Green Oaks",
    location: "SILIGURI, DAGAPUR , SILIGURI",
    status: "Ready to Move",
    price: 4025000,
    priceDisplay: "40.25 Lakhs onwards",
    bhk: "2BHK",
    bhkNumeric: 2,
    areaSqFt: 1150,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "DTC Downtown",
    location: "RAJARHAT , RAJARHAT",
    status: "Under Construction",
    price: 6500000,
    priceDisplay: "65 Lakhs onwards",
    bhk: "2BHK, 3BHK, 4BHK",
    bhkNumeric: 3,
    areaSqFt: 1850,
    image:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "JMC Hill View",
    location: "SILIGURI, MATIGARA , SILIGURI",
    status: "Ready to Move",
    price: 3465000,
    priceDisplay: "34.65 Lakhs onwards",
    bhk: "2BHK, 3BHK",
    bhkNumeric: 2,
    areaSqFt: 980,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Grand Horizon Towers",
    location: "NEW TOWN , KOLKATA",
    status: "Under Construction",
    price: 12500000,
    priceDisplay: "1.25 Cr onwards",
    bhk: "3BHK, 4BHK, 5BHK",
    bhkNumeric: 4,
    areaSqFt: 3200,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Imperial Heights Villa",
    location: "EM BYPASS , KOLKATA",
    status: "Resale",
    price: 48000000,
    priceDisplay: "4.80 Cr onwards",
    bhk: "5BHK, 6BHK, 8BHK",
    bhkNumeric: 6,
    areaSqFt: 8500,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Urban Breeze Smart Homes",
    location: "HOWRAH , KOLKATA",
    status: "Ready to Move",
    price: 2200000,
    priceDisplay: "22 Lakhs onwards",
    bhk: "1BHK, 2BHK",
    bhkNumeric: 1,
    areaSqFt: 620,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "The Royal Estate Enclave",
    location: "SECTOR 5 , SALT LAKE",
    status: "Under Construction",
    price: 38000000,
    priceDisplay: "3.80 Cr onwards",
    bhk: "7BHK, 9BHK, 10BHK",
    bhkNumeric: 10,
    areaSqFt: 14500,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Skyline Palms Residency",
    location: "SEVOKE ROAD , SILIGURI",
    status: "Resale",
    price: 8800000,
    priceDisplay: "88 Lakhs onwards",
    bhk: "3BHK, 4BHK",
    bhkNumeric: 3,
    areaSqFt: 2100,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  },
];
export function MainContent({
  properties = REALISTIC_PROPERTIES,
  filters,
  searchQuery,
  setSearchQuery,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const cardsRef = useRef([]);

  // Filter Algorithm Engine
  const filteredProperties = properties.filter((item) => {
    if (
      searchQuery?.location &&
      !item.location.toLowerCase().includes(searchQuery.location.toLowerCase())
    ) {
      return false;
    }
    if (
      searchQuery?.name &&
      !item.title.toLowerCase().includes(searchQuery.name.toLowerCase())
    ) {
      return false;
    }

    if (filters?.priceRange && item.price > filters.priceRange[1]) {
      return false;
    }

    if (filters?.areaRange && item.areaSqFt > filters.areaRange[1]) {
      return false;
    }

    if (filters?.bedrooms && filters.bedrooms.length > 0) {
      const propertyBhks = item.bhk.split(", ");
      const hasBhkMatch = propertyBhks.some((b) =>
        filters.bedrooms.includes(b)
      );
      if (!hasBhkMatch) return false;
    }

    if (filters?.constructionStatus && filters.constructionStatus.length > 0) {
      if (!filters.constructionStatus.includes(item.status)) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // IntersectionObserver to add animateScroll class dynamically on scroll/mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateScroll);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [currentProperties]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.mainContainer}>
      <section className={styles.searchSection}>
        <h2 className={styles.heading}>Listing of Residential Properties</h2>

        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Enter City / Location"
            value={searchQuery?.location || ""}
            onChange={(e) =>
              setSearchQuery &&
              setSearchQuery({ ...searchQuery, location: e.target.value })
            }
          />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Select property name"
            value={searchQuery?.name || ""}
            onChange={(e) =>
              setSearchQuery &&
              setSearchQuery({ ...searchQuery, name: e.target.value })
            }
          />
          <button className={styles.searchBtn}>Search</button>
        </div>
      </section>

      <section className={styles.propertyGrid}>
        {currentProperties.length > 0 ? (
          currentProperties.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={styles.cardContainer}
              style={{ transitionDelay: `${index * 0.15}s` }} /* Staggered effect */
            >
              <div className={styles.propertyCard}>
                {/* 70% Image Section */}
                <div className={styles.cardImageWrapper}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardLocation}>
                      <span className={styles.pinIcon}>📍</span> {item.location}
                    </p>
                  </div>

                  <div
                    className={`${styles.statusBadge} ${
                      item.status === "Ready to Move"
                        ? styles.badgeReady
                        : item.status === "Under Construction"
                        ? styles.badgeConstruction
                        : styles.badgeResale
                    }`}
                  >
                    {item.status}
                  </div>
                </div>

                {/* 30% Content Section */}
                <div className={styles.cardBody}>
                  <div className={styles.cardRow}>
                    <p className={styles.cardPrice}>₹ {item.priceDisplay}</p>
                    <p className={styles.cardBhk}>{item.bhk}</p>
                  </div>
                  <button className={styles.detailsBtn}>VIEW DETAILS</button>
                </div>
              </div>

              {/* Soft Curved Shadow Container */}
              <div className={styles.cardShadow}></div>
            </div>
          ))
        ) : (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#888",
              padding: "40px 0",
            }}
          >
            No properties found matching your filter selections.
          </p>
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
