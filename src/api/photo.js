const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/';

export const uploadAndIndexPhoto = (body) => 
  fetch(`${API_URL}`, {
    method: 'POST',
    body,
  })
  .then(response => response.json())
  .catch(error => { console.error('Error uploading and indexing photo:', error); });

export const recognizeFaces = (body) =>
  fetch(`${API_URL}index`, {
    method: 'POST',
    body,
  })
  .then(response => response.json())
  .catch(error => { console.error('Error recognizing faces:', error); });


  export const fetchPhotos = () => fetch(`${API_URL}`).then((res)=>res.json())
  