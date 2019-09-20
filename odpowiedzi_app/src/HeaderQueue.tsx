import React from "react";
import { FaBackspace, FaPlay, FaCopy } from "react-icons/fa";
import { QueueSentence } from "./QueueSentence";

export const HeaderQueue = ({ words, onBackspace, onReadAll, onCopyAll }) => {
  return (
    <ItemWrapper>
    <QueueSentence words={words} />
      <ReadAll words={words} onReadAll={onReadAll} />
      <RemoveLetter words={words} onBackspace={onBackspace} />
      <CopyText words={words} onCopyAll={onCopyAll} />
    </ItemWrapper>
  );
};

const ItemWrapper = ({ children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "80px",
        overflow: "hidden",
        backgroundColor: "#eee",
        zIndex: 10
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start"
        }}
      >
        {children}
      </div>
    </div>
  );
};

const ReadAll = ({ words, onReadAll }) => {
  return words && words.length > 0 ? (
    <div
      onClick={onReadAll}
      style={{
        height: "80px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "10px",
        paddingRight: "10px"
      }}
    >
      <FaPlay color={"#bbb"} size={"30px"} />
    </div>
  ) : null;
};

const RemoveLetter = ({ words, onBackspace }) => {
  return words && words.length > 0 ? (
    <div
      onClick={onBackspace}
      style={{
        height: "80px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "10px",
        paddingRight: "10px"
      }}
    >
      <FaBackspace color={"#bbb"} size={"30px"} />
    </div>
  ) : null;
};

const CopyText = ({ words, onCopyAll }) => {
  return words && words.length > 0 ? (
    <div
      onClick={onCopyAll}
      style={{
        height: "80px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "10px",
        paddingRight: "10px"
      }}
    >
      <FaCopy color={"#bbb"} size={"30px"} />
    </div>
  ) : null;
};
