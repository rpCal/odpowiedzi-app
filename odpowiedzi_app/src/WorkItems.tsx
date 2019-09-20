import React from "react";
import { WordItem } from "./WordItem";

export const WorkItems = ({ words, onWorkAddToQueue }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "80px" }}>
      {words.map((word, index) => {
        return (
          <WordItem
            key={index}
            word={word}
            onWorkAddToQueue={onWorkAddToQueue}
          />
        );
      })}
    </div>
  );
};
