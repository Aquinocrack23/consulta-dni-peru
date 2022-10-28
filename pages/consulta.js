import { useEffect, useState } from 'react'

const Consulta = () => {

  const [userData, setUserData] = useState({});
  const [dniValue, setDniValue] = useState('');

  const fetchData = async (dni) => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       "usuario": "0",
       "app": "33",
       "ip": "0.0.0.0",
       "dni": dni
     });
     
     let response = await fetch("https://api.municallao.gob.pe/pide/public/v1/reniec/dni/buscar", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     return response.json();
  }     

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData(dniValue).then((data) => {
      setUserData(data.consultarResponse.return.datosPersona);
    });
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);


  return (
    <>
      <div >
        <div id="consulta">
          <img src={"data:image/png;base64," + userData.foto } alt="Imagen" />
          
          <p><b>Nombres:</b> {userData.prenombres}</p>
          <p><b>Apellidos:</b> {userData.apPrimer} {userData.apSegundo}</p>
          <p><b>Estado Civil:</b> {userData.estadoCivil}</p>
          <p><b>Dirección: </b> {userData.direccion}</p>
          <p><b>Ubigeo: </b> {userData.ubigeo}</p>
          <p><b>Restricción: </b> {userData.restriccion}</p>
          
          
            <p>Ingrese dni</p>
            <input id="texto" type="text" onChange={(e) => setDniValue(e.target.value)} ></input>
        
          
          <input id="boton" type="button" value="Buscar" onClick={handleSubmit} />
          
        </div>
      </div>
    </>
  )
}

export default Consulta