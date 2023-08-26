import { QueryClient, QueryClientProvider } from 'react-query';
import { Uploader } from './components/Uploader';
import PhotosList from './components/PhotosList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, useTheme } from './components/ThemeContext'; 
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
function App() {
  const { theme } = useTheme(); // Get the theme from the context

  return (
    <div 
      className={`
        ${theme === 'dark' ? 'bg-gray-800 text-white bg-site bg-no-repeat bg-cover' : 'bg-gray-100 text-black'}
        overflow-hidden min-h-screen flex flex-col
      `}
    >
      <QueryClientProvider client={queryClient}>     
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Uploader  className="mb-8"/>
          <PhotosList />
        </main>
        <Footer />
        <ToastContainer />
      </QueryClientProvider>
    </div>
  );
}



function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWrapper;
