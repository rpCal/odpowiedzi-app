import React, { Component } from "react";
import "./App.css";
import { copyText } from "./copyText";
import { speakText } from "./speakText";
import { WorkItems } from "./WorkItems";
import { HeaderQueue } from "./HeaderQueue";
import { listOfWords } from "./listOfWords";

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
            <h1>Przeglądarka nie obsłuje odpowiedzniego api!</h1>
            <h2>Potrzebny jest przynajmniej chrome 33+</h2>
          </div>
        )}
      </div>
    );
  }
}

export default App;
