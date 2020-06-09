import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../helpers'

import styled from '@emotion/styled'

const Campo = styled.div`
    display : flex;
    margin-bottom : 1rem;
    align-items: center;
`

const Label = styled.label`
    flex: 0 0 100px;
`

const Select = styled.select`
    display : block;
    width : 100%;
    padding : 1rem;
    border : 1px solid #e1e1e1;
    -webkit-appearance : none;
`

const InputRadio = styled.input`
    margin : 0 1rem;
`

const Boton = styled.button`
    background-color: #00838f;
    font-size : 10px;
    width : 100%;
    padding : 1rem;
    color : #fff;
    text-transform : uppercase;
    font-weight : bold;
    border : none;
    transition: background-color .3s ease;
    margin-top : 2rem;

    &:hover{
        background-color : #26c6da;
        cursor: pointer;

    }
`

const Error = styled.div`
    background-color: red;
    color : white;
    padding: 1rem;
    width : 100%;
    text-align: center;
    margin-bottom : 20px;
`


const Formulario = ({guardarResumen, guardarCargando}) => {

    //creamos el state
    const [datos, guardarDatos] = useState({
        marca : "",
        year : "",
        plan: ""
    })
    const [error, guardarError] = useState(false)

    //extraemos los campos del state
    const {marca, year, plan} = datos

    //guardar los datos del formulario y guardarlos en el state
    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario de submit
    const cotizarSeguro = e => {
        e.preventDefault()

        if(marca.trim() === "" || year.trim() === "" || plan.trim() === ""){
            guardarError(true)
            return
        }

        guardarError(false)

        //base
        let resultado = 2000

        //obtener diferencia de años
       const diferencia =  obtenerDiferenciaYear(year)

        //por cada año se le resta 3%
        resultado -= parseInt(((diferencia * 3 ) * resultado) / 100)
        

        resultado = calcularMarca(marca) * resultado
      
        //amricado 15
        //asiatico 5%
        //Europe 30% 

        //basico 20%
        //Completo 50%
        const incrementoPlan = obtenerPlan(plan)
        resultado = parseFloat( resultado * incrementoPlan ).toFixed(2)
        //total
        guardarCargando(true) 
        setTimeout(() => {

            //elimina el spinner
            guardarCargando(false) 

            //pasa la informacion al componente principal 
            guardarResumen({
                cotizacion : Number(resultado),
                datos
            })
        }, 2000)

        
    }

    return ( 
        <form action="" onSubmit={cotizarSeguro}>
                {error ? <Error>Todos los Campos son obligatorios</Error>: null}
            <Campo>
                <Label>Marca</Label>
                <Select 
                    name="marca" 
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">--Seleccione--</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label htmlFor="">Año</Label>
                <Select 
                    name="year" 
                    value={year}
                    onChange={obtenerInformacion}
                    >
                <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label htmlFor="">Plan</Label>
                 <InputRadio 
                 type="radio"
                 name="plan"
                 value="basico"
                 onChange={obtenerInformacion}
                 checked = {plan === "basico"}
                 />   Basico 
                  <InputRadio 
                 type="radio"
                 name="plan"
                 value="Completo"
                 onChange={obtenerInformacion}
                 checked = {plan === "Completo"}
                 />   Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
     );
}

Formulario.propTypes= {
    guardarResumen : PropTypes.func.isRequired,
    guardarCargando : PropTypes.func.isRequired
}
 
export default Formulario;
