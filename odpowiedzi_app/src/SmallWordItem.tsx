import React from "react";

export const SmallWordItem = ({ word }) => {
  return (
    <div>
      <div style={{ height: "50px", marginRight: "2px" }}>
        <img
          src={`./assets/images/${word.image}`}
          alt={word.text}
          style={{ maxHeight: 50, maxWidth: 50 }}
        />
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.4)",
          overflow: "hidden",
          maxWidth: "50px",
          textOverflow: "ellipsis",
          maxHeight: "30px"
        }}
      >
        {word.text}
      </div>
    </div>
  );
};
