import { useEffect, useState } from 'react';
import Header from '../Header'; // Asegurate de que el path sea correcto

const FetchUsers = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user');
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };

    getUser();
  }, []);

  return (
    <>
      {usuario ? <Header usuario={usuario} /> : <p>Cargando encabezado...</p>}
    </>
  );
};

export default FetchUsers;