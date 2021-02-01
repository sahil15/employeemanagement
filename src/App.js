import React, { Suspense } from 'react';
// import { withRouter, Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
import './App.css';
//Pages

const LazyComponent = React.lazy(() => import('./containers/EmployeeCard/EmployeeCard'));

function App() {
  return (
    <div className="app-main">
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent></LazyComponent>
      </Suspense>
    </div>
  );
}


export default App;
