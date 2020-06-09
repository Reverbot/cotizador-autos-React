import React, {useState} from 'react';
import Header from './Components/Header'
import Formulario from './Components/Formulario'
import Resumen from './Components/Resumen'
import Resultado from './Components/Resultado'
import Spinner from './Components/Spinner'
import styled from '@emotion/styled'

const Contenedor = styled.div`
  max-width: 600px;
  margin : 0 auto;
`
const ContenedorFormulario = styled.div`
  background-color: #fff;
  padding: 3rem;
`

function App() {

  const [resumen, guardarResumen] = useState({
    cotizacion : 0,
    datos : {
      marca : "",
      year : "",
      plan : ""
    }
  })
  const [cargando, guardarCargando] = useState(false)

  //extraer datos
  const {datos, cotizacion} = resumen

  return (
    <Contenedor>
      <Header 
        titulo="Cotizador de autos"
      />
      <ContenedorFormulario>
        <Formulario
            guardarResumen={guardarResumen}
            guardarCargando={guardarCargando}
        />
        {cargando ? <Spinner /> : null}
        
        

        {!cargando 
        ?   <div>
              <Resumen datos={datos}/>
              <Resultado cotizacion={cotizacion} />
           </div>
        : null  }
       
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
