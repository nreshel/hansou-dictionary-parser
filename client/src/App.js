import React, { Component } from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      eng: /\/(.*?)\//,
      han: /(\p{Script=Hani})+/gu,
      pinyin: /\[(.*?)\]/,
      jyutping: /\{(.*?)\}/,
      description: /\/([^}]+)\//,
      parsed_dict: {}
    }
  }
  
  parse_file(input) {

    const {eng, han, pinyin, jyutping, description} = this.state;

    const file = input.target.files[0];
    const reader = new FileReader();
    let dict = {
      "dictionary": {}
    }
    let counter = 0
    let dict_key = ""
    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);
        allLines.forEach((line) => { // reads line by line
          dict_key = `${line.match(han)}`.split(",")[0]
          // dict_key = `${line.match(eng)}`.split('/')[1]
          console.log(dict_key)
          dict["dictionary"][dict_key] = {}
          if((line.match(han) || line.match(pinyin) || line.match(jyutping) || line.match(description)) != null) {
            dict["dictionary"][dict_key] = {
              "word": line.match(han),
              "piynin": line.match(pinyin),
              "jyutping": line.match(jyutping),
              "description": line.match(description)
            }
            console.log(dict["dictionary"][dict_key])
            return counter++
          } else {
            return counter
          }
        });

        axios.post('http://localhost:5000/upload', dict)
        
        this.setState({
          parsed_dict: dict
        })
    };

    reader.onerror = (event) => {
        alert(event.target.error.name);
    };

    reader.readAsText(file);
  }
  
  render() {
    return (
      <div className="App">
        <input type="file" name="file" onChange={(e) => this.parse_file(e)}/>
      </div>
    )
  }
}

export default App
