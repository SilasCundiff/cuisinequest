// App imports
// none for now
// Header imports

function App() {
  return (
    <div className='bg-gray-900'>
      <Nav />
      <Header />
      <Footer />
    </div>
  );
}

export default App;

export const Header = () => {
  return (
    <div className='flex flex-col bg-hero-img bg-grey-50 bg-right-bottom bg-cover bg-no-repeat h-screen'>
      Hero
    </div>
  );
};

export const Nav = () => {
  return (
    <div className='text-4xl text-green-400 bg-transparent fixed'>
      CuisineQuest
    </div>
  );
};

export const Footer = () => {
  return <div className='text-6xl fixed'>test</div>;
};
