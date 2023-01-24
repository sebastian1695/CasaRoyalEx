import getDataFetch from "../helpers/getData.js";
import postDataFetch from "../helpers/postData.js";
import putDataFetch from "../helpers/putData.js";
import { submitForm } from "../modules/submitForm.js";

//capturar formulario


const urlHouse = "http://localhost:3000/Houses"
console.log(urlHouse);

const form = document.querySelector(".form");

const keyForm = Object.values(form);
console.log(keyForm);

//form para crear y editar

const editFormStr = sessionStorage.getItem("editHouse")
? JSON.parse(sessionStorage.getItem("editHouse"))
: "";

const editForm = editFormStr ? parseInt(editFormStr) : null;
//para que actualice el titulo de acuerdo con la acción que vamos a realizar

const title = document.querySelector(".title");
const submitButton = keyForm[keyForm.length - 2];
console.log(submitButton);

submitButton.innerHTML = editForm ? "send update" : "Creater House";
//este evento permite rellenear los campos del form 
document.addEventListener("DOMContentLoaded", async ()=> {
   let editHouse = {};
   const url =editForm ? `${urlHouse}/${editForm}`: urlHouse;
   
   try{
    if(editForm){
        editHouse = await getDataFetch(url);
        console.log(editHouse);

        title.innerText = editForm
        ? `UPDATE HOUSE OF ${editHouse.kind}`
        : "Create new house to list";

        keyForm.forEach(valueInput => {
            if (valueInput.id){
                valueInput.value = editHouse[valueInput.id];
                console.log(valueInput.value);
            }
            
        });
    }
    await submitForm(form, url, editForm);

   }catch (error){
    console.log(error);
    alert(error)
   }
});

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log("Esto es un submit");


  

})  