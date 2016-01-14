
function Character(name){
	this.name = name;
	this.armor = 10;
	this.hitpoints = 5;
	
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
		var modifier = this.modifier("strength") + Math.floor(this.level / 2);
		if (roll + modifier >= target.armor) {			
			damage = 1;
			if (roll == 20){
				damage *= 2;
				modifier *=2;				
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
			this.hitpoints += 5 + this.modifier("constitution");
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
			if(ret = setAbility(value, "dexterity")){
				this.armor += this.modifier("dexterity");
			};
			return ret;
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

