

import getDataFetch from "../helpers/getData.js";
import deleteDataFetch from "../helpers/deleteData.js";

import { getCategoryFilter } from "../modules/getCategoryFilter.js";
import { printCardsHouses  } from "../modules/printCard.js";
import postDataFetch from "../helpers/postData.js";

// const dataJson = JSON.stringify(incorrectDataJSON);
// console.log(dataJson);
// console.log(typeof dataJson);

const urlHouses = "http://localhost:3000/Houses";

let Houses = [];

const contenedorHouses = document.getElementById("ContenedorCards");

//-----Capturando el input de búsqueda
const search = document.getElementById("search");

//-----Botones de filtrado--------

//------Capturar el primer conjunto de botones-----
const botonAll = document.getElementById("all");
const botonHouses = document.getElementById("house");
const botonDepartments = document.getElementById("department");

//Colocamos todos estos botones en un array
const arrayBotones = [botonAll, botonHouses, botonDepartments];
console.log(Houses);
console.log(contenedorHouses);

document.addEventListener("DOMContentLoaded", async () => {
  sessionStorage.removeItem("editHouse");
  sessionStorage.removeItem("HouseDetails");
  try {
    Houses = await getDataFetch(urlHouses);
    console.log(Houses);

   printCardsHouses(contenedorHouses, Houses);


    //Ejecutamos la función que nos permite filtrar x categoría


  } catch (error) {
    console.log(error);
    alert(error);
  }
});

document.addEventListener("click", async ({ target }) => {
  //Funcionalidad de ir a detalles del personaje
  if (target.classList.contains("card__img")) {
    sessionStorage.setItem("HouseDetails", JSON.stringify(target.id));
    location.href = "./pages/detailsPage.html";
  }
  //Funcionalidad de eliminar un personaje
  if (target.classList.contains("card__delete")) {
    Swal.fire({
      title: "¿Está usted seguro de eliminar?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const idHouseDelete = parseInt(target.name);
        const urlDelete = `${urlHouses}/${idHouseDelete}`;

        try {
          await deleteDataFetch(urlDelete);
          Houses = await getDataFetch(urlHouses);
          printCardsHouses(contenedorHouses, Houses);
        } catch (error) {
          console.log("No se pudo eliminar hay un error" + error);
        }
      }
    });
  }

  //Inicio de la funcionalidad de edición

  if (target.classList.contains("card__edit")) {
    console.log(target.name);
    sessionStorage.setItem("editHouse", JSON.stringify(target.name));
    location.href = "./pages/forms.html";
  }

  //Para agregar a favoritos
  if (target.classList.contains("card__favorite")) {
    const idFavorito = target.name;
    const urlHouseFavorito = `${urlFavoritos}?id=${idFavorito}`;

    const favorito = await getDataFetch(urlHouseFavorito);
    //Obtenemos el objeto
    const favoriteHouse = await getDataFetch(
      `${urlHouses}/${idFavorito}`
    );
    if (favorito.length === 0 && Object.entries(favoriteHouses).length) {
      await postDataFetch(urlHouses, favoriteHouses);
      const data = await getDataFetch(urlFavoritos);
      console.log(data);
    }
  }
});

//Escuchar el evento search del input de búsqueda por nombre
/* search.addEventListener("search", async () => {
  const searchTerm = search.value;
  try {
    if (searchTerm) {
      const datosHouses = await getDataFetch(urlHouses);
      const resultadoBusqueda = datosHouses.filter((house) =>
        house.kind.toLowerCase().includes(searchTerm.toLowerCase())
      );
      printCardsHouses(contenedorHouses, resultadoBusqueda);
    } else {
      const datosHouses = await getDataFetch(urlHouses);
      printCardsHouses(contenedorHouses, datosHouses);
    }
  } catch (error) {
    console.log(error);
  }
});
 */