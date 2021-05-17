import React from "react";
import PropTypes from "prop-types";
import "./Tab.css";

const Tab = ({ activeTab, label, title, onClick }) => {
  const handleTabClick = () => {
    onClick(label);
  };

  const isActiveTab = activeTab === label;

  return (
    <li
      className={`Tab ${isActiveTab ? "active" : ""}`}
      onClick={handleTabClick}
    >
      {title}
    </li>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
