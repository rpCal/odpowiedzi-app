import React, { Component, useState } from "react";
import {
  FaVolumeUp,
  FaPlusCircle,
  FaBackspace,
  FaPlay,
  FaCopy
} from "react-icons/fa";
import "./App.css";

const listOfWords = [
  { text: "Cześć", image: "img_czesc.jpg" },
  { text: "Jola", image: "img_jola.jpg" },
  { text: "Aneta", image: "img_item_aneta.jpg" },
  { text: "Wiki", image: "img_wiktoria.jpg" },
  { text: "Wyjechać po Ciebie?", image: "img_wyjechac_po_ciebie.jpg" },
  { text: "Czy ugotowac ziemniaki?", image: "img_wstawilem_ziemniaki.jpg" },
  { text: "Pije kawe", image: "pije_kawe.jpg" },
  { text: "Chleb", image: "img_chleb.jpg" },
  { text: "Zostawiłem klucze", image: "img_zostawilem_klucze.jpg" },
  { text: "Jestem u kazika", image: "img_jestem_u_kazika.jpg" },
  { text: "Gram w pasjansa", image: "img_gram_w_pasjansa.jpg" },
  { text: "Wracam o", image: "img_wracam_o.jpg" },
  { text: "Dzwonił", image: "img_dzwonil.jpg" },
  { text: "Dziękuje", image: "img_dziekuje.jpg" },
  { text: "Dobrze", image: "img_dobrze.jpg" },
  { text: "Układam kostke", image: "img_ukladam_kostke.jpg" },
  { text: "Kupiłem chleb", image: "img_kupilem_chleb.jpg" },
  { text: "Ania", image: "img_ania.jpg" },
  { text: "Krzyś", image: "img_krzys.jpg" },
  { text: "Mariusz", image: "img_mariusz.jpg" },
  { text: "Piotrek", image: "img_piotrek.jpg" },
  { text: "Tadek", image: "img_tadek.jpg" },
  { text: "Tomek", image: "img_tomek.jpg" },
  { text: "Zuzia", image: "img_zuzia.jpg" },
  { text: "Adaś", image: "img_adas.jpg" },
  { text: "Oglądam telewizje", image: "img_ogladam_telewizje.jpg" },
  { text: "Barwy szczęscia", image: "img_barwy_szczescia.jpg" },
  { text: "M jak miłośc", image: "img_m_jak_milosc.jpg" },
  { text: "Wstawiłem ziemniaki", image: "img_wstawilem_ziemniaki.jpg" },

  { text: "Upiekłaś ciastka", image: "img_ukladam_kostke.jpg" },
  { text: "ziemniaki", image: "img_czy_obraz_ziemniaki.jpg" },
  {
    text: "Kategoria - Rodzina i znajomi",
    image: "img_category_rodzina_i_znajomi.jpg"
  },
  { text: "Kategoria - Co robie?", image: "img_co_robie.jpg" },
  { text: "Samochód", image: "img_naprawiam_samochod.jpg" },
  { text: "O której będziesz?", image: "img_czesc.jpg" },
  { text: "Jestem", image: "img_czesc.jpg" },
  { text: "W garażu", image: "img_czesc.jpg" },
  { text: "Na papierosu", image: "img_czesc.jpg" },
  { text: "Wiertarka", image: "img_czesc.jpg" },
  { text: "Piła", image: "img_czesc.jpg" },
  { text: "Zakupy", image: "img_czesc.jpg" },
  { text: "Niedlugo", image: "img_czesc.jpg" },
  { text: "Woże drzewo", image: "img_czesc.jpg" },
  { text: "Naprawiam motor", image: "img_czesc.jpg" },
  { text: "Kosze trawe", image: "img_czesc.jpg" },
  { text: "Spotkałem", image: "img_czesc.jpg" }
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
    const onCopyAll = () => {
      if (this.state.queueWords.length > 0) {
        const longWord = this.state.queueWords.map(word => word.text).join(" ");
        copyText(longWord, () => {
          alert("Skopiowano: " + longWord);
        });
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
              onCopyAll={onCopyAll}
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

const HeaderQueue = ({ words, onBackspace, onReadAll, onCopyAll }) => {
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

        {words && words.length > 0 ? (
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


const copyText = (text, callback?) => {
  var copy = function(e) {
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.setData("text/plain", text);
      if (callback) {
        callback();
      }
    } else if ((window as any).clipboardData) {
      (window as any).clipboardData.setData("Text", text);
      if (callback) {
        callback();
      }
    }
  };
  window.addEventListener("copy", copy);
  document.execCommand("copy");
  window.removeEventListener("copy", copy);
};

const WordItem = (props: { word: any; onWorkAddToQueue? }) => {
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
          {word.text}{" "}
          <FaCopy size={"25px"} color={"#fff"} style={{ marginLeft: 10 }} />
        </div>

        {textCopied ? (
          <div style={{ textAlign: "center", padding: 10 }}>
            <FaCopy size={"35px"} color={"#bbb"} /> <br />
            Skopiowano
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
