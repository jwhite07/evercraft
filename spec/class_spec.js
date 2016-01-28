describe("Class", function() {
	
	
	when("a class is created it should have some default values", function(){
		beforeEach(function(){
			heroClass = new Class("Fighter") 
		})
		it("should have a name", function (){
			expect(heroClass.name).toBe("Fighter")
		})
		
		it("should have hitpoints value that defaults to 5", function () {
			expect(heroClass.hitPointsPerLevel).toEqual(5);
		});
		it("should have damage multiplier for critical hits that default to 2", function () {
			expect(heroClass.critHitMultiplier).toEqual(2);
		});
		it("should have flag to set dexterity/armor modifier that defaults to false", function () {
			expect(heroClass.ignoreOpponentDex).toBe(false);
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
		it("should have a default attack roll increase for leveling up", function () {
			expect(heroClass.rollBonusOnLevelAmount).toEqual(1);
		})
		it("should have a default level divisor where the attack roll bonus is applied", function () {
			expect(heroClass.rollBonusLevelDivisor).toEqual([2]);
		})
		
		it("should have no default alignment bonus", function () {
			expect(heroClass.AlignmentBonuses).toEqual([]);
		})
		
	});
	when("a player creates a fighter it should do some things", function(){
		beforeEach(function(){
			fighter = new Class("Fighter");
			fighter.rollBonusOnLevelAmount = 1;
			fighter.rollBonusLevelDivisor = [1];
			fighter.hitPointsPerLevel = 10;
			hero = new Character("Fighter", fighter);
			villain = new Character("Villain")
		})
		it("should have 10 hitpoints at level 1", function(){
			expect(hero.hitpoints).toEqual(10);
		})
		when("a fighter gains a level", function(){
			beforeEach(function(){
				hero.addXp(1000)
			})
			it("should gain 10 hit points", function(){
				expect(hero.hitpoints).toEqual(20);
			})
			it("should increase by 1 for every level instead of every other level", function(){
				expect(hero.attackRollBonus).toEqual(1);
				hero.addXp(1000);
				expect(hero.attackRollBonus).toEqual(2);
			});
			it("should have their attack roll bonus added to attack rolls", function(){
				expect(hero.attack(villain, villain.armor-1)).toBe(true);
			})
		})
	})
	when("a player creates a rogue it should do some things", function(){
		beforeEach(function(){
			rogue = new Class("Rogue");
			rogue.critHitMultiplier = 3;
			rogue.ignoreOpponentDex = true;
			hero = new Character("Rogue", rogue);
			villain = new Character("Villain")
		})
		it("should deal triple damage when there is a critical hit", function(){
			expect(hero.attack(villain, 20)).toBe(true);
			expect(villain.hitpoints).toEqual(2);
		})
		it("should hit a dexterity 20 villian with a roll of 10", function(){
			villain.dexterity(20);
			expect(hero.attack(villain, 10)).toBe(true);
		})
		it("should hit a dexterity 1 villian with a roll of 5", function(){
			villain.dexterity(1);
			expect(hero.attack(villain, 5)).toBe(true);
		})
		/*when("a fighter gains a level", function(){
			beforeEach(function(){
				hero.addXp(1000)
			})
			it("should gain 10 hit points", function(){
				expect(hero.hitpoints).toEqual(20);
			})
			it("should increase by 1 for every level instead of every other level", function(){
				expect(hero.attackRollBonus).toEqual(1);
				hero.addXp(1000);
				expect(hero.attackRollBonus).toEqual(2);
			});
			it("should have their attack roll bonus added to attack rolls", function(){
				expect(hero.attack(villain, villain.armor-1)).toBe(true);
			})
		})*/
	})
});