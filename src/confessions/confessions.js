import React from 'react';

const data = [
  {
    "username": "StroganoffLover123",
    "confession": "I always sneak a spoonful of stroganoff straight from the pot when no one is looking."
  },
  {
    "username": "CreamySauceFanatic",
    "confession": "I prefer my stroganoff with extra sour cream. Can't get enough of that creamy goodness!"
  },
  {
    "username": "BeefyDreams",
    "confession": "Sometimes I dream of swimming in a pool of beef stroganoff."
  },
  {
    "username": "PastaAddict",
    "confession": "I replace the egg noodles with fettuccine in my stroganoff. Don't judge me!"
  },
  {
    "username": "SecretIngredient",
    "confession": "I add a dash of hot sauce to my stroganoff for a little kick."
  },
  {
    "username": "LeftoverKing",
    "confession": "I think stroganoff tastes even better the next day."
  },
  {
    "username": "MushroomManiac",
    "confession": "I triple the amount of mushrooms in my stroganoff. They are the best part!"
  },
  {
    "username": "GarlicGal",
    "confession": "I add an extra clove of garlic to my stroganoff for extra flavor."
  },
  {
    "username": "VeggieVariant",
    "confession": "I make a vegetarian stroganoff with tofu instead of beef. It's surprisingly delicious!"
  },
  {
    "username": "SauceMaster",
    "confession": "I secretly make extra sauce so I can dip my bread in it."
  },
  {
    "username": "NoodleNinja",
    "confession": "I sometimes use rice instead of noodles for a change."
  },
  {
    "username": "HerbHero",
    "confession": "I add fresh parsley to my stroganoff for a burst of color and flavor."
  },
  {
    "username": "SauceSipper",
    "confession": "I could drink the sauce of stroganoff by itself."
  },
  {
    "username": "SavorySecrets",
    "confession": "I use a bit of Worcestershire sauce in my stroganoff for extra depth."
  },
  {
    "username": "CheeseChampion",
    "confession": "I sprinkle some Parmesan cheese on top of my stroganoff before serving."
  },
  {
    "username": "PerfectPortions",
    "confession": "I always make sure to have the perfect ratio of beef to noodles in each bite."
  },
  {
    "username": "PepperyPal",
    "confession": "I love adding lots of black pepper to my stroganoff."
  },
  {
    "username": "ButterBoss",
    "confession": "I melt a pat of butter on top of my stroganoff for extra richness."
  },
  {
    "username": "GourmetGoals",
    "confession": "I use gourmet mushrooms like chanterelles in my stroganoff."
  },
  {
    "username": "ParsleyPro",
    "confession": "I can't eat stroganoff without a sprinkle of fresh parsley on top."
  },
  {
    "username": "CreamyDelight",
    "confession": "I add a bit of cream cheese to my stroganoff sauce for extra creaminess."
  },
  {
    "username": "BistroBite",
    "confession": "Stroganoff reminds me of fancy bistro meals."
  },
  {
    "username": "FamilyFeast",
    "confession": "Stroganoff is my family's go-to comfort food."
  },
  {
    "username": "SourCreamDream",
    "confession": "I can't imagine stroganoff without a big dollop of sour cream."
  },
  {
    "username": "OnionLover",
    "confession": "I double the amount of onions in my stroganoff recipe."
  },
  {
    "username": "SavorySensations",
    "confession": "The combination of beef and mushrooms in stroganoff is unbeatable."
  },
  {
    "username": "ComfortCravings",
    "confession": "Stroganoff is my ultimate comfort food after a long day."
  },
  {
    "username": "CreamyCraze",
    "confession": "I mix in some Greek yogurt with the sour cream in my stroganoff."
  },
  {
    "username": "BeefyBliss",
    "confession": "Beef stroganoff is my idea of food heaven."
  },
  {
    "username": "SteamySpoils",
    "confession": "I always steal a few bites of stroganoff before serving it to everyone else."
  },
  {
    "username": "ParsleyPassion",
    "confession": "Fresh parsley takes stroganoff to a whole new level."
  },
  {
    "username": "ButterSauce",
    "confession": "Adding butter to the stroganoff sauce is a game-changer."
  },
  {
    "username": "SeasonedChef",
    "confession": "I use a blend of herbs and spices to make my stroganoff extra flavorful."
  },
  {
    "username": "MeatyMoments",
    "confession": "I make sure to use the best quality beef for my stroganoff."
  },
  {
    "username": "NoodleNut",
    "confession": "I think the egg noodles are just as important as the sauce in stroganoff."
  },
  {
    "username": "SourCreamSensation",
    "confession": "I add a bit of Dijon mustard to my stroganoff for a tangy twist."
  },
  {
    "username": "FoodFanatic",
    "confession": "I experiment with different ingredients in my stroganoff to keep it interesting."
  },
  {
    "username": "MushroomMagic",
    "confession": "I love the earthy flavor that mushrooms bring to stroganoff."
  },
  {
    "username": "SavorySuccess",
    "confession": "Making the perfect stroganoff gives me a sense of accomplishment."
  },
  {
    "username": "ComfortInACup",
    "confession": "Sometimes, I eat stroganoff straight out of a mug."
  },
  {
    "username": "RichAndCreamy",
    "confession": "I add a splash of white wine to my stroganoff sauce for extra depth."
  },
  {
    "username": "SauceSage",
    "confession": "I take my time to perfect the stroganoff sauce every time."
  },
  {
    "username": "UltimateUmami",
    "confession": "Stroganoff is the ultimate umami experience for me."
  },
  {
    "username": "DinnerDelight",
    "confession": "Stroganoff is my go-to dish for impressing dinner guests."
  },
  {
    "username": "HerbHarmony",
    "confession": "I use a mix of fresh herbs to elevate the flavor of my stroganoff."
  },
  {
    "username": "ComfortFoodie",
    "confession": "Stroganoff is my favorite comfort food, hands down."
  },
  {
    "username": "CulinaryCreations",
    "confession": "I love experimenting with different stroganoff recipes."
  },
  {
    "username": "FlavorFusion",
    "confession": "Stroganoff is the perfect fusion of flavors for me."
  },
  {
    "username": "SourCreamCraze",
    "confession": "I add a bit of lemon juice to my stroganoff sauce for a hint of acidity."
  },
  {
    "username": "SavorySatisfaction",
    "confession": "Stroganoff is the most satisfying meal I can make."
  }
];

const Confession = ({ username, confession }) => (
  <div className="confession">
    <h3>{username}</h3>
    <p>{confession}</p>
  </div>
);

const StroganoffConfessions = () => (
  <div className="confessions-list">
    {data.map((post, index) => (
      <Confession key={index} username={post.username} confession={post.confession} />
    ))}
  </div>
);

export default StroganoffConfessions;
