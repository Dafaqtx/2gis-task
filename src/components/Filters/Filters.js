import React from "react";
import PropTypes from "prop-types";

import Tag from "../Tag";

import "./Filters.css";

const Filters = ({ items, onClear = () => {} }) => {
  return (
    <div className="Filters">
      <span className="Filters__text">Filtered by tags:</span>
      <div className="Filters__list">
        {items.map((item) => (
          <Tag label={item} key={item} />
        ))}
      </div>
      <button
        type="button"
        className="Filters__clear"
        onClick={() => onClear()}
      >
        (clear)
      </button>
    </div>
  );
};

Filters.propTypes = {
  items: PropTypes.array.isRequired,
  onClear: PropTypes.func,
};

export default Filters;
