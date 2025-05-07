import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DataForm from '../components/DataForm';
import Preview from '../components/Preview';

function Home() {
  return (
    <div>
        <DataForm />
        <Preview />
    </div>
  )
}

export default Home;