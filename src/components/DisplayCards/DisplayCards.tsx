import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import './DisplayCards.css';

import { Driver } from '../Create/Create';

export const DisplayCards = () => {
  const [APIdata, setApiData] = useState<Driver[]>([]);

  useEffect(() => {
    axios.get<Driver[]>('http://localhost:3002/drivers').then((response) => {
      const driversWithDate = response.data.map((driver) => ({
        ...driver,
        createdAt: new Date(driver.createdAt).toLocaleString(),
      }));
      setApiData(driversWithDate);
    });
  }, []);

  const driversQuery = useQuery({
    queryKey: ['drivers'],
    queryFn: () => fetch('http://localhost:3002/drivers').then((response) => response.json()),
  });

  if (driversQuery.isLoading) {
    return 'Loading';
  }

  return (
    <div className='driver-wrapper'>
      {APIdata.map((data) => (
        <Link key={data.id} to={`/drivers/${data.id}`}>
          <div className='driver-item__wrapper'>
            <div className='driver-item'>
              <div className='photo-wrapper'>
                <img src={data.photoURL} className='photoURL' alt={data.driverName} />
              </div>
              <div className='driver-info__wrapper'>
                <h2 className='heading-main'>Driver Name</h2>
                <h3 className='heading-1'>{data.driverName}</h3>
                <hr />
                <h2 className='heading-3'>Racing Team</h2>
                <h3 className='heading-2'>{data.teamName}</h3>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
