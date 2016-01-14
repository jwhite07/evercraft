describe("Class", function() {
	beforeEach(function(){
		heroClass = new Class("Fighter") 
	})
	
	when("a class is created it should have some default values", function(){
		it("should have a name", function (){
			expect(heroClass.name).toBe("Fighter")
		})
		it("should have a modifier for attack roll bonus level divisors that defaults to 2", function(){
			expect(heroClass.rollBonusDivisor).toEqual(2);
		});
		it("should have hitpoints value that defaults to 5", function () {
			expect(heroClass.hitPointsPerLevel).toEqual(5);
		});
		it("should have damage multiplier for critical hits that default to 2", function () {
			expect(heroClass.critHitMultiplier).toEqual(2);
		});
		it("should have flag to set dexterity/armor modifier that defaults to false", function () {
			expect(heroClass.dexterityArmorMod).toBe(false);
		});
		it("should have an ability that's added attack calculations that defaults to Strength", function (){
			expect(heroClass.attackModifierAbility).toBe("Strength");
		});
		it("should have an array of possible alignments", function () {
			expect(heroClass.possibleAlignments).toEqual(["Good", "Neutral", "Evil"]);
		});
		it("should have a base damage for attack of 1", function () {
			expect(heroClass.baseDamage).toEqual(1);
		}) 
		it("should have a base armor modifier of dexterity with possible additional modifiers", function () {
			expect(heroClass.baseArmorMod).toEqual([]);
		})
		
	});
});