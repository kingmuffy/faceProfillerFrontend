export const Header = () => {
    return (
      <nav className="bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-xl">Trust Guard</div>
          <div className="space-x-4">
            <button className="text-gray-300 hover:text-white">Contact Us</button>
            <button className="text-gray-300 hover:text-white">About</button>
            <button className="text-gray-300 hover:text-white focus:outline-none">
              Questionnaire
            </button>
          </div>
        </div>
      </nav>
    );
  };
  