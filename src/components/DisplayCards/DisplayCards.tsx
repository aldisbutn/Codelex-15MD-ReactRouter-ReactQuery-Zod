import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Style from './DisplayCards.module.css';

import { Driver } from '../CreateDriver/Create';

export const DisplayCards = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => axios.get<Driver[]>('http://localhost:3002/drivers').then((respone) => respone.data),
  });

  return (
    <div className={Style.driverWrapper}>
      {isPending && <h2>Loading...</h2>}
      {error && <h2>Error: {error.message}</h2>}
      {data && (
        <>
          {data.map((driver) => (
            <Link key={driver.id} to={`/drivers/${driver.id}`}>
              <div className={Style.driverItemWrapper}>
                <div className={Style.driverItem}>
                  <div className={Style.photoWrapper}>
                    <img src={driver.photoURL} className={Style.photoURL} alt={driver.driverName} />
                  </div>
                  <div>
                    <h2 className={Style.headingMain}>Driver Name</h2>
                    <h3 className={Style.heading1}>{driver.driverName}</h3>
                    <hr />
                    <h2 className={Style.heading3}>Racing Team</h2>
                    <h3 className={Style.heading2}>{driver.teamName}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
