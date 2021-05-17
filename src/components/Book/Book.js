import PropTypes from "prop-types";
import { STATUSES } from "@constants";

import Tag from "../Tag";

import "./Book.css";

const Book = ({
  id,
  author,
  title,
  description,
  tags,
  status,
  onFilter,
  onAction,
}) => {
  return (
    <article className="Book">
      <header className="Book__author">{author}</header>
      <div className="Book__line">
        <h2 className="Book__title">{title}</h2>
        <button className="Book__btn" onClick={() => onAction({ status, id })}>
          {STATUSES[status].text ?? "-"}
        </button>
      </div>
      <div className="Book__desc">{description}</div>
      <div className="Book__tags">
        {tags.map((label) => (
          <Tag label={label} key={label} onClick={onFilter} />
        ))}
      </div>
    </article>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Book;
