import React from 'react';
import { useQuery } from 'react-query';
import { fetchPhotos } from '../api/photo';
import PhotoCard from './PhotoCard'; // Import the PhotoCard component
import { ThreeDots } from 'react-loader-spinner';

const PhotosList = () => {
  const { data: photos, isLoading, isError } = useQuery('photos', fetchPhotos);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <ThreeDots height="80" width="80" radius="9" color="#4fa94d" ariaLabel="three-dots-loading" />
      </div>
    );
  }

  if (isError || !Array.isArray(photos)) {
    return <div className="text-lg font-semibold text-red-500">An error occurred while fetching photos.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Photos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.ExternalImageId}
            imageUrl={photo.imageUrl}
            comments={photo.comments.join(', ')}
            posterName={photo.posterName}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotosList;
