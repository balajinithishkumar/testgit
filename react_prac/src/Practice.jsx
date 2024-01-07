import React from "react";
function Practice() {
  const dataset = [
    { id: 1, name: "title1" },
    { id: 2, name: "title2" },
  ];
  return (
    <div>
      {dataset.map((d) => (
        <p>{d.name}</p>
      ))}
    </div>
  );
}

export default Practice;