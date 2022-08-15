import { HtmlBuilder } from "./htmlBuilder.js";
import { RacesIntializer } from "./racesInitializer.js";
import { ClassesInitializer } from "./classesInitializer.js";
import { startNameModal } from "./functions.js";

//se setean razas y clases en el html para que el jugador elija
const htmlBuilder = new HtmlBuilder();
const racesInitializer = RacesIntializer.getSingleton().getInstance();
console.log(racesInitializer);
racesInitializer.initializeRaces();
htmlBuilder.setHtmlRaces(racesInitializer.getRaces());
const classesInitializer = new ClassesInitializer();
classesInitializer.initializeClasses();
htmlBuilder.setHtmlCharacterClasses(classesInitializer.getClasses());

const characters = localStorage.getItem("characters");

//si en el storage hay personajes creados, los carga para elegir o crear uno nuevo (ya está en el html)
if(characters){
    const newCharOption = document.getElementById("newCharacter");
    newCharOption.onclick = () => startNameModal();

    const characterList = document.getElementById("characterList");
    const characterListSubtitle = document.createElement("h2");
    characterListSubtitle.innerText = "Choose your character!";
    characters.array.forEach(element => {
        const newChar = document.createElement("span");
        newChar = `<div id="${element.name}">
                        <img src="${element.img}" alt="Choose your character: ${element.name}">
                        <h3>${element.name}</h3>
                    </div>`

        //al elegir un personaje arma la hoja
        newChar.onclick = () => {
            const characterListModal = document.getElementById("charactersListModal");
            characterListModal.style.display = "none";

            htmlBuilder.setCharacterInfo(newChar);
            htmlBuilder.setHtmlAbilities(newChar.abilities,newChar.characterClass)
            htmlBuilder.setHtmlSkills(newChar.skills);
        }
        characterList.appendChild(newChar);
    });
}
//si no hay personajes creados pasa directamente a la creación
else{
    startNameModal();

    const nameModalButton = document.getElementById("modalNameButton")
        nameModalButton.onclick = ()=> {
        nameModal.style.display = "none";
        classModal.style.display = "block";
    }

    let choosedClass = document.getElementById("characterClass");
    choosedClass.onchange = ()=>  {
        let selectedClass =choosedClass.options[choosedClass.selectedIndex];
        let finalClass = classesInitializer.getClasses().find( co => co._name == selectedClass.value);

        htmlBuilder.setSkillProficiences(finalClass);
    }
}


