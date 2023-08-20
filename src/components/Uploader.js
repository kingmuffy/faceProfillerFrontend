import { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { uploadAndIndexPhoto, recognizeFaces } from '../api/photo';

export const Uploader = () => {
  const [comment, setComment] = useState('');
  const [posterName, setPosterName] = useState('');
  const [files, setFiles] = useState(null);
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const fileInputRef = useRef(); // Added ref for file input

  const resetFields = () => {
    setComment('');
    setPosterName('');
    setFiles(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear file input value
    }
  };

  const uploadMutation = useMutation(uploadAndIndexPhoto, {
    onMutate: () => {
      toast.info('Uploading...');
    },
    onSuccess: (data) => {
      console.log('Upload result:', data);
      toast.success('File uploaded successfully!');
      resetFields(); // Reset fields on success
    },
    onError: () => {
      toast.error('Failed to upload the file');
      resetFields(); // Reset fields on error
    },
  });

  const recognizeMutation = useMutation(recognizeFaces, {
    onMutate: () => {
      toast.info('Recognizing faces...');
    },
    onSuccess: (data) => {
      setRecognizedFaces(data.faces || []);
      toast.success('Faces recognized successfully!');
    },
    onError: () => {
      toast.error('Failed to recognize faces');
      resetFields(); // Reset fields on error
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
    const selectedFiles = e.target.files;
    const maxFileSize = 1024 * 1024; // 1MB

    for (const file of selectedFiles) {
      if (file.size > maxFileSize) {
        toast.error('File size should not exceed 1MB'); // Using toast for file size error
        return;
      }
    }

    setFiles(selectedFiles);
  };
  return (
    <div className="bg-white p-8 shadow-lg rounded-md space-y-4">
      <form className="space-y-4">
        <p className="text-lg font-semibold">Upload Files</p>
        <input
          ref={fileInputRef} // Added ref
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
