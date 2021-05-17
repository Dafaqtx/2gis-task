import React from "react";
import PropTypes from "prop-types";

import "./Tag.css";

const Tag = ({ label, onClick = () => {} }) => (
  <button type="button" onClick={() => onClick(label)} className="Tag">
    {`#${label}`}
  </button>
);

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Tag;
