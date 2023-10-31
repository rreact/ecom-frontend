import React, { useState } from "react";
function Accordion() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const items = [
    {
      title: "Section 1",
      content: "This is the content of section 1",
    },
    {
      title: "Section 2",
      content: "This is the content of section 2",
    },
    {
      title: "Section 3",
      content: "This is the content of section 3",
    },
  ];
  const handleClick = (index) => {
    console.log(index);
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <div>
      {items.map((item, index) => (
        <div className="bg-teal-400 p-2 m-1 rounded" key={item.title}>
          <div className="flex">
            <div className="basis-11/12">{item.title}</div>
            <div className="basis-1/12">
              <button onClick={() => handleClick(index)}>
                {index === activeIndex ? "-" : "+"}
              </button>
            </div>
          </div>

          {index === activeIndex && (
            <div className="bg-green-400 p-2 m-1">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default Accordion;
