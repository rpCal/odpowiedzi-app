import React, { useState } from "react";
import { FaVolumeUp, FaPlusCircle, FaCopy } from "react-icons/fa";
import { speakText } from "./speakText";
import { copyText } from "./copyText";

export const WordItem = (props: { word: any; onWorkAddToQueue? }) => {
  const { word, onWorkAddToQueue } = props;
  const [textCopied, setTextCopied] = useState(false);
  const onWorkPlaySound = ({ text }) => {
    speakText(text);
  };
  const onWorkCopyText = ({ text }) => {
    copyText(text, () => {
      setTextCopied(true);
      setTimeout(() => {
        setTextCopied(false);
      }, 2000);
    });
  };
  return (
    <ItemWrapper>
      <AddToQueue onWorkAddToQueue={onWorkAddToQueue} word={word} />
      <MainImage onWorkPlaySound={onWorkPlaySound} word={word} />
      <CopyTextIcon onWorkCopyText={onWorkCopyText} word={word} />
      <TextCopied textCopied={textCopied} />
    </ItemWrapper>
  );
};

const ItemWrapper = ({ children }) => {
  return (
    <div
      style={{
        width: "calc(50% - 5px)",
        marginRight: 5,
        marginBottom: 10,
        marginTop: 10
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#eee",
          borderRadius: 6,
          overflow: "hidden"
        }}
      >
        {children}
      </div>
    </div>
  );
};

const AddToQueue = ({ onWorkAddToQueue, word }) => {
  return (
    <div
      onClick={() => onWorkAddToQueue(word)}
      style={{
        position: "absolute",
        top: "0px",
        right: "0px",
        transform: "translate(0, 0)",
        width: "80px",
        height: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5
      }}
    >
      <div
        style={{
          position: "relative",
          top: "0px",
          right: "0px",
          transform: "translate(0%, 0%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 50,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5
        }}
      >
        <FaPlusCircle color={"#fff"} size={"25px"} />
      </div>
    </div>
  );
};

const MainImage = ({ onWorkPlaySound, word }) => {
  return (
    <div onClick={() => onWorkPlaySound(word)} style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          transform: "translate(0, 0)",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 50,
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <FaVolumeUp color={"#fff"} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={`./assets/images/${word.image}`}
          alt={word.text}
          style={{ maxHeight: 200, maxWidth: 200, margin: "0 auto" }}
        />
      </div>
    </div>
  );
};

const CopyTextIcon = ({ onWorkCopyText, word }) => {
  return (
    <div
      onClick={() => onWorkCopyText(word)}
      style={{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "#fff",
        fontSize: "30px",
        paddingTop: "10px",
        paddingBottom: "10px",
        cursor: "pointer",
        textAlign: "center"
      }}
    >
      {word.text}{" "}
      <FaCopy size={"25px"} color={"#fff"} style={{ marginLeft: 10 }} />
    </div>
  );
};

const TextCopied = ({ textCopied }) => {
  return textCopied ? (
    <div style={{ textAlign: "center", padding: 10 }}>
      <FaCopy size={"35px"} color={"#bbb"} /> <br />
      Skopiowano
    </div>
  ) : null;
};
