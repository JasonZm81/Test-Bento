   // src/App.js
   import React from 'react';
   import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
   import Home from './components/Home/home.tsx'; // Ensure the path is correct
   import Menu from './components/Menu/menu.tsx'; // Import the new Menu component
   import Order from './components/Order/Order.tsx'; // Import the new Order component
   import Invoice from './components/Home/Invoice.tsx';
   import Map from './components/Map/Map.js'; // Import the new Map component
   import { NavigationProvider } from './NavigationContext.tsx'; // Import the NavigationProvider
   import MapItem from './components/Map/MapItem.js';

   function App() {
     return (
       <Router>
         <NavigationProvider>
           <div className="App">
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/menu" element={<Menu />} />
               <Route path="/order" element={<Order />} />
               <Route path="/invoice" element={<Invoice />} />
               <Route path="/map" element={<Map />} />
               <Route path="/mapitem" element={<MapItem />} />
             </Routes>
           </div>
         </NavigationProvider>
       </Router>
     );
   }

   export default App;