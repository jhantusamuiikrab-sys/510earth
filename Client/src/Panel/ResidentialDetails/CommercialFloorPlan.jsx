import React, { useState } from 'react';

import "../../assets/paneldesign/css/CommercialFloorPlan.css";

const COMMERCIAL_DATA = {
  '9 FLOOR': [
    {
      sizeRange: '1300 Sq Ft',
      builtUpArea: '-',
      carpetArea: '-',
      block: '-',
      entranceWidth: '-',
      ceilingHeight: '3.63 M',
      typeOfFlooring: 'Vitrified Tile'
    },
    {
      sizeRange: '1350 Sq Ft',
      builtUpArea: '-',
      carpetArea: '-',
      block: '-',
      entranceWidth: '-',
      ceilingHeight: '3.63 M',
      typeOfFlooring: 'Vitrified Tile'
    }
  ]
};

function CommercialFloorPlan() {
  const [activeTab, setActiveTab] = useState('9 FLOOR');

  return (
    <div className="cfp-main-wrapper">
      {/* Section Title */}
      <div className="cfp-title-container">
        <h2 className="cfp-heading">FLOOR PLANS</h2>
        <div className="cfp-heading-underline-group">
          <div className="cfp-blue-bar"></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="cfp-tabs-container">
        {Object.keys(COMMERCIAL_DATA).map((tabKey) => (
          <button
            key={tabKey}
            className={`cfp-tab-btn ${activeTab === tabKey ? 'cfp-tab-active' : ''}`}
            onClick={() => setActiveTab(tabKey)}
          >
            {tabKey}
          </button>
        ))}
      </div>

      {/* Specifications Table */}
      <div className="cfp-table-wrapper">
        <table className="cfp-table">
          <thead>
            <tr>
              <th>Size Range</th>
              <th>Built Up Area</th>
              <th>Carpet Area</th>
              <th>Block</th>
              <th>Entrance Width</th>
              <th>Ceiling Height</th>
              <th>Type Of Flooring</th>
            </tr>
          </thead>
          <tbody>
            {COMMERCIAL_DATA[activeTab].map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'cfp-row-even' : 'cfp-row-odd'}>
                <td>{row.sizeRange}</td>
                <td>{row.builtUpArea}</td>
                <td>{row.carpetArea}</td>
                <td>{row.block}</td>
                <td>{row.entranceWidth}</td>
                <td>{row.ceilingHeight}</td>
                <td>{row.typeOfFlooring}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommercialFloorPlan;