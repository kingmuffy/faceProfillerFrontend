import { QueryClient, QueryClientProvider } from 'react-query';
import { Uploader } from './components/Uploader';
import PhotosList from './components/PhotosList';
import { Header } from './components/Header'; // Import the Header component

const queryClient = new QueryClient();

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Header /> {/* Add the Header component */}
        <div className="container mx-auto px-4 py-8">
          <Uploader />
          <PhotosList />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
