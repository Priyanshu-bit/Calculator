// src/Calculator.js
import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: '',
      result: '',
      fontSize: '32px', // Initial font size
    };
  }

  componentDidMount() {
    // Add event listeners for keyboard input
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // Remove event listeners when the component is unmounted
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    const key = event.key;

    // Define the key mappings for your calculator
    const keyMappings = {
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '+': '+',
      '-': '-',
      '*': '*',
      '/': '/',
      '.': '.',
      Enter: '=',
      Backspace: '⌫',
      c: 'C',
      C: 'C',
    };

    const mappedKey = keyMappings[key];

    if (mappedKey) {
      this.handleClick(mappedKey);
    }
  };

  handleClick = (value) => {
    if (value === '=') {
      try {
        this.setState({
          result: eval(this.state.display),
        });
      } catch (error) {
        this.setState({
          result: 'Error',
        });
      }
    } else if (value === 'C') {
      this.setState({
        display: '',
        result: '',
      });
    } else if (value === '⌫') {
      this.setState((prevState) => ({
        display: prevState.display.slice(0, -1),
      }));
    } else {
      this.setState(
        (prevState) => ({
          display: prevState.display + value,
        }),
        () => this.handleDisplaySize() // Adjust the font size after updating the display
      );
    }
  };

  handleDisplaySize = () => {
    const { display } = this.state;
    const displayLength = display.length;

    // Define a maximum font size and calculate a new font size based on the length of the displayed number
    const maxFontSize = 32; // Adjust this value as needed
    const newFontSize = Math.max(maxFontSize - displayLength, 16);

    this.setState({
      fontSize: `${newFontSize}px`,
    });
  };

  render() {
    const { display, fontSize } = this.state;

    return (
      <div className="calculator">
        <div className="display" style={{ fontSize: fontSize }}>
          {this.state.display}
        </div>
        <div className="result">
          {this.state.result}
        </div>
        <div className="buttons">
          <button onClick={() => this.handleClick('7')}>7</button>
          <button onClick={() => this.handleClick('8')}>8</button>
          <button onClick={() => this.handleClick('9')}>9</button>
          <button onClick={() => this.handleClick('+')}>+</button>
          <button onClick={() => this.handleClick('4')}>4</button>
          <button onClick={() => this.handleClick('5')}>5</button>
          <button onClick={() => this.handleClick('6')}>6</button>
          <button onClick={() => this.handleClick('-')}>-</button>
          <button onClick={() => this.handleClick('1')}>1</button>
          <button onClick={() => this.handleClick('2')}>2</button>
          <button onClick={() => this.handleClick('3')}>3</button>
          <button onClick={() => this.handleClick('*')}>*</button>
          <button onClick={() => this.handleClick('0')}>0</button>
          <button onClick={() => this.handleClick('.')}>.</button>
          <button onClick={() => this.handleClick('=')}>=</button>
          <button onClick={() => this.handleClick('C')}>C</button>
          <button onClick={() => this.handleClick('⌫')}>⌫</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
