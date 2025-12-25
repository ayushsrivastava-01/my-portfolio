// src/components/Analytics.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// YAHAN APNA MEASUREMENT ID DALDO
const GA_TRACKING_ID = "G-LMWS0J5RGC"; 

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID);
    console.log('Google Analytics initialized');
  }, []);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: document.title
    });
    console.log('Page tracked:', location.pathname);
  }, [location]);

  return null;
}

export default Analytics;