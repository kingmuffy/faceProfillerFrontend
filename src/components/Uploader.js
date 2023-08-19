import { useState } from 'react';
import { useMutation } from 'react-query';
import { uploadAndIndexPhoto, recognizeFaces } from '../api/photo';

export const Uploader = () => {
  const [comment, setComment] = useState('');
  const [posterName, setPosterName] = useState('');
  const [files, setFiles] = useState(null);
  const [recognizedFaces, setRecognizedFaces] = useState([]);

  const uploadMutation = useMutation(uploadAndIndexPhoto, {
    onSuccess(data) {
      console.log('Upload result:', data);
    },
  });

  const recognizeMutation = useMutation(recognizeFaces, {
    onSuccess(data) {
      setRecognizedFaces(data.faces || []);
    },
  });

  const handleUploadSubmit = () => {
    const formData = new FormData();
    Object.values(files).forEach((file) => formData.append('file', file));
    formData.append('comment', comment);
    formData.append('posterName', posterName);
    uploadMutation.mutate(formData);
  };

  const handleRecognizeSubmit = () => {
    const formData = new FormData();
    Object.values(files).forEach((file) => formData.append('file', file));
    recognizeMutation.mutate(formData);
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-md space-y-4">
      <form className="space-y-4">
        <p className="text-lg font-semibold">Upload Files</p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full rounded-md"
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={posterName}
          onChange={(e) => setPosterName(e.target.value)}
          className="border p-2 w-full rounded-md"
        />
        <button type="button" onClick={handleUploadSubmit} className="bg-blue-500 text-white p-2 rounded-md w-full">
          Upload
        </button>
      </form>
      <form className="space-y-4">
        <p className="text-lg font-semibold">Search for Recognized Faces</p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border p-2 rounded-md"
        />
        <button type="button" onClick={handleRecognizeSubmit} className="bg-green-500 text-white p-2 rounded-md w-full">
          Search
        </button>
      </form>
      <div>
        <h2 className="text-lg font-semibold">Recognized Faces</h2>
        {recognizedFaces.map((face, index) => (
          face ? (
            <div key={index} className="flex items-center space-x-4">
              <img src={face.imageUrl} alt="Recognized Face" className="w-16 h-16 rounded-md" />
              <div>
                <p>Comment: {face.comments.join(', ')}</p>
                <p>Poster Name: {face.posterName}</p>
              </div>
            </div>
          ) : (
            <p key={index}>No face matched</p>
          )
        ))}
      </div>
    </div>
  );
};
