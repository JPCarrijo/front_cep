import './App.css';
import React, { useState } from 'react';
import CepConsultado from './CepConsultado';

function App() {
  const [evento, setEvento] = useState([])

  // Impedindo que o formulário faça reload
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log("Nome Recebido: " + data.nome)
    console.log("Cep Recebido: " + data.cep)

    fetch(`http://localhost:3001/?cep=${data.cep}`)
      .then(response => response.json())
      .then(data => {
        const array = convertToArray(data)
        console.log("Array: ",array)
        setEvento(array)
        //console.log('Dados Recebidos: ' + array);
      })
      .catch( error => console.error)
  }
  // Convertendo o Objeto em Array
  const convertToArray = (obj) => {
    const arr = [obj];
    console.log("Conversão em Array: ", arr);
    return arr
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group" id="nome" style={{ marginTop: '5vh' }}>
          <input type="text" name="nome" className="form-control" />
        </div>
        <div className="form-group" id="cep" style={{ marginTop: '5vh' }}>
          <input type="text" name="cep" className="form-control" />
        </div>
        <div>
          <button type="submit" className="btn btn-success" style={{ marginTop: '1vh', marginBottom: '1vh' }}> Consultar Cep</button>
        </div>
      </form>
      <CepConsultado evento={evento} />
    </div>
  );
}

export default App;
