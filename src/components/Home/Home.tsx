import { useEffect, useState } from 'react';
import axios from 'axios';

export const Home = () => {
  const [driverCount, setDriverCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3002/drivers').then((response) => {
      setDriverCount(response.data.length);
    });
  });

  return (
    <div>
      <h1>Hello, welcome to the driver registry</h1>
      <h3>You can add a new driver, see the ones that are already created or read something about me</h3>
      <h3>{`There are currently ${driverCount} registered drivers`}</h3>
    </div>
  );
};
