//Debemos escuchar el evento submit para guardar los cambios (ya sea para editar o crear un personaje)
import getDataFetch from "../helpers/getData.js";
import postDataFetch from "../helpers/postData.js";
import putDataFetch from "../helpers/putData.js";

export const submitForm = async (form, url, editForm) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const infoHouses = {};
    const valuesForm = Object.values(form);

    valuesForm.forEach((valueInput) => {
      if (valueInput.id) {
        infoHouses[valueInput.id] = valueInput.value;
      }
    });

    console.log(infoHouses);
    //Para prevenir que se cree o se edite un personaje con información faltante

    //-- Capturamos todas las labels presentes en el documento
    const labelsNodeList = document.querySelectorAll("label");

    //---Convertir ese nodeList en un array

    const arrayLabels = [...labelsNodeList];

    console.log(arrayLabels);

    const noHayCamposVacios = validacionCamposForm(arrayLabels, infoHouses);
    //Acción para editar
    if (noHayCamposVacios && editForm) {
      await putDataFetch(url, infoHouses);
      Swal.fire(
        "¡Excelente!",
        "Se ha actualizado exitosamente la casa",
        "success"
      ).then(() => {
        window.location.href = "../index.html";
      });
    }

    //Acción para crear

    if (noHayCamposVacios && !editForm) {
      await postDataFetch(url, infoHouses);
      Swal.fire(
        "¡Excelente!",
        "Se ha creado exitosamente la casa",
        "success"
      ).then(() => {
        //Limpiar cada campo del formulaio
        valuesForm.forEach((input) => {
          if (input.id) {
            input.value = "";
          }
        });
      });
    }
  });
};

//----Vamos a construir una función que nos evite guardar información con campos vacíos en un formulario

const validacionCamposForm = (arrayLabels, infoHouses) => {
  //----Mapeamos o creamos un nuevo arrays con las keys de las labels

  const keyLabels = arrayLabels.map((key) => ({
    labelName: key.innerHTML,
    keyName: key.getAttribute("for"),
  }));

  console.log(keyLabels);

  let keyStr = "";
  for (const key in infoHouses) {
    const propertyHouse =infoHouses[key];

    if (!propertyHouse) {
      const labelFound = keyLabels.find((label) => label.keyName === key);
      keyStr += labelFound.labelName + ", ";
    }
  }
  console.log(keyStr);

  if (keyStr) {
    const numberInputsVacios = cantidadCaracter(",", keyStr);
    console.log(numberInputsVacios);

    keyStr = keyStr.slice(0, -2);

    let messenger =
      numberInputsVacios === 1
        ? `El campo ${keyStr} no se encuentra diligenciado`
        : `Los campos ${keyStr} no se encuentran diligenciados`;
    alert(messenger);
    return false;
  }
  return true;
};

const cantidadCaracter = (caracter, string) => {
  const textString = string.split(caracter);
  const arrayCaracters = textString.filter((str) => str !== " ");
  console.log(arrayCaracters);
  return arrayCaracters.length;
};
