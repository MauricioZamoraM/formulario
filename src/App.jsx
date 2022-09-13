
import './App.css';
import { useState } from 'react';
import { Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError } from './Elementos/Formularios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { ComponentInput } from './Components/ComponentInput';
// <!--  Comentar: CTRL K + CTRL C
//       Descomentar: CTRL K + CTRL U  
//       Identar: SHIFT + ALT + F
//       Salto de linea: CTRL + Enter 
//       Mover lineas: ALT + ↑ 
//       Duplicar lineas: SHIFT + ALT + ↓ 
//       Eliminar linea: CTRL + SHIFT + K
//       Corto linea: CTRL + X 
//       Seleccionar linea: CTRL + L
//       Multicursores: CTRL + ALT + ↓ 
//       Abrir ventanas: ALT +  
//       Abreviacion Emmet: section.home>(nav.menu>ul>li.elemento${lista$}*6)(.info>h2.nombre{Mauricio}+p.texto)(.picture>img.imagen1)-->

function App() {
  //campo: tiene el valor que ingresa el usuario en el input
  const [usuario, cambiarUsuario] = useState({ campo: '', valido: null });
  const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
  const [contraseña, cambiarContraseña] = useState({ campo: '', valido: null });
  const [contraseña2, cambiarContraseña2] = useState({ campo: '', valido: null });
  const [correo, cambiarCorreo] = useState({ campo: '', valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: '', valido: null });
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);
  const expresiones = {
    usuario: /^[a-zA-Z0-9-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const validarPassword2 = () => {
    if (contraseña.campo.length > 0) {
      if (contraseña.campo !== contraseña2.campo) {
        cambiarContraseña2((prevState) => {
          return { ...prevState, valido: 'false' }
        });
      } else {
        cambiarContraseña2((prevState) => {
          return { ...prevState, valido: 'true' }
        });
      }
    }
  }

  const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (usuario.valido === 'true' &&
      nombre.valido === 'true' &&
      contraseña.valido === 'true' &&
      contraseña2.valido === 'true' &&
      correo.valido === 'true' &&
      telefono.valido === 'true' &&
      terminos

    ) {
      cambiarFormularioValido(true);
      cambiarUsuario({campo: '', valido: null})
      cambiarNombre({campo: '', valido: null})
      cambiarContraseña({campo: '', valido: null})
      cambiarContraseña2({campo: '', valido: null})
      cambiarCorreo({campo: '', valido: null})
      cambiarTelefono({campo: '', valido: null})
 
    } else {
      cambiarFormularioValido(false);
    }
  }
  return (
    <div className="App">
      <div className="main">
        <Formulario action='' onSubmit={onSubmit}>
          <ComponentInput
            tipo="text"
            name='Usuario'
            placeholder='Ingresa el usuario'
            id="usuario"
            leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras, y gion bajo."
            expresionRegular={expresiones.usuario}
            estado={usuario}
            cambiarEstado={cambiarUsuario}
          />

          <ComponentInput
            tipo="text"
            name='Nombre'
            placeholder='Ingresa el nombre'
            id="nombre"
            leyendaError=" El nombre solo puede contener letras y espacios."
            expresionRegular={expresiones.nombre}
            estado={nombre}
            cambiarEstado={cambiarNombre}
          />

          <ComponentInput
            tipo="password"
            name='Contraseña'
            placeholder='Ingresa la contraseña'
            id="contraseña"
            leyendaError="La contraseña debe ser de 4 a 12 digitos."
            expresionRegular={expresiones.password}
            estado={contraseña}
            cambiarEstado={cambiarContraseña}
          />
          <ComponentInput
            tipo="password"
            name='Repetir Contraseña'
            placeholder='Ingresa la contraseña nuevamente'
            id="repcontraseña"
            funcion={validarPassword2}
            leyendaError="Ambas contraseñas deben ser iguales"
            estado={contraseña2}
            cambiarEstado={cambiarContraseña2}
          />
          <ComponentInput
            tipo="email"
            name='Correo Electrónico'
            placeholder='Ingresa el correo'
            id="correo"
            leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
            expresionRegular={expresiones.correo}
            estado={correo}
            cambiarEstado={cambiarCorreo}
          />
          <ComponentInput
            tipo="text"
            name='Teléfono'
            placeholder='Ingresa el número de teléfono'
            id="telefono"
            leyendaError="El teléfono solo puede contener numeros y 14 digitos como máximo"
            expresionRegular={expresiones.telefono}
            estado={telefono}
            cambiarEstado={cambiarTelefono}
          />


          <ContenedorTerminos>
            <Label>
              <input type="checkbox" name='terminos' id='terminos' checked={terminos} onChange={onChangeTerminos}></input>
              Acepto los Terminos y Condiciones
            </Label>
          </ContenedorTerminos>
          {formularioValido === false && <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b>Por favor rellena el formulario correctamente.
            </p>
          </MensajeError>}

          <ContenedorBotonCentrado>
            <Boton type='submit'>Enviar</Boton>
            {formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
          </ContenedorBotonCentrado>
        </Formulario>

      </div>
    </div>
  );

}


export default App;
