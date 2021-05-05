import Search from './Search';

const Nav = ({ handleInput, handleSubmit, searchQuery, home }) => {
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

export default Nav;
