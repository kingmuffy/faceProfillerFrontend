import { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { uploadAndIndexPhoto, recognizeFaces } from '../api/photo';
import PhotoCard from './PhotoCard';

export const Uploader = () => {
  const [comment, setComment] = useState('');
  const [posterName, setPosterName] = useState('');
  const [topic, setTopic] = useState('');
  const [files, setFiles] = useState(null);
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const fileInputRef = useRef();

  const resetFields = () => {
    setComment('');
    setPosterName('');
    setTopic('');
    setFiles(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadMutation = useMutation(uploadAndIndexPhoto, {
    onMutate: () => {
      toast.info('Uploading...');
    },
    onSuccess: (data) => {
      toast.success('File uploaded successfully!');
      resetFields();
    },
    onError: () => {
      toast.error('Failed to upload the file');
      resetFields();
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
      resetFields();
    },
  });

  const handleUploadSubmit = () => {
    const formData = new FormData();
    Object.values(files).forEach((file) => formData.append('file', file));
    formData.append('comment', comment);
    formData.append('posterName', posterName);
    formData.append('topic', topic);
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
        toast.error('File size should not exceed 1MB');
        return;
      }
    }

    setFiles(selectedFiles);
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-md space-y-4">
      <form className="space-y-4">
        <p className="text-lg font-semibold">Upload Files</p>
        <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} className="border p-2 rounded-md" />
        <input type="text" placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)} className="border p-2 w-full rounded-md" />
        <input type="text" placeholder="Enter your name" value={posterName} onChange={(e) => setPosterName(e.target.value)} className="border p-2 w-full rounded-md" />
        <input type="text" placeholder="Enter a topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="border p-2 w-full rounded-md" />
        <button type="button" onClick={handleUploadSubmit} className="bg-blue-500 text-white p-2 rounded-md w-full">
          Upload
        </button>
      </form>
      <form className="space-y-4">
        <p className="text-lg font-semibold">Search for Recognized Faces</p>
        <input type="file" multiple onChange={handleFileChange} className="border p-2 rounded-md" />
        <button type="button" onClick={handleRecognizeSubmit} className="bg-green-500 text-white p-2 rounded-md w-full">
          Search
        </button>
      </form>
      <div>
        <h2 className="text-lg font-semibold">Recognized Faces</h2>
        {recognizedFaces.map((face, index) => (
          face ? (
            <PhotoCard key={index} imageUrl={face.imageUrl} comments={face.comments.join(', ')} posterName={face.posterName} />
          ) : (
            <p key={index}>No face matched</p>
          )
        ))}
      </div>
    </div>
  );
};
