import React from "react";

const Option = ({ categories }) => {
  return (
    <>
      {categories && categories.length > 0
        ? categories.map((c, i) => {
            return <option value={c.id}>{c.category}</option>;
          })
        : null}
    </>
  );
};

export default Option;
