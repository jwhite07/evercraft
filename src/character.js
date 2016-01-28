
function Character(name, charClass){
	this.class = charClass || new Class("Default");
	this.name = name;
	this.armor = 10
	
	
	
	this.hitpoints = this.class.hitPointsPerLevel;
	this.attackRollBonus = 0;
	
	var abilities = {
		"strength": 10,
		"dexterity": 10,
		"constitution": 10,
		"wisdom": 10,
		"intelligence": 10,
		"charisma": 10
	}
	this.xp = 0;
	this.level = 1;
	this.align = function(align){
		if (align == "Good" || align == "Neutral" || align == "Evil") {
			this.alignment = align;
			return true;
		} else {
			return false;
		}
	}
	this.attack = function (target, roll) {
		var modifier = this.modifier("strength") + this.attackRollBonus;
		var armorMod = target.modifier("dexterity");
		if (this.class.ignoreOpponentDex){
			if (armorMod >= 0){
				armorMod = 0;
			}
		}
		if (roll + modifier >= target.armor + armorMod) {			
			damage = 1;
			if (roll == 20){
				damage *= this.class.critHitMultiplier;
				modifier *= this.class.critHitMultiplier;				
			}
			if ((modified_damage = damage + modifier) < 1) {
				modified_damage = 1;
			} 
			target.hitpoints -= modified_damage;
			this.addXp(10);
			return true;			
		} 
		else {
			return false;
		}
	}
	this.addXp = function (add){
		if (this.xp - this.level * 1000 + add >= 0){
			this.level += 1;
			this.hitpoints += this.class.hitPointsPerLevel + this.modifier("constitution");
			for (i=0; i<this.class.rollBonusLevelDivisor.length; i++) {
				if (this.level % this.class.rollBonusLevelDivisor[i] == 0){
					this.attackRollBonus += this.class.rollBonusOnLevelAmount;
				}
			}
		}
		
		this.xp += add;
	}
	this.dead = function () {
		if (this.hitpoints <= 0){
			return true;
		}else{
			return false;
		}
	}
	
	this.modifier = function (ability) {
		return (Math.floor(abilities[ability] / 2 ))-5;
	}
	
	var setAbility = function(value, ability){
		if (value <= 20 && value >= 1){
			return abilities[ability] = value;
		}else{
			return false;
		}
	}
	this.strength = function (value){
		if (value === undefined){
			return abilities["strength"];
		}else{
			return setAbility(value, "strength");
		}
	}
	this.dexterity = function (value){
		if (value === undefined){
			return abilities["dexterity"];
		}else{
			return setAbility(value, "dexterity")
				
		}
	}
	this.constitution = function (value){
		if (value === undefined){
			return abilities["constitution"];
		}else{
			if (ret = setAbility(value, "constitution")){
				this.hitpoints += this.modifier("constitution")
				if (this.hitpoints < 1){
					this.hitpoints = 1;
				}
			}
			return ret
		}
	}
	this.wisdom = function (value){
		if (value === undefined){
			return abilities["wisdom"];
		}else{
			return setAbility(value, "wisdom");
		}
	}
	this.intelligence = function (value){
		if (value === undefined){
			return abilities["intelligence"];
		}else{
			return setAbility(value, "intelligence");
		}
	}
	this.charisma = function (value){
		if (value === undefined){
			return abilities["charisma"];
		}else{
			return setAbility(value, "charisma");
		}
	}
	
	
}

