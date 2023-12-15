import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Driver } from '../CreateDriver/Create';

import Style from './Home.module.css'

export const Home = () => {
  const { data } = useQuery({
    queryKey: ['driverCount'],
    queryFn: () => axios.get<Driver[]>('http://localhost:3002/drivers').then((respone) => respone.data),
  });

  return (
    <>
    <div className={Style.homeWrapper}>
      <h1>Hello, welcome to the driver registry</h1>
      <h3>You can add a new driver, see the ones that are already created or read something about me</h3>
      <h3>{`There are currently ${data?.length} registered drivers`}</h3>
    </div>
    </>
  );
};
