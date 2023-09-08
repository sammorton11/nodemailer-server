import { useState } from 'react'
import './App.css'

function App() {

   interface FormData {
      subject: string,
      email: string,
      message: string
   }

   const [formData, setFormData] = useState<FormData>({
         subject: '',
         email: '',
         message: '',
   });

   function handleForm(event: React.ChangeEvent<HTMLInputElement>) {
      const {name, value} = event.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   }

   function handleSubmit() {
      // Define the URL for your backend
      const url = 'http://localhost:8000/send-email';

      // Create an options object for the fetch request
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
      };

      // Make the POST request using fetch
      fetch(url, options)
         .then(response => {
            if (!response.ok) {
               throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
         })
         .then(data => {
            console.log("Success");
            console.log(data.message);
         })
         .catch(error => {
            console.error('Error:', error);
         });
   }

   return (
      <>
         <div
            style={{
               display: 'flex',
               flexDirection: 'column',
               width: '420px',
               padding: '69px'
            }}>
            <h2>Contact</h2>
            <input 
               onChange={handleForm} 
               value={formData.subject} 
               style={{ margin: '10px', padding: '8px' }} 
               placeholder='Subject' 
               name='subject'>
            </input>
            <input 
               onChange={handleForm} 
               value={formData.email} 
               style={{ margin: '10px', padding: '8px' }} 
               placeholder='Email' 
               name='email'>
            </input>
            <input 
               onChange={handleForm} 
               value={formData.message} 
               style={{ margin: '10px', padding: '8px' }} 
               placeholder='Message' 
               name='message'>
            </input>
            <button onClick={handleSubmit} style={{ margin: '10px' }}>Submit</button>
         </div>
      </>
   )
}

export default App
