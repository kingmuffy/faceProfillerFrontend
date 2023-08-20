import { QueryClient, QueryClientProvider } from 'react-query';
import { Uploader } from './components/Uploader';
import PhotosList from './components/PhotosList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications


const queryClient = new QueryClient();

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <QueryClientProvider client={queryClient}>     
        <Header /> {/* Header component */}
        <main className="container mx-auto px-4 py-8 flex-grow"> {/* Adjust styles here */}
          <Uploader />
          <PhotosList />
        </main>
        <Footer />
        <ToastContainer /> {/* Add the ToastContainer for displaying toast notifications */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
