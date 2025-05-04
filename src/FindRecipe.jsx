import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React from 'react';
import './FindRecipe.scss';
import RecipeCard from './RecipeCard';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const cuisines = [
  'African',
  'Asian',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese'
];

const diets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30"
];

const mealTypes = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink"
];

const recipeCards = []

const FindRecipe = () => {
  const basePath = import.meta.env.VITE_API_BASE_PATH;

  const [cuisineName, setCuisine] = React.useState([]);
  const [recipeName, setRecipe] = React.useState(null);
  const [ingredientName, setIngredients] = React.useState(null);
  const [minCarbs, setMinCarbs] = React.useState();
  const [maxCarbs, setMaxCarbs] = React.useState();
  const [minProtein, setMinProtein] = React.useState();
  const [maxProtein, setMaxProtein] = React.useState();
  const [minCalories, setMinCalories] = React.useState();
  const [maxCalories, setMaxCalories] = React.useState();
  const [dietName, setDiet] = React.useState([]);
  const [mealTypeName, setMealType] = React.useState([]);
  const [recipeData, setRecipeData] = React.useState([]);


  const handleDropdownChange = (event, field) => {
    let value = event.target.value;

    switch (field) {
      case 'cuisine':
        setCuisine(value);
        break;
      case 'diet':
        setDiet(value);
        break;
      case 'mealType':
        setMealType(value);
        break;
      default:
        break;
    }
  }

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'recipe':
        setRecipe(value);
        break;
      case 'ingredients':
        setIngredients(value);
        break;
      case 'minCarbs':
        setMinCarbs(value);
        break;
      case 'maxCarbs':
        setMaxCarbs(value);
        break;
      case 'minProtein':
        setMinProtein(value);
        break;
      case 'maxProtein':
        setMaxProtein(value);
        break;
      case 'minCalories':
        setMinCalories(value);
        break;
      case 'maxCalories':
        setMaxCalories(value);
        break;
      default:
        break;
    }
  }

  const searchRecipe = () => {
    const recipeParams = {
      recipe: recipeName,
      cuisine: Array.isArray(cuisineName) && cuisineName.length > 0 ? cuisineName.join(',') : null,
      ingredients: ingredientName,
      minCarbs: Number(minCarbs),
      maxCarbs: Number(maxCarbs),
      minProtein: Number(minProtein),
      maxProtein: Number(maxProtein),
      minCalories: Number(minCalories),
      maxCalories: Number(maxCalories),
      diet: Array.isArray(dietName) && dietName.length > 0 ? dietName.join(',') : null,
      mealType: Array.isArray(mealTypeName) && mealTypeName.length > 0 ? mealTypeName.join(',') : null,
      instructionsRequired: true,
      addRecipeInformation: true,
      addRecipeInstructions: true,
    };

    fetch(`${basePath}/getRecipes?recipeParams=${JSON.stringify(recipeParams)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json();
      })
      .then(data => {
        setRecipeData(data);
        prepareRecipeCardsData();
      })
      .catch(error => {
        console.log("fetch error", error);
      })
  }

  const prepareRecipeCardsData = () => {
    recipeData?.results?.map((recipe, index) => {
      const ingredientsSet = new Set();
      recipe?.analyzedInstructions[0]?.steps.forEach((step) => {
        step.ingredients.forEach((ingredient) => {
          ingredientsSet.add(ingredient.name);
        });
      });

      recipeCards.push({
        id: index + 1,
        title: recipe?.title,
        img: recipe?.image,
        instructions: recipe?.analyzedInstructions[0]?.steps.map((step) => step.step),
        ingredients: Array.from(ingredientsSet),
      });
    });
  }


  return (
    <div className='find-recipe-wrapper'>
      <div className='find-recipe-header-text'>Find Your Recipe</div>
      <div className='find-recipe-desc'>Discover recipes that match your lifestyle, preferences, and wellness goals right here on HealthVerse! Whether you're following a specific diet, exploring global cuisines, or simply cooking with what you have at home, this tool helps you find recipes tailored to your needs. Use the filters on the left to search by cuisine, dietary restrictions, ingredients, meal type, or nutrition preferences like carbs and protein levels. Our goal is to make healthy, mindful eating easy and enjoyable—so go ahead, explore, and let your next wholesome meal begin here!</div>
      <div className='recipe-content-wrapper row'>
        <div className='left-filters col-2'>
          <div className='recipe-text-field align-center mt-4'>
            <TextField id="recipe" label="recipe" variant="outlined" className='filter-width' onInput={(e) => handleInputChange('recipe', e.target.value)} />
          </div>
          <div className='cuisine-multi-select-dropdown align-center' style={{ width: '100%' }}>
            <FormControl sx={{ m: 1 }} className='filter-width'>
              <InputLabel id="cuisine-multiple-checkbox-label">Cuisine</InputLabel>
              <Select
                name='cuisine'
                labelId="select-cuisine-checkbox-label"
                id="select-cuisine-checkbox"
                multiple
                value={cuisineName}
                onChange={(e) => handleDropdownChange(e, 'cuisine')}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => Array.isArray(selected) ? selected.join(', ') : selected}
                MenuProps={MenuProps}
              >
                {cuisines.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={cuisineName?.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='diet-multi-select-dropdown '>
            <FormControl sx={{ m: 1 }} className='filter-width'>
              <InputLabel id="diet-multiple-checkbox-label">Diet</InputLabel>
              <Select
                name='diet'
                labelId="select-diet-checkbox-label"
                id="select-diet-checkbox"
                multiple
                value={dietName}
                onChange={(e) => handleDropdownChange(e, 'diet')}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => Array.isArray(selected) ? selected.join(', ') : selected}
                MenuProps={MenuProps}
              >
                {diets.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={dietName.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='ingredients-text-field align-center'>
            <TextField placeholder='eg : tomato, cheese, bread' id="ingredients" className='filter-width' label="Ingredients" variant="outlined" helperText="Enter ingredients, comma-separated." onInput={(e) => handleInputChange('ingredients', e.target.value)} />
          </div>
          <div className='meal-type-multi-select-dropdown '>
            <FormControl style={{ m: 1 }} className='filter-width'>
              <InputLabel id="meal-type-multiple-checkbox-label">Meal Type</InputLabel>
              <Select
                name='mealType'
                labelId="select-meal-type-checkbox-label"
                id="select-meal-type-checkbox"
                multiple
                value={mealTypeName}
                onChange={(e) => handleDropdownChange(e, 'mealType')}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => Array.isArray(selected) ? selected.join(', ') : selected}
                MenuProps={MenuProps}
              >
                {mealTypes.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={mealTypeName.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='min-max-containers'>
            <TextField type='number' id="minCarbs" label="Min Carbs" variant="outlined" className="filter-width-small" title='Min Carbs' onInput={(e) => handleInputChange('minCarbs', e.target.value)} />
            <TextField type='number' id="maxCarbs" label="Max Carbs" variant="outlined" className="filter-width-small" title='Max Carbs' onInput={(e) => handleInputChange('maxCarbs', e.target.value)} />
          </div>
          <div className='min-max-containers'>
            <TextField type='number' id="minProtein" label="Min Protein" variant="outlined" className="filter-width-small" title='Min Protein' onInput={(e) => handleInputChange('minProtein', e.target.value)} />
            <TextField type='number' id="maxProtein" label="Max Protein" variant="outlined" className="filter-width-small" title='Max Protein' onInput={(e) => handleInputChange('maxProtein', e.target.value)} />

          </div>
          <div className='min-max-containers mb-0'>
            <TextField type='number' id="minCalories" label="Min Calories" variant="outlined" className="filter-width-small" title='Min Calories' onInput={(e) => handleInputChange('minCalories', e.target.value)} />
            <TextField type='number' id="maxCalories" label="Max Calories" variant="outlined" className="filter-width-small" title='Max Calories' onInput={(e) => handleInputChange('maxCalories', e.target.value)} />
          </div>
          <div className='btn-wrapper mb-4'>
            <button className="btn search-recipe" onClick={() => searchRecipe()}>Search Recipe</button>
          </div>
        </div>
        <div className='right-recipe-card col-8'>
          {recipeCards.map((recipe, index) => {
            return <RecipeCard key={index} recipeCard={recipe} />
          })}
        </div>
      </div>
    </div>
  )
}

export default FindRecipe
