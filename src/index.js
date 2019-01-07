import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function hsb2hsl([h, s, b]) {
  s = s / 100;
  b = b / 100;

  const l = (2 - s) * b / 2;
  const s2 = l && l < 1 ? s * b / (l < 0.5 ? l * 2 : 2 - l * 2) : s;
  return [h, Math.floor(s2 * 100), Math.floor(l * 100)];
}

function range(set) {
  return e => {
    const n = parseInt(e.target.value, 10);

    set(n);
  };
}

function text(set) {
  return e => {
    const v = e.target.value.trim();
    const [s] = v.match(/\d{1,3}/) || ['0'];
    const n = parseInt(s, 10);

    if (n < 361 && n >= 0) {
      set(n);
    }
  };
}

function App() {
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [b, setB] = useState(0);

  const hsl = hsb2hsl([h, s, b]);

  return (
    <React.Fragment>
      <div>
        <label htmlFor="hue">Hue
          <input type="range" name="hue" min="0" max="359" step="1" onChange={range(setH)} value={h} />
          <input type="text" onChange={text(setH)} value={h} />
        </label>
      </div>
      <div>
        <label htmlFor="saturation">Saturation
          <input type="range" name="saturation" min="0" max="100" step="1" onChange={range(setS)} value={s} />
          <input type="text" onChange={text(setS)} value={s} />
        </label>
      </div>
      <div>
        <label htmlFor="brightness">Brightness
          <input type="range" name="brightness" min="0" max="100" step="1" onChange={range(setB)} value={b} />
          <input type="text" onChange={text(setB)} value={b} />
        </label>
      </div>
      <p>hsl({hsl[0]}deg, {hsl[1]}%, {hsl[2]}%)</p>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('__react-root'));
