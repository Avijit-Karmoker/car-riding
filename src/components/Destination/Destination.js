import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import GoogleMap from "../GoogleMap";
import "./Destination.css";
import car from "../../images/Frame-2.png";
import { UserContext } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Destination = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(loggedInUser);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const history = useHistory();
  let showDestination;
  const search = () => {
    showDestination = true;
  };

  const handleTo = (event) => {
    // let to = '';
    // let from = '';
    if (event.target.name === "from") {
      setFrom(event.target.value);
    }
    if (event.target.name === "to") {
      setTo(event.target.value);
    }
  };
  return (
    <div className="destination">
      <div style={{ width: "30%" }}>
        <div className="destination-text">
          <p>Pick From</p>
          <input type="text" name="from" onBlur={handleTo} />
          <p>Pick To</p>
          <input type="text" name="to" onBlur={handleTo} />
          <br />
          <button className="submit" onClick={search}>
            Search
          </button>
        </div>
        <div className="selected-destination">
          <div className="final-destination">
            <div className="design">
              <div className="circle"></div>
              <div className="line"></div>
              <div className="circle2"></div>
            </div>
            <div>
              <h5>From: {from}</h5>
              <h5 className="to">To: {to}</h5>
            </div>
          </div>
          <div>
            <div className="vehicle-details">
              <img src={car} alt="" />
              <p className="vehicle">Car</p>
              <p className="icon"><FontAwesomeIcon icon={faUserFriends} /> 1</p>
              <p className="money">$ 64</p>
            </div>
            <div className="vehicle-details">
              <img src={car} alt="" />
              <p className="vehicle">Car</p>
              <p className="icon"><FontAwesomeIcon icon={faUserFriends} /> 2</p>
              <p className="money">$ 64</p>
            </div>
            <div className="vehicle-details">
              <img src={car} alt="" />
              <p className="vehicle">Car</p>
              <p className="icon"><FontAwesomeIcon icon={faUserFriends} /> 4</p>
              <p className="money">$ 64</p>
            </div>
          </div>
        </div>
      </div>
      <div className="map">
        <GoogleMap />
      </div>
    </div>
  );
};

export default Destination;
