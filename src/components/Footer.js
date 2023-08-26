import { useTheme } from './ThemeContext';  
export const Footer = () => {
    const { theme } = useTheme();  

    return (
      <footer className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} py-4`}>
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} My App. All Rights Reserved.</p>
        </div>
      </footer>
    );
};
