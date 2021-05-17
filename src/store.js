import { createContext } from "react";
export const ContextApp = createContext();

export const initialState = {
  filters: [],
  books: {
    toRead: [],
    inProgress: [],
    done: [],
  },
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "@FILTER/ADD":
      const filters = [...new Set([...state.filters, action.payload])];

      return {
        ...state,
        filters,
      };
    case "@FILTER/RESET":
      return {
        ...state,
        filters: [],
      };
    case "@BOOK/INIT":
      const item = window.localStorage.getItem("books");
      const items = JSON.parse(item);
      const books = item ? items : { ...state.books, toRead: action.payload };

      return {
        ...state,
        books,
      };

    case "@BOOK/ADD/TO_READ": {
      const bookInDone = state.books.done.find(
        (item) => item.id === action.payload
      );

      const filteredDoneList = state.books.done.filter(
        (item) => item.id !== action.payload
      );

      const books = {
        ...state.books,
        done: [...filteredDoneList],
        toRead: [...state.books.toRead, bookInDone],
      };

      window.localStorage.setItem("books", JSON.stringify(books));

      return {
        ...state,
        books,
      };
    }

    case "@BOOK/ADD/IN_PROGRESS": {
      const bookInProgress = state.books.toRead.find(
        (item) => item.id === action.payload
      );

      const filteredToReadList = state.books.toRead.filter(
        (item) => item.id !== action.payload
      );

      const books = {
        ...state.books,
        toRead: [...filteredToReadList],
        inProgress: [...state.books.inProgress, bookInProgress],
      };

      window.localStorage.setItem("books", JSON.stringify(books));

      return {
        ...state,
        books,
      };
    }

    case "@BOOK/ADD/DONE": {
      const bookInDone = state.books.inProgress.find(
        (item) => item.id === action.payload
      );

      const filteredInProgressList = state.books.inProgress.filter(
        (item) => item.id !== action.payload
      );

      const books = {
        ...state.books,
        inProgress: [...filteredInProgressList],
        done: [...state.books.done, bookInDone],
      };

      window.localStorage.setItem("books", JSON.stringify(books));

      return {
        ...state,
        books,
      };
    }

    default:
      return state;
  }
};
