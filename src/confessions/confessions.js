import React, { useState } from 'react';

const confessionsData = [
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
  <div className="bg-white rounded-lg shadow-md p-6 mb-4 transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
      <svg className="w-5 h-5 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.02A5 5 0 0010 11z" clipRule="evenodd"></path>
      </svg>
      {username}
    </h3>
    <p className="text-gray-600 italic">{confession}</p>
  </div>
);

const StroganoffConfessions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleConfessions, setVisibleConfessions] = useState(10);
  
  const filteredConfessions = confessionsData.filter(post => 
    post.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.confession.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const displayedConfessions = filteredConfessions.slice(0, visibleConfessions);
  
  const loadMore = () => {
    setVisibleConfessions(prev => prev + 10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Strogan<span className="text-amber-600">off</span> Confessions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Read anonymous confessions from stroganoff enthusiasts around the world. What's your stroganoff secret?
          </p>
        </div>
        
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search confessions..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-600 focus:border-amber-600 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {displayedConfessions.map((post, index) => (
            <Confession key={index} username={post.username} confession={post.confession} />
          ))}
        </div>

        {visibleConfessions < filteredConfessions.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StroganoffConfessions;
