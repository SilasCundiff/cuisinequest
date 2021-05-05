import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';
import RecipeList from './RecipeList';
import RecipeCard from './RecipeCard';

const Main = ({
  results,
  handleClick,
  selectedRecipe,
  recipeInformation,
  searchTerm,
  selectedRecipeLoading,
}) => {
  const [favorited, setFavorited] = useState(false);

  const handleFavorited = () => {
    setFavorited(!favorited);
  };

  return (
    <main className='w-screen flex flex-col h-screen bg-transparent'>
      <div className='container mt-48 mb-10 mx-auto h-auto sm:mt-auto sm:h-5/6  overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-50'>
        {results && !selectedRecipe && (
          <h2 className='text-xl text-green-50 pl-3 mb-2'>
            {results.length !== 0 && `Showing Results for: ${searchTerm}`}
          </h2>
        )}

        {!selectedRecipe && (
          <RecipeList
            handleClick={handleClick}
            results={results}
            searchTerm={searchTerm}
          />
        )}
        {selectedRecipe && <BarLoader loading={selectedRecipeLoading} />}
        {selectedRecipe && !selectedRecipeLoading && (
          <RecipeCard
            handleFavorited={handleFavorited}
            recipeInformation={recipeInformation}
            favorited={favorited}
            handleClick={handleClick}
          />
        )}
      </div>
    </main>
  );
};

export default Main;
