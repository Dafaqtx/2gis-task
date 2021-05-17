import { useEffect, useReducer } from "react";
import queryString from "query-string";
import {
  useQueryParams,
  StringParam,
  withDefault,
  encodeDelimitedArray,
  decodeDelimitedArray,
} from "use-query-params";

import { Tabs, Book, Filters } from "@components";
import { STATUSES } from "@constants";
import { initialState, appReducer } from "@store";
import {
  bookInitAction,
  bookAddAction,
  addFilterAction,
  resetFilterAction,
} from "@actions";
import { useLocation } from "react-router";

import "./App.css";

const CommaArrayParam = {
  encode: (array) => encodeDelimitedArray(array, ","),
  decode: (arrayStr) => decodeDelimitedArray(arrayStr, ","),
};

const App = () => {
  const location = useLocation();
  const [query, setQuery] = useQueryParams({
    tab: StringParam,
    tags: withDefault(CommaArrayParam, []),
  });

  const [state, dispatch] = useReducer(appReducer, initialState);

  const { books, filters } = state;

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json"
        );
        const { items } = await res.json();
        dispatch(bookInitAction(items));
      } catch (error) {
        dispatch(bookInitAction([]));
      }
    };

    getBooks();
  }, []);

  /* eslint-disable */
  useEffect(() => {
    const params = queryString.parse(location.search);

    if (params.tags) {
      params.tags.split(",").forEach((tag) => {
        dispatch(addFilterAction(tag));
        setQuery({ tags: [...new Set([...query.tags, tag])] });
      });
    }
  }, []);
  /* eslint-enable */

  const handleActionClick = ({ id, status }) => {
    const transformStatuses = {
      TO_READ: "IN_PROGRESS",
      IN_PROGRESS: "DONE",
      DONE: "TO_READ",
    };
    dispatch(bookAddAction(transformStatuses[status], id));
  };

  const handleFilterClick = (label) => {
    dispatch(addFilterAction(label));
    setQuery({ tags: [...new Set([...query.tags, label])] });
  };

  const handleFilterReset = () => {
    dispatch(resetFilterAction());
    setQuery({ tags: undefined });
  };

  if (!books.toRead.length) {
    return null;
  }

  const getFilteredBooks = (status) =>
    books[status].filter((item) =>
      filters.every((f) => item?.tags?.includes(f))
    );

  const tabs = [
    {
      label: "toread",
      title: `To read (${books.toRead.length})`,
      items: getFilteredBooks("toRead"),
      status: STATUSES.TO_READ.status,
    },
    {
      label: "inprogress",
      title: `In progress (${books.inProgress.length})`,
      items: getFilteredBooks("inProgress"),
      status: STATUSES.IN_PROGRESS.status,
    },
    {
      label: "done",
      title: `Done (${books.done.length})`,
      items: getFilteredBooks("done"),
      status: STATUSES.DONE.status,
    },
  ];

  return (
    <div className="App">
      <Tabs query={query} setQuery={setQuery}>
        {tabs.map(({ label, title, items, status }) => (
          <div label={label} title={title} key={label}>
            {!!filters.length && (
              <Filters items={filters} onClear={handleFilterReset} />
            )}
            {items.length ? (
              items.map((book) => (
                <Book
                  {...book}
                  key={book.id}
                  status={status}
                  onFilter={handleFilterClick}
                  onAction={handleActionClick}
                />
              ))
            ) : (
              <div className="empty">List is empty</div>
            )}
          </div>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
