import React from 'react'
import {Mayuscula} from '../helpers'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'


const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838f;
    color: #fff;
    margin-top: 1rem;
`

const Resumen = ({datos}) => {

    //extraer datos
    const { marca, year, plan } = datos 

    if(marca === "" || year === "" || plan === ""){
        return null;
    }

    return ( 
       <ContenedorResumen>
            <h2>Resumen de Cotizacion</h2>
            <ul>
                <li>Marca: {Mayuscula(marca)}</li>
                <li>Plan: {Mayuscula(plan)}</li>
                <li>Año: {Mayuscula(year)}</li>  
            </ul>
       </ContenedorResumen>
     );
}

Resumen.propTypes = {
    datos : PropTypes.object.isRequired
}

export default Resumen;