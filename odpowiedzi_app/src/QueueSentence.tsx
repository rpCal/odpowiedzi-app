import React from "react";
import { SmallWordItem } from "./SmallWordItem";

export const QueueSentence = ({ words }) => {
  return (
    <div style={{ height: "100%", width: "calc(100% - 100px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {words.map((word, index) => {
          return <SmallWordItem key={index} word={word} />;
        })}
      </div>
    </div>
  );
};
