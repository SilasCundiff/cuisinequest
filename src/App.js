// App imports
import React, { useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import { css } from '@emotion/core';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Main from './components/Main';
import Header from './components/Header';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  const [searchQuery, setSearchQuery] = useState({
    query: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [retrievedRecipes, setRetrievedRecipes] = useState();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipeLoading, setSelectedRecipeLoading] = useState(true);
  const [recipeInformation, setRecipeInformation] = useState({});

  const handleInput = (e) => {
    setSearchQuery({ query: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecipesLoading(true);
    setSelectedRecipe(null);
    console.log(`retrievedRecipes`, retrievedRecipes);
    setRetrievedRecipes({});
    if (searchQuery.query !== '') {
      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${process.env.REACT_APP_RECIPES_API_KEY}&query=${searchQuery.query}`
        )
        .then((res) => {
          const recipeResponse = res.data;
          setRetrievedRecipes(recipeResponse);
          setRecipesLoading(false);
        });
      setSearchTerm(searchQuery.query);
      setSearchQuery({ query: '' });
    }
  };

  const handleClick = (id) => {
    setSelectedRecipeLoading(true);
    setSelectedRecipe(id);
  };

  const home = () => {
    setRetrievedRecipes();
    setSelectedRecipe(null);
    setRecipeInformation({});
  };

  useEffect(() => {
    if (!retrievedRecipes) {
      setRecipesLoading(true);
    }
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
          setSelectedRecipeLoading(false);
        });
    }
  }, [selectedRecipe]);

  useEffect(() => {
    if (!selectedRecipe) {
      setSelectedRecipeLoading(true);
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
        <BarLoader
          color='#34D399'
          loading={recipesLoading}
          height={8}
          width={200}
          css={override}
        />
      )}
      {selectedRecipe && (
        <BarLoader
          color='#34D399'
          loading={selectedRecipeLoading}
          height={8}
          width={200}
          css={override}
        />
      )}

      {retrievedRecipes !== undefined && (
        <Main
          results={retrievedRecipes.results}
          handleClick={handleClick}
          selectedRecipe={selectedRecipe}
          recipeInformation={recipeInformation}
          searchTerm={searchTerm}
          selectedRecipeLoading={selectedRecipeLoading}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
