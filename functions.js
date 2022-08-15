import { CharacterBuilder } from "./characterBuilder.js";
import { RacesIntializer} from "./racesInitializer.js"

function startNameModal(){
    const choosedRace = document.getElementById("characterRace");
    const characterName = document.getElementById("characterName");
    let change = () => {
        let selectedRace = choosedRace.options[choosedRace.selectedIndex].value;
        if(characterName.value.trim()!= "" &&characterName.value!= null && selectedRace != "default"){
            document.getElementById("modalNameButton").style.display= "block";
            return selectedRace;
        }    
    }

    const characterListModal = document.getElementById("charactersListModal");
    characterListModal.style.display = "none";

    const nameModal = document.getElementById("nameModal");
    nameModal.style.display = "block";


    characterName.onchange =  change;
    choosedRace.onchange =  change;

   
}

function startBuilder(characterClass){
    var classModal = document.getElementById("classModal");
    classModal.style.display = "none";
    let choosedSkills = document.getElementById("skillsSelectable")

    let skillAcumulator = [];
    for(let i =0;i<choosedSkills.childNodes.length-1;i++){
        let skillProficiency = document.getElementsByName("skill"+i)[0];
        skillAcumulator.push(skillProficiency.options[skillProficiency.selectedIndex].value)
    }
    const choosedRace = document.getElementById("characterRace");
    let raceName =  choosedRace.options[choosedRace.selectedIndex].value;
    let finalRace = RacesIntializer.getInstance().getRaces().find( ro => ro._name == raceName);
    console.log(RacesIntializer.getInstance().getRaces());
    console.log(raceName);
    let builder = new CharacterBuilder(characterClass,finalRace);
    builder.throwDices();

    const abilitiesConfirmation = document.getElementById("abilitiesConfirmation")
        abilitiesConfirmation.onclick = () => {
            document.getElementById("dicesModal").style.display = "none";
            builder.setAbilitiesScores();
            builder.setSkillsScores(2,skillAcumulator,_basicSkills);
    }
}


export {startNameModal, startBuilder}