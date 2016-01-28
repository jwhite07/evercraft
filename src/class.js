function Class(name){
	this.name = name;
	this.hitPointsPerLevel = 5;
	this.critHitMultiplier = 2;
	this.ignoreOpponentDex = false;
	this.attackModifierAbility = "Strength";
	this.possibleAlignments = ["Good", "Neutral", "Evil"];
	this.baseArmorMod = [];
	this.baseDamage = 1;
	this.rollBonusOnLevelAmount = 1;
	this.rollBonusLevelDivisor = [2];
	this.AlignmentBonuses = [];
}