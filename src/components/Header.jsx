const Header = () => {
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

export default Header;
