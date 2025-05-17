import { useEffect, useState } from "react";

export const Header = () => {
  const [usuario, setUsuario] = useState(null); // Usamos null como estado inicial

  const userFetch = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/1", {
        credentials: "include", // Esto es CRUCIAL para que se envíe la cookie de sesión
      });

      if (!response.ok) {
        throw new Error("Error en el fetch");
      }

      const data = await response.json();

      console.log("Log de data:", data);

      // Redirigimos si no es admin (rolId !== 1)
      if (!data || data.rolId !== 1) {
        window.location.href = "http://localhost:3000/products";
        return;
      }

      setUsuario(data); // Solo seteamos si pasa la validación

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userFetch();
  }, []);

  useEffect(() => {
    document.title = 'Mattec - Admin'
  })

  const DarkMode = () => {};

  // Evitamos renderizar hasta tener el usuario
  if (!usuario) return null;
 
  return (
    <header>
      <div id="upper-bar">
        <a href="/" className="imagen">
          <img
            src="http://localhost:3000/images/Logo-banner/Logo.jpg"
            alt="Logo"
            id="logo"
          />
        </a>

        <form
          action="http://localhost:3000/products/search"
          method="get"
          id="barra"
        >
          <input
            id="search-bar"
            name="search"
            type="text"
            placeholder="Buscar..."
          />
          <button type="submit" id="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <div style={{ position: 'relative', width: '80px', height: '80px' }}>
          <a href={`http://localhost:3000/users/profile/${usuario.id}`}>
            <img
              src={`http://localhost:3000${usuario.img}`}
              alt="Avatar"
              id="avatar"
              style={{
                position: 'absolute',
                top: 0,
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </a>
        </div>

        <a href="#" id="carrito">
          <i className="fa-solid fa-cart-shopping"></i>
        </a>
        </div>
        <nav className="navbar">
            <ul>
                <li><i className="fa-solid fa-bars"></i></li>
                <li><a href="/">Inicio</a></li>
                <li><a href="http://localhost:3000/products">Productos</a></li>
                <li><a href="#">Contactos</a></li>
                <li>
                <div onClick={DarkMode}>
                    <i className="fa-solid fa-toggle-off button-on-off"></i>
                    <i className="fa-solid fa-toggle-on button-on-off hidden"></i>
                    Modo Oscuro
                    </div>
                </li>
                </ul>
        </nav>
    </header>

  );
};

export default Header;