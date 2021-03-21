import React, { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import fakeData from "../fakeData/FakeData.json";
import "./Home.css";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const handleClick = (data) => {
    history.push("/destination/:id")
    setLoggedInUser(data);
  };
  return (
    <div onClick={handleClick} style={{ marginTop: "10%" }}>
      {fakeData.map((data) => (
        <div className="all-category">
          <div className="category" key={data.id}>
            <img src={data.img} alt="" />
            <h4>{data.name}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
