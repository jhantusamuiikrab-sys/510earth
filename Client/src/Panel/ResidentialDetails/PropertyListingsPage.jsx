import { useState } from "react";
import { FilterSidebar } from "./FilterSidebar";
import { MainContent } from "./MainContent";

export function PropertyListingsPage() {
  // Fix 1: Properly shape initial filter and search state
  const [filters, setFilters] = useState({
    priceRange: [0, 50000000],
    bedrooms: [],
    areaRange: [0, 15000],
    constructionStatus: [],
  });
  
  const [searchQuery, setSearchQuery] = useState({ location: "", name: "" });

  return (
    <div style={{ display: "flex" }}>
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <MainContent
        filters={filters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}