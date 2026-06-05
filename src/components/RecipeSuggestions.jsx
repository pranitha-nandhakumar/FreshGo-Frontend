import { useState } from "react";
import { ChefHat, Sparkles, Plus } from "lucide-react";

export default function RecipeSuggestions() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const recipeData = [
    {
      name: "Tomato Soup",
      match: ["tomato", "onion"],
      time: "15 mins",
      items: ["Tomato", "Onion", "Butter"],
    },
    {
      name: "Bread Sandwich",
      match: ["bread", "cheese"],
      time: "10 mins",
      items: ["Bread", "Cheese", "Tomato"],
    },
    {
      name: "Banana Milkshake",
      match: ["banana", "milk"],
      time: "5 mins",
      items: ["Banana", "Milk", "Sugar"],
    },
    {
      name: "Veg Fried Rice",
      match: ["rice", "carrot"],
      time: "20 mins",
      items: ["Rice", "Carrot", "Onion"],
    },
  ];

  const generateRecipes = () => {
    const input = ingredients.toLowerCase();

    const matched = recipeData.filter((recipe) =>
      recipe.match.some((item) => input.includes(item))
    );

    setRecipes(matched.length > 0 ? matched : recipeData.slice(0, 3));
  };

  return (
    <div className="relative overflow-hidden bg-[#1b0f2d]/80 backdrop-blur-2xl rounded-[2rem] p-6 border border-purple-400/20 shadow-[0_0_35px_rgba(168,85,247,0.12)]">
      <div className="absolute -top-14 -right-14 w-44 h-44 bg-lime-300/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-lime-300/10 border border-lime-300/30 flex items-center justify-center text-lime-300 mb-4">
          <ChefHat size={32} />
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-2">
          AI Recipe Suggestions
        </h3>

        <p className="text-purple-200 mb-4">
          Enter ingredients you have and FreshGo will suggest quick recipes.
        </p>

        <input
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Example: milk, bread, tomato"
          className="w-full mb-4 px-4 py-3 rounded-2xl bg-[#10081f] border border-purple-400/30 text-white placeholder:text-purple-300 outline-none focus:border-lime-300"
        />

        <button
          onClick={generateRecipes}
          className="w-full flex items-center justify-center gap-2 bg-lime-300 hover:bg-lime-200 text-[#080312] font-extrabold px-5 py-3 rounded-2xl"
        >
          <Sparkles size={17} />
          Generate Recipes
        </button>

        {recipes.length > 0 && (
          <div className="mt-5 space-y-3">
            {recipes.map((recipe) => (
              <div
                key={recipe.name}
                className="bg-[#10081f]/90 border border-purple-400/20 rounded-2xl p-4"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <h4 className="text-white font-bold">{recipe.name}</h4>
                    <p className="text-purple-300 text-sm">
                      Ready in {recipe.time}
                    </p>
                  </div>

                  <button className="text-lime-300">
                    <Plus size={18} />
                  </button>
                </div>

                <p className="text-purple-200 text-sm mt-2">
                  Ingredients: {recipe.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}