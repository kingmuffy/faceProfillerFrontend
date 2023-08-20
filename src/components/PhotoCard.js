import { useState } from 'react';

const PhotoCard = ({ imageUrl, topic, comments, posterName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
      <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
        <div className="h-64 w-72"> {/* Changed the height from h-96 to h-64 */}
          <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={imageUrl} alt="Recognized Face" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex translate-y-[40%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <h1 className="font-dmserif text-3xl font-bold text-white">{topic}</h1>
          <h2 className="font-dmserif text-xl font-bold text-white">{posterName}</h2>
          <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60" onClick={() => setIsModalOpen(true)}>See More</button>
        </div>
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3>Comments</h3>
                <p>{comments}</p>
                <button onClick={() => setIsModalOpen(false)} className="float-right mt-2 text-red-500">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default PhotoCard;
