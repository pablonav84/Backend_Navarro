const socket=io()

socket.on("saludo", (datos)=>{
    console.log(`${datos.emisor} dice: "${datos.mensaje}"`)
})

socket.on("nuevoProducto", datos => {

    let ulProductos = document.getElementById("productos");
    ulProductos.innerHTML +=
      `<li>Categoría: ${datos.category}
      <ul>
        <li>Id: ${datos.id}</li>
        <li>Marca: ${datos.title}</li>
        <li>Descripción: ${datos.description}</li>
        <li>Precio: ${datos.price}</li>
        <button onclick="comprar('${datos.id}', '${datos.description}')">Comprar</button>
      </ul>
       </li>`;
  });

  socket.on("productoEliminado", datos => {
    console.log(datos);
    let ulProductos = document.getElementById("productos");
    ulProductos.innerHTML = ""; // Limpiar el contenido existente antes de agregar nuevos elementos
  
    datos.forEach(dato => {
      let li = document.createElement("li");
      li.innerHTML = `
        Categoría: ${dato.category}
        <ul>
          <li>Id: ${dato.id}</li>
          <li>Marca: ${dato.title}</li>
          <li>Descripción: ${dato.description}</li>
          <li>Precio: ${dato.price}</li>
        </ul>
      `;
  
      let button = document.createElement("button");
      button.innerHTML = "Comprar";
      button.addEventListener("click", () => {
        comprar(dato.id, dato.description);
      });
  
      li.appendChild(button);
      ulProductos.appendChild(li);
    });
  });