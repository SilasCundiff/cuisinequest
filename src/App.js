// App imports
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTimes,
  faHeart,
  faUtensilSpoon,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import axios from 'axios';
// Header imports

function App() {
  const [searchQuery, setSearchQuery] = useState({
    query: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [retrievedRecipes, setRetrievedRecipes] = useState();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeInformation, setRecipeInformation] = useState({});
  const handleInput = (e) => {
    setSearchQuery({ query: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.query !== '') {
      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${process.env.REACT_APP_RECIPES_API_KEY}&query=${searchQuery.query}`
        )
        .then((res) => {
          const recipeResponse = res.data;
          setRetrievedRecipes(recipeResponse);
        });
      setSearchTerm(searchQuery.query);
      setSearchQuery({ query: '' });
    }
  };

  const handleClick = (id) => {
    setSelectedRecipe(id);
  };

  const home = () => {
    setRetrievedRecipes();
    setSelectedRecipe(null);
    setRecipeInformation({});
  };
  useEffect(() => {
    console.log(`retrievedRecipes`, retrievedRecipes);
  }, [retrievedRecipes]);

  useEffect(() => {
    if (selectedRecipe) {
      axios
        .get(
          `https://api.spoonacular.com/recipes/${selectedRecipe}/information?apiKey=${process.env.REACT_APP_RECIPES_API_KEY}&information`
        )
        .then((res) => {
          const recipeResponse = res.data;
          setRecipeInformation({ ...recipeResponse });
        });
    }
  }, [selectedRecipe]);
  console.log(`recipeInformation`, recipeInformation);
  return (
    <div className='flex bg-hero-img bg-grey-50 bg-right-bottom bg-cover bg-no-repeat'>
      <Nav
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        home={home}
      />
      {retrievedRecipes === undefined && <Header searchQuery={searchQuery} />}
      {retrievedRecipes !== undefined && (
        <Main
          results={retrievedRecipes.results}
          handleClick={handleClick}
          selectedRecipe={selectedRecipe}
          recipeInformation={recipeInformation}
          searchTerm={searchTerm}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;

export const Nav = ({ handleInput, handleSubmit, searchQuery, home }) => {
  return (
    <div className='container fixed flex flex-wrap'>
      <div
        className='text-3xl 2xl:text-4xl text-green-400 bg-transparent my-auto p-4 pb-2 md:ml-auto xl:mr-auto cursor-pointer'
        onClick={home}
      >
        CuisineQuest
      </div>
      <Search
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export const Header = () => {
  return (
    <header className='w-screen flex flex-col h-screen text-green-50  justify-center bg-transparent xl:flex-row xl:items-center'>
      <div className='mt-12  max-w-2xl xl:max-w-4xl  sm:mx-auto  xl:mt-0'>
        <h1 className='text-5xl font-bold text-green-500 pl-4 xl:pl-0 leading-12  sm:text-8xl 2xl:text-9xl  '>
          Every meal <br /> is a journey.
        </h1>
        <span className='text-xl font-thin uppercase text-gray-50 pl-4 pr-0 py-0 leading-8 tracking-wide sm:text-4xl'>
          explore your tastebuds
        </span>
      </div>
      <div className='text-sm text-gray-300 mt-6 p-4 px-6 pt-0 font-light max-w-sm mx-auto sm:text-2xl 2xl:text-3xl sm:max-w-xl xl:max-w-md 2xl:max-w-2xl  flex flex-col xl:mt-8'>
        <span className='mt-4'>
          Whether it’s discovering new dishes or feeling comfort with your
          long-lost favorites,
        </span>
        <span className='mt-4'>we’ve got you covered.</span>
        <span className='mt-4'>
          Let us help you hunt down those recipes that are off the map!
        </span>
      </div>
    </header>
  );
};

export const Main = ({
  results,
  handleClick,
  selectedRecipe,
  recipeInformation,
  searchTerm,
}) => {
  const [favorited, setFavorited] = useState(false);

  const handleFavorited = () => {
    setFavorited(!favorited);
  };

  return (
    <main className='w-screen flex flex-col h-screen bg-transparent'>
      <div className='container mt-48 mb-10 mx-auto h-auto sm:mt-auto sm:h-5/6  overflow-y-scroll scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-50'>
        <h2 className='text-xl text-green-50 pl-3'>
          {results.length !== 0 && `Showing Results for: ${searchTerm}`}
        </h2>
        {!selectedRecipe && (
          <RecipeList
            handleClick={handleClick}
            results={results}
            searchTerm={searchTerm}
          />
        )}
        {selectedRecipe && (
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

export const Footer = () => {
  return (
    <div className='text-xs text-gray-500 font-light absolute inset-x-0 bottom-0 p-2 xl:text-base'>
      copyright &copy; CuisineQuest 2021
    </div>
  );
};

export const RecipeList = ({ results, handleClick, searchTerm }) => {
  return (
    <div className='recipe-list p-1 flex flex-wrap justify-center'>
      {results.map((recipe) => {
        const { id, image, title } = recipe;
        return (
          <div
            onClick={() => {
              handleClick(id);
            }}
            key={id}
            className='recipe-card flex justify-center flex-col my-4  mx-4 p-2 bg-green-50 rounded-md md:flex-grow md:max-w-2xl cursor-pointer'
          >
            <img
              className='recipe-card-img mx-auto rounded'
              src={image}
              alt={title}
            />
            <h4 className='recipe-card-title mt-2 text-l font-bold text-green-800'>
              {title}
            </h4>
          </div>
        );
      })}
      {results.length === 0 && (
        <span className='text-green-50 text-2xl mt-2 mx-auto px-2'>
          no results found for: <br />
          <span className='text-green-400'>"{searchTerm}"</span> <br /> Please
          try a different search
        </span>
      )}
    </div>
  );
};

export const RecipeCard = ({
  handleClick,
  recipeInformation,
  handleFavorited,
  favorited,
}) => {
  const {
    image,
    title,
    summary,
    creditsText,
    sourceUrl,
    spoonacularScore,
    extendedIngredients,
  } = recipeInformation;

  return (
    <div className='recipe-information bg-green-50 p-2 relative rounded-md lg:flex lg:flex-wrap'>
      <div className='container flex justify-end text-3xl  sticky top-2 right-2 h-0 '>
        <FontAwesomeIcon
          icon={faTimes}
          size='lg'
          className='text-green-800 ml-auto mr-1 mb-2'
          onClick={() => {
            handleClick(null);
          }}
        />
      </div>
      <img
        className='mx-auto object-contain rounded lg:flex-grow xl:max-w-3xl xl:pt-10'
        src={image}
        alt={`${title}`}
      />
      <div className='summary-container lg:px-8 lg:my-8 xl:max-w-3xl xl:mx-0 xl:my-2'>
        <h2 className='mt-2 text-l font-bold text-green-800 lg:text-3xl'>
          {title}
        </h2>
        <div
          className='mt-2 mb-4 px-2 leading-7 font-light text-md lg:text-2xl'
          dangerouslySetInnerHTML={{ __html: `${summary}` }}
        ></div>
      </div>
      <div className='buttons-container container flex justify-evenly items-center mb-6 lg:max-w-xl xl:max-w-2xl xl:mx-auto '>
        <a
          className='border-4 border-green-500 text-green-500 rounded-full p-1 hover:bg-green-500 hover:text-green-50 lg:text-3xl lg:p-2'
          href={sourceUrl}
        >
          View Recipe
        </a>
        <span className='flex bg-green-500 text-green-50 rounded-full text-md p-2 px-4 lg:text-4xl lg:py-3'>
          <FontAwesomeIcon
            icon={faUtensilSpoon}
            size='lg'
            className='text-green-50 text-2xl my-auto mr-2 lg:text-2xl'
            onClick={handleFavorited}
          />{' '}
          Score: {spoonacularScore}
        </span>
        {favorited ? (
          <FontAwesomeIcon
            icon={faHeart}
            size='lg'
            className='text-green-500 text-4xl lg:text-5xl'
            onClick={handleFavorited}
          />
        ) : (
          <FontAwesomeIcon
            icon={farHeart}
            size='lg'
            className='text-green-500 text-4xl lg:text-5xl'
            onClick={handleFavorited}
          />
        )}
      </div>

      <ul className='ingredients-container flex flex-wrap gap-2 my-6 lg:mx-6 bg-green-100 py-4 px-2  lg:flex-grow xl:max-w-3xl xl:mx-auto xl:my-0'>
        <span className='w-full mx-auto mb-4 border-b-2 border-green-500 text-lg font-medium lg:text-2xl'>
          Ingredients:
        </span>
        {extendedIngredients &&
          extendedIngredients.map((ingredient) => {
            const { id, name } = ingredient;
            return (
              <li
                className='bg-green-900 text-green-50 rounded-full text-sm p-2 capitalize lg:text-base'
                id={id}
              >
                <span>{name}</span>
              </li>
            );
          })}
      </ul>
      <span className='font-light text-sm text-gray-900  mt-6 mb-4 w-full xl:mt-0'>
        Courtesy of: {creditsText}
      </span>
    </div>
  );
};

export const Search = ({ handleInput, handleSubmit, searchQuery }) => {
  return (
    <div className='m-auto flex-auto max-w-4xl lg:max-w-lg 2xl:max-w-4xl'>
      <form className='p-4' onSubmit={handleSubmit}>
        <div className='bg-white flex items-center rounded-full'>
          <div className='p-1'>
            <button className='bg-green-400 text-white rounded-full p-1 hover:bg-green-200 focus:outline-none w-9 h-9 flex items-center justify-center'>
              <FontAwesomeIcon icon={faSearch} size='lg' />
            </button>
          </div>
          <input
            className='rounded-r-full w-full py-2 px-6 text-gray-600 leading-tight focus:outline-none'
            id='search'
            type='text'
            placeholder='Find your next meal...'
            onChange={handleInput}
            value={searchQuery.query}
          />
        </div>
      </form>
    </div>
  );
};
