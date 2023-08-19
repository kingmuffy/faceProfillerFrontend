import React from 'react';
import { useQuery } from 'react-query';
import { fetchPhotos } from '../api/photo';

import { ThreeDots } from  'react-loader-spinner';

const PhotosList = () => {
  const { data: photos, isLoading, isError } = useQuery('photos', fetchPhotos, {

  });

  if (isLoading) {
    return <div className="flex justify-center mt-10"> <ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="#4fa94d" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
     /> </div>;
  }

  if (isError || !Array.isArray(photos)) {
    return <div className="text-lg font-semibold text-red-500">An error occurred while fetching photos.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Photos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.ExternalImageId} className="bg-white p-4 shadow-lg rounded-md">
            <img src={photo.imageUrl} alt="Uploaded" className="w-full h-48 object-cover rounded-md"/>
            <p className="text-sm mt-2">Comment: {photo.comments.join(', ')}</p>
            <p className="text-sm mt-1">Poster Name: {photo.posterName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosList;
