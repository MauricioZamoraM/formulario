import React from 'react'
import { Label, Input, LeyendaError, IconoValidacion, GroupInput } from '../Elementos/Formularios'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
export const ComponentInput = ({ tipo, name, placeholder, id, leyendaError, expresionRegular, estado, cambiarEstado, funcion }) => {
  //Cuando ocurra un cambio en el input se ejecuta esta función,
  const onChange = (e) => {
    //Esta función va a cambiar de estado y lo hace agregando un nuevo objeto que contiene las propiedades del estado,
    //por ultimo le decimos que queremos que la propiedad campo tenga que lo tenemos en el imput.
    cambiarEstado({ ...estado, campo: e.target.value });
  }

  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(estado.campo)) {
        cambiarEstado({ ...estado, valido: 'true' });
      } else {
        cambiarEstado({ ...estado, valido: 'false' });
      }
    }
    //si existe una funcion ejecute la funcion
    if(funcion){
      funcion();
    }
 
  }

  return (
    <div>
  

      <Label
        htmlFor={name}
        valido={estado.valido}
      >{name}
      </Label>

      <GroupInput>
        <Input
          type={tipo}
          placeholder={placeholder}
          id={id}
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion} onBlur={validacion}
          valido={estado.valido}
        >
   
        </Input>

        <IconoValidacion
          icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle}
          valido={estado.valido}
        />
      </GroupInput>

      <LeyendaError
        valido={estado.valido}
      >{leyendaError}
      </LeyendaError>
    </div>

  )
}


