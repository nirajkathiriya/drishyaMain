import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from '../../services/i18nService';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentLanguageInfo, supportedLanguages, setLanguage } = useTranslation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/20 hover:border-purple-400/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
      >
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-1.5 rounded-lg">
          <Globe className="h-4 w-4 text-white" />
        </div>
        <span className="text-xl">{currentLanguageInfo.flag}</span>
        <span className="hidden sm:block text-sm font-semibold">{currentLanguageInfo.nativeName}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-72 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-white/20 py-3 z-50 animate-fade-in-up">
          <div className="px-5 py-3 border-b border-white/10">
            <p className="text-sm font-bold text-purple-400 uppercase tracking-wide flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Select Language
            </p>
          </div>
          
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {supportedLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center space-x-4 px-5 py-4 text-left hover:bg-white/10 transition-all duration-200 group ${
                  currentLanguageInfo.code === language.code 
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-l-4 border-purple-500' 
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{language.flag}</span>
                <div className="flex-1">
                  <div className="font-semibold text-base">{language.nativeName}</div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300">{language.name}</div>
                </div>
                {currentLanguageInfo.code === language.code && (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-purple-400">ACTIVE</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <div className="px-5 py-3 border-t border-white/10">
            <p className="text-xs text-gray-400 text-center">
              More languages coming soon!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}