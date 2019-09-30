import React, { Component } from "react";
import "./App.css";
import { copyText } from "./copyText";
import { speakText } from "./speakText";
import { WorkItems } from "./WorkItems";
import { HeaderQueue } from "./HeaderQueue";
import { listOfWords } from "./listOfWords";
import ReactGA from "react-ga";

class App extends Component<{}, { speechEnabled: boolean; queueWords: any[] }> {
  constructor(props) {
    super(props);
    this.state = {
      speechEnabled: "speechSynthesis" in window,
      queueWords: []
    };
  }

  componentDidMount() {
    ReactGA.initialize("UA-44811598-13", {
      debug: true
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const onWorkAddToQueue = word => {
      ReactGA.event({
        category: "Words",
        action: "added word to main queue",
        label: word.text
      });
      this.setState({ queueWords: [...this.state.queueWords, word] });
    };

    const onBackspace = () => {
      if (this.state.queueWords.length > 0) {
        const newList = [...this.state.queueWords];
        newList.pop();
        this.setState({ queueWords: newList });

        const longWord: any = newList.map(word => word.text).join(" ");
        ReactGA.event({
          category: "Words",
          action: "remove text from main queue",
          label: longWord
        });
      } else {
        ReactGA.event({
          category: "Words",
          action: "remove text from main queue",
          label: ""
        });
      }
    };

    const onReadAll = () => {
      if (this.state.queueWords.length > 0) {
        const longWord: any = this.state.queueWords
          .map(word => word.text)
          .join(" ");
        speakText(longWord);
        ReactGA.event({
          category: "Words",
          action: "read text from main queue",
          label: longWord
        });
      } else {
        ReactGA.event({
          category: "Words",
          action: "read text from main queue",
          label: ""
        });
      }
    };

    const onCopyAll = () => {
      if (this.state.queueWords.length > 0) {
        const longWord: any = this.state.queueWords
          .map(word => word.text)
          .join(" ");
        copyText(longWord, () => {
          alert("Skopiowano: " + longWord);
        });

        ReactGA.event({
          category: "Words",
          action: "copy text from main queue",
          label: longWord
        });
      } else {
        ReactGA.event({
          category: "Words",
          action: "copy text from main queue",
          label: ""
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
            <h1>Przeglądarka nie obsłuje odpowiedzniego api!</h1>
            <h2>Potrzebny jest przynajmniej chrome 33+</h2>
            <h3>ps. Możliwe że otwierasz link przez fb a nie przez chrome ;) </h3>
          </div>
        )}
      </div>
    );
  }
}

export default App;
