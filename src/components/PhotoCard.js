import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const PhotoCard = ({ imageUrl, topic, comments, posterName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
        <div className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 w-72">
            <div className="h-64 w-full">
                <img className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-1.05" src={imageUrl} alt="Recognized Face" />
            </div>
            <div className="p-4 bg-white">
                <h1 className="font-dmserif text-2xl font-bold mb-2">{topic}</h1>
                <h2 className="font-dmserif text-xl font-medium text-gray-600 mb-4">{posterName}</h2>
                
                <hr className="border-t border-gray-200 group-hover:border-blue-500 group-hover:border-opacity-50 my-4 transition-colors duration-300" />

                <div className="relative group-hover:opacity-100 opacity-100 transition-opacity duration-300" onClick={() => setIsModalOpen(true)}>
                    <span className="absolute inset-0 flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">See More</span>
                    <FaEllipsisV size={20} className="z-10 text-gray-700" />
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-1/2 max-w-lg">
                        <h3 className="font-semibold text-xl mb-4 border-b pb-2">Comments</h3>
                        <p className="mb-4">{comments}</p>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors duration-300">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoCard;
