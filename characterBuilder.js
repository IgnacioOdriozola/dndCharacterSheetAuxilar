import { AbilityScore } from "./abilityScore.js";
import { HtmlBuilder} from "./htmlBuilder.js";
import { Skill } from "./characterSkills.js"

class CharacterBuilder{
    constructor(characterClass,race){
        this.classBuilder = characterClass
        this.abilitiesBuilder = [];
        this.skillBuilder = [];
        this.htmlBuilder = new HtmlBuilder()
        this.race = race;
        this.throws = []
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
   }

    //características del personaje segun sus tiradas de dados, raza y clase
    throwDices(){
        const diceModal = document.getElementById("dicesModal");
        diceModal.style.display = "block";

        const dicesButton = document.getElementById("dicesButton");
        let count = 0;

            dicesButton.onclick = ()=>{
                let acum=0;
                for(let i =1; i<4;i++){
                    let throwed = this.getRandomIntInclusive(1,6);
                    const dice = document.getElementById("dice"+i);
                    acum = throwed + acum;
                    dice.setAttribute("src","./src/img/dice"+throwed+".png");
                }
                this.throws.push(acum);  
                count++;                               
                if(count===6) {
                    document.getElementById("dicesDiv").style.display = "none";
                    this.htmlBuilder.setAbilitiesChoosables(this.throws)
                }
                
            }
    } 

    setAbilitiesScores(){
        for(let i =0; i<6;i++){
            const newScore = parseInt(document.getElementById("diceThrow"+i).innerText);
            let ability = document.getElementById("abilitiesSelector"+i);
            ability = ability.options[ability.selectedIndex].value;
            let savingThrow = this.classBuilder.getSavingThrow().some(((st)=>st === ability)); 
            console.log(this.race);
            if(this.race.getAbilitiesScoresIncrease().some(asi => asi.name === ability)){
                let newAbility = new AbilityScore(ability, newScore + this.race.getAbilityScoreIncrease(ability).score,savingThrow);
                this.abilitiesBuilder.push(newAbility);
            }else{
                let newAbility = new AbilityScore(ability, newScore, savingThrow);
                this.abilitiesBuilder.push(newAbility);
            }
        }
    }

    //habilidades del personaje según sus características
    setSkillsScores(proficiencyBonus, proficientSkill,basicSkill){

        basicSkill.forEach((skill)=>{
            let ability = this.abilitiesBuilder.find(ab => ab.name === skill.modifier);
            if(proficientSkill.some(ps => ps === skill.name)){
                let newSkill = new Skill(skill.name,ability.name,ability.getAbilityModifier(),true,false,proficiencyBonus);
                this.skillBuilder.push(newSkill);
            }else{
                this.skillBuilder.push(new Skill(skill.name,ability.name,ability.getAbilityModifier(),false));
            }
        })
    }

    getAbility(ability){return this.abilitiesBuilder.find(iterator => iterator.name == ability)}
}

export {CharacterBuilder}