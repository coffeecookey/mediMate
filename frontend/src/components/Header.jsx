import React from 'react'
import { useNavigate } from 'react-router-dom';
import { header_img, rtarrow } from '../assets/assets';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='w-full bg-primary py-12 md:py-16 lg:py-20'>
      <div className=' max-w-7xl mx-auto px-6 md:px-10 lg:px-20'>
        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
          
          {/*---------------------------- Left Text Section ------------------------------*/}
          <div className='flex-1 flex flex-col items-start justify-center gap-6 p-8 md:p-12 rounded-3xl transform hover:scale-[1.02] hover:shadow-3xl transition-all duration-500 ease-out animate-fade-in-up'>
            <div className='space-y-4'>
              <h1 className='text-6xl md:text-4xl lg:text-5xl text-white font-bold leading-tight animate-slide-in-left'>
                Welcome to 
                <span className='text-7xl block font-extrabold bg-gradient-to-r from-teal-100 to-white bg-clip-text text-transparent animate-pulse-subtle'>
                  MediMate
                </span>
              </h1>
              
              <p className='text-teal-100 md:text-3xl font-medium animate-slide-in-left animation-delay-200'>
                From chat to checkup! 💬➡️🏥
              </p>
              
              <p className='text-teal-200 text-sm md:text-xl opacity-90 leading-relaxed animate-slide-in-left animation-delay-400'>
                Your friendly AI health companion, ready to help you navigate your wellness journey with care and expertise.
              </p>
            </div>
            
            <button className='group flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-teal-50 animate-slide-in-left animation-delay-600 relative overflow-hidden' onClick={() => navigate("/chatbot")}>
              <span className='relative text-xl z-10'>Talk to Miffy
              </span>
              <div className='w-7 h-7 bg-primary rounded-full flex items-center justify-center group-hover:bg-teal-700 transition-all duration-300 group-hover: relative z-10'>
                <svg className='w-4 h-4 text-white transform group-hover:translate-x-0.5 transition-transform duration-300' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd' />
                </svg>
              </div>
              
              <div className='absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full'></div>
            </button>
          </div>

          {/* ----------------------Right Image Section----------------------------------- */}
          <div className='flex-1 flex items-center justify-center p-4'>
            <div className='relative animate-fade-in-up animation-delay-300'>
              
              <div className='w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] relative flex items-center justify-center animate-float'>
                <img className='w-full h-full object-contain drop-shadow-2xl filter hover:brightness-110 transition-all duration-300' src={header_img} alt='MediMate mascot' />
              </div>
              
              
              <div className='absolute top-4 right-4 w-6 h-6 bg-pink-300 rounded-full opacity-60 animate-bounce-smooth animate-pulse-glow' style={{animationDelay: '0s'}}></div>
              <div className='absolute bottom-8 left-2 w-4 h-4 bg-yellow-300 rounded-full opacity-60 animate-bounce-smooth animate-pulse-glow' style={{animationDelay: '0.5s'}}></div>
              <div className='absolute top-1/2 -right-2 w-3 h-3 bg-purple-300 rounded-full opacity-60 animate-bounce-smooth animate-pulse-glow' style={{animationDelay: '1s'}}></div>
              
              <div className='absolute top-1/4 -left-4 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-ping' style={{animationDelay: '1.5s'}}></div>
              <div className='absolute bottom-1/4 -right-6 w-5 h-5 bg-green-300 rounded-full opacity-50 animate-spin-slow' style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-smooth {
          0%, 100% { 
            transform: translateY(0px);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-8px);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.6); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-smooth {
          animation: bounce-smooth 2s infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </header>
  );
}

export default Header