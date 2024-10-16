"use client";
import { useState, useEffect } from 'react';

// Dictionary of "World" in various languages
export const worldInDifferentLanguages = {
  english: "World",
  hindi: "दुनिया",
  chinese: "世界",
  japanese: "世界",
  korean: "세계",
  russian: "Мир",
  turkish: "Dünya",
  tamil: "உலகம்",
  bengali: "পৃথিবী",
  gujurati : "દુનિયા",
  kannada : "ಜಗತ್ತು"
};

export default function HelloWorld() {
  const [lang, setLang] = useState("english"); // Set initial language
  const languageKeys = Object.keys(worldInDifferentLanguages); // Array of language keys
  const [currentIndex, setCurrentIndex] = useState(0); // Index to track current language

  useEffect(() => {
    // Cycle through languages every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % languageKeys.length);
      setLang(languageKeys[currentIndex]);
    }, 1500);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [currentIndex, languageKeys]);

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-[100%]">
      <h1 className="text-6xl max-md:text-4xl font-bold transition-all duration-700 ease-in-out transform">
        Hello {worldInDifferentLanguages[lang]}
      </h1>


    <div className='flex flex-col justify-center items-center gap-1'>
      <div className='text-3xl max-md:text-xl max-md:hidden'>
       I am <span className='font-black'>Shivam Jain</span> and I
      </div>
      
      <div className='text-3xl md:hidden'>
       I love to
      </div>

      <div className='text-6xl max-md:text-center'>
        Design. Develop. Deploy.
      </div>
    </div>

    </div>
  );
}

