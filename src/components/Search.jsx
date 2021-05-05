import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const Search = ({ handleInput, handleSubmit, searchQuery }) => {
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
            required
          />
        </div>
      </form>
    </div>
  );
};
export default Search;
