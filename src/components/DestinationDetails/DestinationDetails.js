import React from "react";
import GoogleMap from "../GoogleMap";
import './DestinationDetails.css';

const DestinationDeatils = () => {
  return (
    <div className="destination-details">
      <div style={{ width: "45%", display: 'flex' }}>
        <div className="destination-texts">
            <p>Mirpur</p>
        </div>
        <div className="maps">
          <GoogleMap />
        </div>
      </div>
    </div>
  );
};

export default DestinationDeatils;
