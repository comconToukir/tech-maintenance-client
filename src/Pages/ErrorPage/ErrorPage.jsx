import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='my-36 text-center'>
      <h1 className='text-5xl my-9'>Oops!!! An error has Occurred.</h1>
      <Link to={-1} className='btn-success py-2 px-6 rounded-md'>Go back</Link>
    </div>
  );
};

export default ErrorPage;