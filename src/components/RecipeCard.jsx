import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faHeart,
  faUtensilSpoon,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const RecipeCard = ({
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

export default RecipeCard;
