import React from 'react';

import './App.css';

import data from './data.json';

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    console.log(data)
  }

  render() {



    return (
      <div className='view' id='index'>
        {data.children.map((f, i) => {
          return (
            <div key={i} className='dir'>
              <h2>{f.name}</h2>
              <div className='files'>
                {f.children.filter(c => c.type === 'file').map((f, i) => {

                  return (
                    <div key={i} className='file'>
                      <img src={`data:image/svg+xml;base64,${window.btoa(f.content)}`} alt={f.name} />
                      <div className='name'>{f.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    );
    
  }
}

export default App;