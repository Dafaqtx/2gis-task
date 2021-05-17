import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Tab from "../Tab";

import "./Tabs.css";

const Tabs = ({ query, setQuery, children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  /* eslint-disable */
  useEffect(() => {
    if (query.tab) {
      setActiveTab(query.tab);
    }

    setQuery({ tab: query.tab ?? activeTab });
  }, []);
  /* eslint-enable */

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
    setQuery({ tab });
  };

  return (
    <div className="Tabs">
      <ol className="Tabs__list">
        {children.map((child) => {
          const { title, label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              title={title}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="Tab__content">
        {children.map((child, i) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  query: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tabs;
