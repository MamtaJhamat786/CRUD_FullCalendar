import React from 'react';

import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventCalendar from './components/EventCalendar';
import NavBar from './components/NavBar';
import { useMediaQuery } from 'react-responsive';
import Calendar from './components/Calendar';
import SideBar from './components/SideBar';
import CreateEvent from './components/EventInfoModal';


const queryClient = new QueryClient()

function App() {
  const isMobile = useMediaQuery({ query: `(max-width: 826px)` });
  return (
    <div className="App" style={{height: '100vh'}}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <NavBar/>
            <div className="d-flex">  
              <div style={{display: isMobile? 'none': 'flex'}}>
                <SideBar/>
                  <hr className="border-gray" style={{border: '0.5px solid', marginTop: 0}}/>
                  <EventCalendar/>
              </div>
              <Routes>
                <Route path="/event/:id" Component={CreateEvent}/>
              </Routes>
              <Calendar/>
              </div>
            </Router>
        </QueryClientProvider>
    </div>
  );
}

export default App;
