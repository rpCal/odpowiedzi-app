import React, { Component, useState } from "react";
import { FaVolumeUp, FaPlusCircle, FaBackspace, FaPlay } from "react-icons/fa";
import "./App.css";

const listOfWords = [
  { text: "Cześć", image: "img_czesc.jpg" },
  { text: "Aneta", image: "img_item_aneta.jpg" },
  { text: "Upiekłaś ciastka", image: "img_ukladam_kostke.jpg" },
  { text: "Spotkałem", image: "img_czesc.jpg" },
  { text: "Dzwonił", image: "img_czesc.jpg" },
  { text: "Wyjechać po Ciebie?", image: "img_czesc.jpg" },
  { text: "O której będziesz?", image: "img_czesc.jpg" },
  { text: "Wstawiłem ziemniaki", image: "img_czesc.jpg" },
  { text: "Czy ugotowac ziemniaki?", image: "img_czesc.jpg" },
  { text: "Pije kawe", image: "img_czesc.jpg" },
  { text: "Chleb", image: "img_czesc.jpg" },
  { text: "Zostawiłem klucze", image: "img_czesc.jpg" },
  { text: "Jestem u kazika", image: "img_czesc.jpg" },
  { text: "Wracam o", image: "img_czesc.jpg" },
  { text: "Dziękuje", image: "img_czesc.jpg" },
  { text: "Dzwonił", image: "img_czesc.jpg" },
  { text: "Dobrze", image: "img_czesc.jpg" },
  { text: "Naaprawiam samochód", image: "img_czesc.jpg" },
  { text: "Naprawiam motor", image: "img_czesc.jpg" },
  { text: "Kosze trawe", image: "img_czesc.jpg" },
  { text: "Układam kostke", image: "img_ukladam_kostke.jpg" },
  { text: "Kupiłem chleb", image: "img_kupilem_chleb.jpg" },
  { text: "Adaś", image: "img_adas.jpg" },
  { text: "Ania", image: "img_ania.jpg" },
  { text: "Jola", image: "img_jola.jpg" },
  { text: "Krzyś", image: "img_krzys.jpg" },
  { text: "Mariusz", image: "img_mariusz.jpg" },
  { text: "Piotrek", image: "img_piotrek.jpg" },
  { text: "Tadek", image: "img_tadek.jpg" },
  { text: "Tomek", image: "img_tomek.jpg" },
  { text: "Wiktoria", image: "img_wiktoria.jpg" },
  { text: "Zuzia", image: "img_zuzia.jpg" },
  { text: "Gram w karty", image: "img_czesc.jpg" },
  { text: "Oglądam telewizje", image: "img_czesc.jpg" },
  { text: "Niedlugo", image: "img_czesc.jpg" },
  { text: "Na wspólnej", image: "img_czesc.jpg" },
  { text: "M jak miłośc", image: "img_czesc.jpg" },
  { text: "Woże drzewo", image: "img_czesc.jpg" },
  { text: "Jestem", image: "img_czesc.jpg" },
  { text: "W garażu", image: "img_czesc.jpg" },
  { text: "Na papierosu", image: "img_czesc.jpg" },
  { text: "Wiertarka", image: "img_czesc.jpg" },
  { text: "Samochód", image: "img_czesc.jpg" },
  { text: "Piła", image: "img_czesc.jpg" },
  { text: "Zakupy", image: "img_czesc.jpg" },
  {
    text: "Kategoria - Rodzina i znajomi",
    image: "img_category_rodzina_i_znajomi.jpg"
  },
  { text: "Kategoria - Co robie?", image: "img_co_robie.jpg" }
];

class App extends Component<{}, { speechEnabled: boolean; queueWords: any[] }> {
  constructor(props) {
    super(props);
    this.state = {
      speechEnabled: "speechSynthesis" in window,
      queueWords: []
    };
  }

  componentDidMount() {}

  render() {
    const onWorkAddToQueue = word => {
      this.setState({ queueWords: [...this.state.queueWords, word] });
    };
    const onBackspace = () => {
      if (this.state.queueWords.length > 0) {
        const newList = [...this.state.queueWords];
        newList.pop();
        this.setState({ queueWords: newList });
      }
    };
    const onReadAll = () => {
      if (this.state.queueWords.length > 0) {
        const longWord = this.state.queueWords.map(word => word.text).join(" ");
        speakText(longWord);
      }
    };
    return (
      <div>
        {this.state.speechEnabled ? (
          <div>
            <HeaderQueue
              words={this.state.queueWords}
              onBackspace={onBackspace}
              onReadAll={onReadAll}
            />
            <WorkItems
              words={listOfWords}
              onWorkAddToQueue={onWorkAddToQueue}
            />
          </div>
        ) : (
          <div>
            <h1>Przeglądarka nie obsłuje api do mowy!</h1>
            <h2>Potrzebny jest chrome 33+</h2>
          </div>
        )}
      </div>
    );
  }
}

const HeaderQueue = ({ words, onBackspace, onReadAll }) => {
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
        <div style={{ height: "100%", width: "calc(100% - 100px)" }}>
          <QueueSentence words={words} />
        </div>

        {words && words.length > 0 ? (
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
        ) : null}

        {words && words.length > 0 ? (
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
        ) : null}
      </div>
    </div>
  );
};

const QueueSentence = ({ words }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {words.map((word, index) => {
        return <SmallWordItem key={index} word={word} />;
      })}
    </div>
  );
};

const SmallWordItem = ({ word }) => {
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

const WorkItems = ({ words, onWorkAddToQueue }) => {
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

const speakText = text => {
  const voices = speechSynthesis.getVoices();
  if (voices.length === 0) {
    alert("Niestety nie ma głosu audio w przeglądarce");
  }
  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.volume = 1;
  msg.pitch = 1;
  msg.rate = 1;
  msg.lang = "pl-PL";
  window.speechSynthesis.speak(msg);
};

const WordItem = (props: { word: any; onWorkAddToQueue? }) => {
  const { word, onWorkAddToQueue } = props;
  const [textCopied, setTextCopied] = useState(false);
  const onWorkPlaySound = ({ text }) => {
    speakText(text);
  };
  const onWorkCopyText = ({ text }) => {
    var copy = function(e) {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData("text/plain", text);
        setTextCopied(true);
        setTimeout(() => {
          setTextCopied(false);
        }, 2000);
      } else if ((window as any).clipboardData) {
        (window as any).clipboardData.setData("Text", text);
        setTextCopied(true);
        setTimeout(() => {
          setTextCopied(false);
        }, 2000);
      }
    };
    window.addEventListener("copy", copy);
    document.execCommand("copy");
    window.removeEventListener("copy", copy);
  };
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
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            transform: "translate(0, 0)",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 50,
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5
          }}
          onClick={() => onWorkAddToQueue(word)}
        >
          <FaPlusCircle color={"#fff"} />
        </div>
        <div
          onClick={() => onWorkPlaySound(word)}
          style={{ position: "relative" }}
        >
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
          {word.text}
        </div>

        {textCopied ? <div>Skopiowano</div> : null}
      </div>
    </div>
  );
};

export default App;
