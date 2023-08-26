import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

export const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [focused, setFocused] = useState(false);

    const commonButtonClasses = `transition duration-300 ease-in-out ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-2 rounded-md`;

    return (
        <nav className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} py-4 shadow-md`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="font-bold text-2xl mr-8">Trust Guard</div>
                <div className="flex space-x-4 items-center">
                    <button 
                        className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-black hover:text-gray-600'} ${commonButtonClasses}`}
                        style={focused ? { outline: 'none' } : {}}
                        onClick={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    >
                        Questionnaire
                    </button>
                    <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-300'} mx-2`}>|</span>
                    <button 
                        className={commonButtonClasses}
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
            </div>
        </nav>
    );
};
