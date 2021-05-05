const RecipeList = ({ results, handleClick, searchTerm }) => {
  return (
    <div className='recipe-list p-1 flex flex-wrap justify-center'>
      {results !== undefined &&
        results.map((recipe) => {
          const { id, image, title } = recipe;
          return (
            <div
              onClick={() => {
                handleClick(id);
              }}
              key={id}
              className='recipe-card flex justify-center flex-col max-w-xs my-4  mx-4 p-2 bg-green-50 rounded-md md:flex-grow md:max-w-2xl cursor-pointer'
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
      {results !== undefined && results.length === 0 && (
        <span className='text-green-50 text-2xl mt-2 mx-auto px-2'>
          no results found for: <br />
          <span className='text-green-400'>"{searchTerm}"</span> <br /> Please
          try a different search
        </span>
      )}
    </div>
  );
};
export default RecipeList;
