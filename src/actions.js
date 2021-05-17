export const bookInitAction = (payload) => ({ type: "@BOOK/INIT", payload });
export const bookAddAction = (status, payload) => {
  console.log(`@BOOK/ADD/${status}`);
  return {
    type: `@BOOK/ADD/${status}`,
    payload,
  };
};

export const addFilterAction = (payload) => ({ type: "@FILTER/ADD", payload });
export const resetFilterAction = () => ({ type: "@FILTER/RESET" });
