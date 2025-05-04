import React from 'react'
import './RecipeCard.scss';

const RecipeCard = ({ recipeCard }) => {
    return (
        <div className='recipe-card d-flex'>
            <div className='recipe-card-container row' style={{ width: "100%" }}>
                <div className='recipe-card-picture col-4'>
                    <img src={recipeCard?.img} alt="logo" style={{ width: "100%" }} />
                </div>
                <div className='recipe-card-content ps-5 col-8'>
                    <div className='recipe-title recipe-card-font'>{recipeCard?.title}</div>
                    <hr className='line' />
                    <div className='ingredients-header recipe-card-header-font mb-3'>Ingredients</div>
                    <div className='ingredient-list recipe-card-content-font mb-4'>
                        {
                            recipeCard?.ingredients?.map((ingredient, index) => {
                                return (
                                    <div className='ingredient-item' key={index}>
                                        {ingredient}{index !== recipeCard?.ingredients?.length - 1 && ', '}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='recipe-instructions-header recipe-card-header-font mb-2'>Steps</div>
                    <div className='recipe-instructions recipe-card-content-font mb-3'>
                        {
                            recipeCard?.instructions?.map((instruction, index) => {
                                return (
                                    <div className='instruction-item d-flex' key={index}>
                                        <div className='instruction-number'>{index + 1}.</div>
                                        <div className='instruction-desc ms-2'>{instruction}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard
