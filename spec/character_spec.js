describe("Character", function() {

  // beforeEach(function() {
 //    setFixtures('<div id="awesome"></div>');
 //  });

  // when("made awesome", function() {
  //
  //   beforeEach(function() {
  //     App.makeAwesome();
  //   });
  //
  //   it("is awesome", function() {
  //     expect(App.awesome()).toBe(true);
  //   });
  //
  //   it("contains awesomeness", function() {
  //     expect($('#awesome')).toContainText("Awesome App is Awesome");
  //   });
  //
  // });
  //
  // when("not made awesome", function() {
  //
  //   it("is not awesome", function() {
  //     expect(App.awesome()).toBe(false);
  //   });
  //
  //   it("does not contain awesomeness", function() {
  //     expect($('#awesome')).not.toContainText("Awesome App is Awesome");
  //   });
  //
  // });
  
  when("a character is created", function() {
	beforeEach(function() {
	
		hero = new Character("Awesome Guy");
	});
  	it("is named Awesome Guy", function(){
  		expect(hero.name).toBe("Awesome Guy");
  	});
  	it("has an Armor Class that defaults to 10", function(){
  		expect(hero.armor).toEqual(10);
  	});
  	it("has default Hit Points of 5", function(){
  		expect(hero.hitpoints).toEqual(5);
  	});
  	it("has default Strength, Dexterity, Constitution, Wisdom, Intelligence and Charisma of 10", function(){
		expect(hero.strength()).toEqual(10);
		expect(hero.dexterity()).toEqual(10);
		expect(hero.constitution()).toEqual(10);
		expect(hero.wisdom()).toEqual(10);
		expect(hero.intelligence()).toEqual(10);
		expect(hero.charisma()).toEqual(10);
	});
  });
  
  when("modifying and ability", function () {
    	beforeEach(function() {
	
    		hero = new Character("Awesome Guy");
    	});
	  it("must be between 1 and 20", function () {
		  expect(hero.strength(21)).toBe(false);
		  expect(hero.strength(0)).toBe(false);
		  expect(hero.strength(20)).toBe(20);
		  expect(hero.strength()).toBe(20);
		  expect(hero.strength(1)).toBe(1);
	  })
	  // when ("ability is dexterity", function () {
// 	  	it("modifies armor", function () {
// 			hero.dexterity(12);
// 			expect(hero.armor).toEqual(11);
// 	  	});
// 	  });
	  when ("ability is constitution", function () {
	  	it("modifies hit points", function () {
			hero.constitution(12);
			expect(hero.hitpoints).toEqual(6);
			hero.constitution(1);
			expect(hero.hitpoints).toEqual(1);
	  	});
	  });
	  
  });
  when("determining an ability modifier", function(){
  	beforeEach(function() {
	
  		hero = new Character("Awesome Guy");
  	});
	it("returns a modifier value", function () {
		
	
	  	expect(hero.modifier("strength")).toEqual(0);
		hero.strength(1);
		expect(hero.modifier("strength")).toEqual(-5);
		hero.strength(3);
		expect(hero.modifier("strength")).toEqual(-4);
		hero.strength(4);
		expect(hero.modifier("strength")).toEqual(-3);
		hero.strength(7);
		expect(hero.modifier("strength")).toEqual(-2);
		hero.strength(9);
		expect(hero.modifier("strength")).toEqual(-1);
		hero.strength(12);
		expect(hero.modifier("strength")).toEqual(1);
		hero.strength(14);
		expect(hero.modifier("strength")).toEqual(2);
		hero.strength(17);
		expect(hero.modifier("strength")).toEqual(3);
		hero.strength(18);
		expect(hero.modifier("strength")).toEqual(4);
		hero.strength(20);
		expect(hero.modifier("strength")).toEqual(5);
	});
  });
  
  when("a character alignment is set", function () {
  	beforeEach(function() {
	
  		hero = new Character("Awesome Guy");
  	});
	it("character is aligned to Good", function(){
		expect(hero.align("Good")).toBe(true);
		expect(hero.alignment).toBe("Good")
	});
	it("character is aligned to Neutral", function(){
		expect(hero.align("Neutral")).toBe(true);
	});
	it("character is aligned to Evil", function(){
		expect(hero.align("Evil")).toBe(true);
	});
	it("returns false for invalid alignment", function(){
		expect(hero.align("Mean")).toBe(false)
		expect(hero.alignment).not.toBe("Mean")
	});
	
  });
  
  when("a character attacks", function(){
  	beforeEach(function(){
  		hero = new Character("Our Hero")
		villain = new Character("Gru")
		
  	});
	it("hits opponent when roll is greater than their armor", function(){
		
		expect(hero.attack(villain, villain.armor+1)).toBe(true);
		expect(villain.hitpoints).toEqual(4);
		
		hero.strength(15);
		expect(hero.attack(villain, villain.armor-1)).toBe(true);
		expect(villain.hitpoints).toEqual(1);
		
		hero.strength(5);
		expect(hero.attack(villain, villain.armor+4)).toBe(true);
		expect(villain.hitpoints).toEqual(0);
		
		
	});
	it("should miss a dexterity 20 villian with a roll of 10", function(){
		villain.dexterity(20);
		expect(hero.attack(villain, 10)).toBe(false);
	})
	it("should hit a dexterity 12 villian with a roll of 11", function(){
		villain.dexterity(12);
		expect(hero.attack(villain, 11)).toBe(true);
	})
	it("should hit a dexterity 5 villian with a roll of 7", function(){
		villain.dexterity(5);
		expect(hero.attack(villain, 7)).toBe(true);
	})
	

	it("misses opponent when roll is less than their armor", function(){
		expect(hero.attack(villain, villain.armor-1)).toBe(false);
		hero.strength(1);
		expect(hero.attack(villain, villain.armor+4)).toBe(false);
	});
	it("hits opponent when roll is equal to their armor", function(){
		expect(hero.attack(villain, villain.armor)).toBe(true);
		expect(villain.hitpoints).toEqual(4);
	});
	it("if a roll is a natural 20 deal double damage", function(){
		hero.strength(15);
		expect(hero.attack(villain, 20)).toBe(true);
		expect(villain.hitpoints).toEqual(-1);
	});
	it("when hitpoints are zero or less target should die", function(){
		villain.hitpoints = 1;
		expect(hero.attack(villain, villain.armor)).toBe(true);
		
		expect(villain.dead()).toBe(true);
		hero.attack(villain, 20);
		expect(villain.dead()).toBe(true);
	});
	it("if attack is succesful it should gain experience points", function(){
		hero.attack(villain, 20);
		expect(hero.xp).toEqual(10);
	})
	it("if attack is not succesful hero should not gain xp", function(){
		hero.attack(villain, 1);
		expect(hero.xp).toEqual(0);
	})
	it("level increase", function (){
		hero.xp = 995;
		expect(hero.level).toEqual(1);
		hero.constitution(9);
		hero.addXp(10);
		expect(hero.level).toEqual(2);
		expect(hero.hitpoints).toEqual(8);
		expect(hero.attack(villain, 9)).toBe(true);
		
		hero.addXp(1000);
		expect(hero.level).toEqual(3);
		expect(hero.attack(villain, 9)).toBe(true);
	})
	
  });
  
  
   
  
});
