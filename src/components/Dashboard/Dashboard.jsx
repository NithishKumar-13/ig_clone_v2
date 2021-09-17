import React, { useEffect } from "react";
import Navbar from '../Navbar/Navbar'
import TimeLine from "../TimeLine/TimeLine";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.scss";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <TimeLine />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
