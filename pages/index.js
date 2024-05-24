import React,{useState, useEffect, UsContext} from 'react';

//internal imports
import { HeroSection } from '../Components/index';

const HomePage = () => {
  return (
    <div>
    <HeroSection accounts="hey" tokenData="DATA" />
    </div>
  );
};

export default HomePage;
