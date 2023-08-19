import { useState } from 'react';
import { useMutation } from 'react-query';
import { recognizeFaces } from '../api/photo';

export const RecognizeFaceModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState(null);
  const recognizeMutation = useMutation(recognizeFaces, {
    onSuccess(data) {
      console.log('Recognition result:', data);
    },
  });

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleRecognizeSubmit = () => {
    const formData = new FormData();
    Object.values(files).forEach((file) => formData.append('file', file));
    recognizeMutation.mutate(formData);
  };

  return (
    isOpen ? (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-4 rounded-md shadow-md w-1/3">
            <h2 className="text-xl mb-4">Recognize Faces</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-1 rounded-md text-black mb-4"
            />
            <button type="button" onClick={handleRecognizeSubmit} className="bg-blue-500 text-white p-2 rounded-md">
              Recognize
            </button>
            <button onClick={onClose} className="float-right mt-2 text-red-500">Close</button>
          </div>
        </div>
      </div>
    ) : null
  );
};
