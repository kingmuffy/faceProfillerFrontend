import { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useTheme  } from './ThemeContext';
import { uploadAndIndexPhoto, recognizeFaces } from '../api/photo';
import PhotoCard from './PhotoCard';
import { AiOutlineUpload, AiOutlineSearch } from 'react-icons/ai'; 

export const Uploader = () => {
  const [formData, setFormData] = useState({
    comment: '',
    posterName: '',
    topic: '',
    files: null,
  });
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const fileInputRef = useRef();
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const inputStyle = `border ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'} p-2 w-full rounded-md`;

  const resetFields = () => {
    setFormData({
      comment: '',
      posterName: '',
      topic: '',
      files: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const maxFileSize = 1024 * 1024; // 1MB

    if ([...files].some(file => file.size > maxFileSize)) {
      toast.error('File size should not exceed 1MB');
      return;
    }
    setFormData(prev => ({ ...prev, files }));
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
    const data = new FormData();
    formData.files && [...formData.files].forEach(file => data.append('file', file));
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'files') {
        data.append(key, value);
      }
    });
    uploadMutation.mutate(data);
  };

  const handleRecognizeSubmit = () => {
    if (!formData.files || formData.files.length === 0) {
      toast.error('Please select an image before searching.');
      return;
    }
    
    const data = new FormData();
    formData.files && [...formData.files].forEach(file => data.append('file', file));
    recognizeMutation.mutate(data);
  };
  

  return (
    <div className={`${bgColor} ${textColor} p-8 shadow-lg rounded-md space-y-6`}>
      <h1 className="text-2xl font-bold mb-4">File Operations</h1>
      
      <form className="space-y-4">
        <p className="text-lg font-semibold flex items-center"><AiOutlineUpload className="mr-2" /> Upload Files</p>
        <div>
          <label className="block text-sm font-medium text-gray-600">Files</label>
          <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} className={`${inputStyle}`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Comment</label>
          <input name="comment" type="text" placeholder="Add a comment" value={formData.comment} onChange={handleInputChange} className={`${inputStyle}`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Your Name</label>
          <input name="posterName" type="text" placeholder="Enter your name" value={formData.posterName} onChange={handleInputChange} className={`${inputStyle}`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Topic</label>
          <input name="topic" type="text" placeholder="Enter a topic" value={formData.topic} onChange={handleInputChange} className={`${inputStyle}`} />
        </div>
        <button type="button" onClick={handleUploadSubmit} className="bg-blue-500 text-white p-2 rounded-md w-full flex items-center justify-center">
          <AiOutlineUpload className="mr-2" /> Upload
        </button>
      </form>
      
      <form className="space-y-4 mt-8">
        <p className="text-lg font-semibold flex items-center"><AiOutlineSearch className="mr-2" /> Search for Recognized Faces</p>
        <div>
          <label className="block text-sm font-medium text-gray-600">Files</label>
          <input type="file" multiple onChange={handleFileChange} className={`${inputStyle}`} />
        </div>
        <button type="button" onClick={handleRecognizeSubmit} className="bg-green-500 text-white p-2 rounded-md w-full flex items-center justify-center">
          <AiOutlineSearch className="mr-2" /> Search
        </button>
      </form>
      
      <div className="mt-8">
  <h2 className="text-lg font-semibold">Recognized Faces</h2>
  {recognizedFaces.length === 0 ? (
    <p>No recognized faces.</p>
  ) : (
    recognizedFaces.map((face, index) => (
      face ? (
        <PhotoCard key={index} imageUrl={face.imageUrl} comments={face.comments.join(', ')} posterName={face.posterName} />
      ) : (
        <p key={index}>No face matched</p>
      )
    ))
  )}
</div>

    </div>
  );
};