import React from "react";
import "./ServiceLoader.scss";
import Fallback from "../fallback/Fallback";

const ServiceLoadingPage = ({ text }) => (
  <div className="service-loader-cont">
    <div class="service-loader"></div>
  </div>
);

export default ServiceLoadingPage;
