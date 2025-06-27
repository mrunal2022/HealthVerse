import { Alert, Snackbar } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useState, useContext } from 'react';
import './FindRecipe.scss';
import RecipeCard from './RecipeCard';
import { BlogContext } from './context/BlogContext'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

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


const FindRecipe = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const location = useLocation();
  const { isFromHeader } = location.state || {};
  let { selectedBlog } = useContext(BlogContext);
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
  const [recipeCards, setRecipeCards] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [showSelectFiltersMsg, setShowSelectFiltersMsg] = useState(true);
  const [showNoDataMsg, setShowNoDataMsg] = useState(false);
  const [initializedForm, setInitializedForm] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const carbError = minCarbs && maxCarbs && Number(minCarbs) > Number(maxCarbs);
  const proteinError = minProtein && maxProtein && Number(minProtein) > Number(maxProtein);
  const caloriesError = minCalories && maxCalories && Number(minCalories) > Number(maxCalories);

  useEffect(() => {
    if (!isFromHeader && selectedBlog?.recommendedRecipe) {
      const { recipe, ingredients, cuisine, minCarbs, maxCarbs, minProtein, maxProtein, minCalories, maxCalories, diet, mealType } = selectedBlog.recommendedRecipe;

      setRecipe(recipe);     //string
      setIngredients(ingredients);  //comma separated string
      setCuisine(!cuisine ? [] : cuisine); //type array
      setMinCarbs(minCarbs);        //number
      setMaxCarbs(maxCarbs);       //number
      setMinProtein(minProtein);    //number
      setMaxProtein(maxProtein);    //number
      setMinCalories(minCalories);//number
      setMaxCalories(maxCalories);//number
      setDiet(!diet ? [] : diet);   //type array
      setMealType(!mealType ? [] : mealType); //type array
      setInitializedForm(true); // flag for second useEffect
    }
  }, []); // Empty dependency array = runs only once after mount

  useEffect(() => {
    if (initializedForm) {
      searchRecipe();
    }
  }, [initializedForm]);

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
      case 'minCarbs': {
        setMinCarbs(value === '' ? '' : Number(value));
        break;
      }
      case 'maxCarbs': {
        setMaxCarbs(value === '' ? '' : Number(value));
        break;
      }
      case 'minProtein': {
        setMinProtein(value === '' ? '' : Number(value));
        break;
      }
      case 'maxProtein': {
        setMaxProtein(value === '' ? '' : Number(value));
        break;
      }
      case 'minCalories': {
        setMinCalories(value === '' ? '' : Number(value));
        break;
      }
      case 'maxCalories': {
        setMaxCalories(value === '' ? '' : Number(value));
        break;
      }
      default:
        break;
    }
  }

  const checkFormEmpty = () => !recipeName && cuisineName?.length === 0 && !ingredientName && !minCarbs && !maxCarbs && !minProtein && !maxProtein && !minCalories && !maxCalories && dietName?.length === 0 && mealTypeName?.length === 0;

  const searchRecipe = () => {
    if (checkFormEmpty()) {
      setOpen(true);
      setShowSelectFiltersMsg(true);
      return;
    }

    setShowSelectFiltersMsg(false);
    const recipeParams = {
      recipe: recipeName,
      cuisine: Array.isArray(cuisineName) && cuisineName?.length > 0 ? cuisineName?.join(',') : null,
      ingredients: ingredientName,
      minCarbs: minCarbs,
      maxCarbs: maxCarbs,
      minProtein: minProtein,
      maxProtein: maxProtein,
      minCalories: minCalories,
      maxCalories: maxCalories,
      diet: Array.isArray(dietName) && dietName?.length > 0 ? dietName?.join(',') : null,
      mealType: Array.isArray(mealTypeName) && mealTypeName?.length > 0 ? mealTypeName?.join(',') : null,
      instructionsRequired: true,
      addRecipeInformation: true,
      addRecipeInstructions: true,
    };

    setShowLoader(true);
    fetch(`${basePath}/getRecipes?recipeParams=${JSON.stringify(recipeParams)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json();
      })
      .then(data => {
        if (data?.results?.length === 0) {
          setShowNoDataMsg(true);
          setRecipeCards([]);
          setShowLoader(false);
          return;
        }
        setShowNoDataMsg(false);
        setRecipeData(data);
        prepareRecipeCardsData(data);
        setShowLoader(false);
      })
      .catch(error => {
        setShowLoader(false);
        console.log("fetch error", error);
      })
  }

  const prepareRecipeCardsData = (recipeApiData) => {
    const cardData = recipeApiData?.results?.map((recipe, index) => {
      const ingredientsSet = new Set();
      recipe?.analyzedInstructions?.forEach((instruction) => {
        instruction?.steps?.forEach((step) => {
          step?.ingredients?.forEach((ingredient) => {
            ingredientsSet.add(ingredient.name);
          });
        });
      });

      const instructions = new Array();
      recipe?.analyzedInstructions.forEach((instruction) => {
        instruction.steps.forEach((step) => {
          instructions.push(step.step);
        })
      });

      return {
        id: index + 1,
        title: recipe?.title,
        img: recipe?.image,
        instructions: instructions,
        ingredients: Array.from(ingredientsSet),
      };
    });

    setRecipeCards(cardData);
  }

  return (
    <>
      <form className='find-recipe-wrapper' onSubmit={(e) => { e.preventDefault(); searchRecipe(); }} >
        <div className='find-recipe-header-text'>Find Your Recipe</div>
        <div className='find-recipe-desc'>Discover recipes that match your lifestyle, preferences, and wellness goals right here on HealthVerse! Whether you're following a specific diet, exploring global cuisines, or simply cooking with what you have at home, this tool helps you find recipes tailored to your needs. Use the filters on the left to search by cuisine, dietary restrictions, ingredients, meal type, or nutrition preferences like carbs and protein levels. Our goal is to make healthy, mindful eating easy and enjoyable—so go ahead, explore, and let your next wholesome meal begin here!</div>
        <div className='recipe-content-wrapper row'>
          <div className='left-filters col-2'>
            <div className='recipe-text-field align-center mt-4'>
              <TextField id="recipe" label="recipe" value={recipeName ?? ''} variant="outlined" className='filter-width' onInput={(e) => handleInputChange('recipe', e.target.value)} />
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
                      <Checkbox checked={dietName?.includes(name)} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='ingredients-text-field align-center'>
              <TextField placeholder='eg : tomato, cheese, bread' id="ingredients" value={ingredientName ?? ''} className='filter-width' label="Ingredients" variant="outlined" helperText="Enter ingredients, comma-separated." onInput={(e) => handleInputChange('ingredients', e.target.value)} />
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
                      <Checkbox checked={mealTypeName?.includes(name)} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='min-max-containers'>
              <TextField type='number' id="minCarbs" label="Min Carbs" variant="outlined" value={minCarbs ?? ''} className="filter-width-small" title='Min Carbs' onInput={(e) => handleInputChange('minCarbs', e.target.value)} error={carbError} helperText={carbError ? "Min carbs should not be greater than max carbs" : ''} />
              <TextField type='number' id="maxCarbs" label="Max Carbs" variant="outlined" value={maxCarbs ?? ''} className="filter-width-small" title='Max Carbs' onInput={(e) => handleInputChange('maxCarbs', e.target.value)} error={carbError} helperText={carbError ? "Max carbs should not be less than min carbs" : ''} />
            </div>
            <div className='min-max-containers'>
              <TextField type='number' id="minProtein" label="Min Protein" variant="outlined" value={minProtein ?? ''} className="filter-width-small" title='Min Protein' onInput={(e) => handleInputChange('minProtein', e.target.value)} error={proteinError} helperText={proteinError ? "Min protein should not be greater than max protein" : ''} />
              <TextField type='number' id="maxProtein" label="Max Protein" variant="outlined" value={maxProtein ?? ''} className="filter-width-small" title='Max Protein' onInput={(e) => handleInputChange('maxProtein', e.target.value)} error={proteinError} helperText={proteinError ? "Max protein should not be less than min protein" : ''} />
            </div>
            <div className='min-max-containers mb-0'>
              <TextField type='number' id="minCalories" label="Min Calories" variant="outlined" value={minCalories ?? ''} className="filter-width-small" title='Min Calories' onInput={(e) => handleInputChange('minCalories', e.target.value)} error={caloriesError} helperText={caloriesError ? "Min calories should not be greater than max calories" : ''} />
              <TextField type='number' id="maxCalories" label="Max Calories" variant="outlined" value={maxCalories ?? ''} className="filter-width-small" title='Max Calories' onInput={(e) => handleInputChange('maxCalories', e.target.value)} error={caloriesError} helperText={caloriesError ? "Max calories should not be less than min calories" : ''} />
            </div>
            <div className='btn-wrapper mb-4'>
              <button className="btn search-recipe" type="submit" disabled={carbError || caloriesError || proteinError}>Search Recipe</button>
            </div>
          </div>
          <div className='col-8 right-recipe-wrapper'>
            {showLoader ? (
              <div className='spinner'>
                <CircularProgress color="success" size="5rem" />
              </div>
            ) : (showSelectFiltersMsg || showNoDataMsg) ? (
              <div className='no-data-card'>
                <img
                  src={showNoDataMsg ? "/assets/no-data.png" : "/assets/generate-your-recipe.png"}
                  alt=""
                  className='no-data-img'
                />
              </div>
            ) : (
              <div className='right-recipe-card'>
                {recipeCards.map((recipe, index) => (
                  <RecipeCard key={index} recipeCard={recipe} />
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: '480px' }}
        >
          Please enter at least one filter to search for recipes.
        </Alert>
      </Snackbar>
    </>
  )
}

export default FindRecipe



