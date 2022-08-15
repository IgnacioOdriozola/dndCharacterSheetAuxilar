import {startBuilder} from "./functions.js"

class HtmlBuilder{
    constructor(){}

    setHtmlRaces(races){
        let racesList = document.querySelector("#characterRace");
        races.forEach( race => {
            let newRace = document.createElement("option");
            newRace.innerText = race._name;
            newRace.className = "characterRace";
            newRace.setAttribute("value",race._name);
            racesList.appendChild(newRace)
        })
    }

    setHtmlCharacterClasses(characterClasses){
        let classesList = document.querySelector("#characterClass");
        characterClasses.forEach( characterClass => {
            let newClass = document.createElement("option");
            newClass.innerText = characterClass._name;
            newClass.className = "characterClass";
            newClass.setAttribute("value",characterClass._name);
            classesList.appendChild(newClass)
        })
    }

    setSkillProficiences(choosedClass){
        const characterSheetAbilities = document.getElementById("classModalContent");
        const skillsSelectable = document.createElement("div");
        skillsSelectable.setAttribute("id","skillsSelectable")

        for(let i=0;i<choosedClass._chooseableSkills;i++){
            const skillSelectable = document.createElement("select");
            skillSelectable.setAttribute("name","skill"+i)
            choosedClass.getSkills().forEach(skill => {
                let newSkill = document.createElement("option");
                newSkill.innerText = skill.name;
                newSkill.className = "characterRace";
                newSkill.setAttribute("value",skill.name);
                skillSelectable.appendChild(newSkill);
            })
            skillsSelectable.appendChild(skillSelectable);
        }
        const skillSelectableButton = document.createElement("button");
        skillSelectableButton.setAttribute("id","skillSelectableButton");
        skillSelectableButton.setAttribute("value","Ok");
        skillSelectableButton.innerText = "Ok";
        skillsSelectable.appendChild(skillSelectableButton)
        characterSheetAbilities.appendChild(skillsSelectable);

        skillSelectableButton.onclick = () => startBuilder(choosedClass)
    }

    setAbilitiesChoosables(diceThrows){
        const dicesModal = document.getElementById("dicesThrower");
        const subtitle = document.createElement("h2");
        subtitle.innerText = "Rolls";
        dicesModal.appendChild(subtitle);
        const dicesDiv = document.createElement("div");
        dicesDiv.setAttribute("class","dicesDiv");
        let i=0;
        diceThrows.forEach(dt => {
            const throwContainer = document.createElement("div")
            throwContainer.setAttribute("class","throwContainer")
            const diceThrow = document.createElement("span");
            diceThrow.setAttribute("class","dicesScore");
            diceThrow.setAttribute("id","diceThrow"+i);
            diceThrow.innerText = dt;
            
            throwContainer.appendChild(diceThrow);
            dicesDiv.appendChild(throwContainer);

            const abilitiesSelector = document.createElement("select");
            abilitiesSelector.innerHTML = `
            <option value="strenght">Strenght</option>
            <option value="dexterity">Dexterity</option>
            <option value="constitution">Constitution</option>
            <option value="intelligence">Intelligence</option>
            <option value="wisdom">Wisdom</option>
            <option value="charisma">Charisma</option>`;

            abilitiesSelector.setAttribute("id","abilitiesSelector"+i);
            
            throwContainer.appendChild(abilitiesSelector)
            dicesDiv.appendChild(throwContainer);
            i++;
        })
        const abilitiesConfirmationButton = document.getElementById("abilitiesConfirmation")
        abilitiesConfirmationButton.style.display = "block"
        dicesDiv.appendChild(abilitiesConfirmationButton);
        dicesModal.appendChild(dicesDiv);        
    }
}

export {HtmlBuilder}