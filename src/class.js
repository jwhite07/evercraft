function Class(name){
	this.name = name;
	this.rollBonusDivisor = 2;
	this.hitPointsPerLevel = 5;
	this.critHitMultiplier = 2;
	this.dexterityArmorMod = false;
	this.attackModifierAbility = "Strength";
	this.possibleAlignments = ["Good", "Neutral", "Evil"];
	this.baseArmorMod = [];
}