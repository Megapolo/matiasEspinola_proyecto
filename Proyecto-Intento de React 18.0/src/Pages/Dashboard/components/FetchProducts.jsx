import React, { useState } from 'react';
import { useEffect } from 'react';

    const Item = ({id, categoria, fabricante, images, nombre, precio}) => {
         return  (
         <a href={`http://localhost:3000/admin/products/edit/${id}`} target='_blank' className='Articulo'>
            <article key={id} >
                <img src={`http://localhost:3000${images[0].name}`} alt={nombre} className='articleImage' />
                <h3 className='articleName' >{nombre}</h3>
                <p className='articleFab' >{fabricante}</p>
                <div className='articleCateg'>
                <p>Categoría</p>
                <p>{categoria.name}</p>
                </div>
                <p className='articlePrice' >Precio: ${precio}</p>
            </article>
        </a>
         )
        }

export const FetchProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/all');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.data); // Guardamos el array directamente
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(()=> {
    fetchProducts()
  }, [])
  

  return (
    <>
      {products.map(e => 
        <Item key={e.id} id={e.id} categoria={e.categoria} fabricante={e.fabricante} images={e.images} nombre={e.nombre} precio={e.precio}/>
      )}
    </>
  );
};