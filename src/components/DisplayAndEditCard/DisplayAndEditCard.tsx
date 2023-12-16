import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Driver } from '../CreateDriver/Create';
import { useState } from 'react';

import Style from './DisplayAndEditCard.module.css'

export const DisplayAndEditCard = () => {
  const { id } = useParams();
  const [driverName, setDriverName] = useState('');
  const [racesWon, setRacesWon] = useState(0);
  const [favTrack, setFavTrack] = useState('');
  const [teamName, setTeamName] = useState('');
  const [photoURL, setPhotoUrl] = useState('');
  const [driverDeleted, setDriverDeleted] = useState(false);
  const [driverEdit, setDriverEdit] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ['driver', id],
    queryFn: () => axios.get<Driver[]>(`http://localhost:3002/drivers/${id}`).then((response) => response.data),
  });

  const setDriver = (data: Driver) => {
    const { driverName, racesWon, favTrack, teamName, photoURL } = data;
    setDriverEdit(true);
    setDriverName(driverName);
    setRacesWon(racesWon);
    setFavTrack(favTrack);
    setTeamName(teamName);
    setPhotoUrl(photoURL);
  };

  const editDriver = useMutation({
    mutationFn: async () => {
      await axios.put(`http://localhost:3002/drivers/${id}`, {
        driverName,
        racesWon,
        favTrack,
        teamName,
        photoURL,
        createdAt: data![0].createdAt,
      });
    },
    onSuccess: () => {
      setDriverEdit(false);
      window.location.reload();
    },
    onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessages = error.response.data.error.map((error: { message: unknown; }) => error.message);
          alert(errorMessages);
        } else {
          alert("An unexpected error occurred");
        }
      }
  });

  const deleteDriver = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:3002/drivers/${id}`);
    },
    onSuccess: () => {
      setDriverDeleted(true);
      setTimeout(() => {
        window.location.href = 'http://localhost:5174/drivers'
      }, 2000);
    },
  });

  return (
    <div className={Style.driverWrapper}>
      {isPending && <h2>Loading...</h2>}
      {error && <h2>Error: {error.message}</h2>}
      {driverDeleted && <h2>Driver deleted successfully!</h2>}
      {data && !driverDeleted && !driverEdit && (
        <div className={Style.driverItemWrapper}>
          <div className={Style.driverItem}>
            <div className={Style.photoWrapper}>
              <img src={data[0].photoURL} className={Style.photoURL} alt={data[0].driverName} />
            </div>
            <div className={Style.driverInfoWrapper}>
              <h2 className={Style.headingMain}>Driver Name</h2>
              <h3 className={Style.heading1}>{data[0].driverName}</h3>
              <hr />
              <h2 className={Style.heading3}>Races Won</h2>
              <h3 className={Style.heading2}>{data[0].racesWon}</h3>
              <hr />
              <h2 className={Style.heading3}>Favorite Track</h2>
              <h3 className={Style.heading2}>{data[0].favTrack}</h3>
              <hr />
              <h2 className={Style.heading3}>Racing Team</h2>
              <h3 className={Style.heading2}>{data[0].teamName}</h3>
              <hr />
              <h2 className={Style.heading3}>Joined the Site</h2>
              <p className={Style.heading2}>{data[0].createdAt}</p>
            </div>
            <div className={Style.buttonWrapper}>
              <button onClick={() => setDriver(data[0])}>Edit</button>
              <button onClick={() => deleteDriver.mutate()}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {driverEdit && (
        <div className={Style.driverItemWrapper}>
          <div className={Style.driverItem}>
            <div className={Style.editFormWrapper}>
              <input type='text' value={driverName} onChange={(e) => setDriverName(e.target.value)} />
              <input type='number' value={racesWon} onChange={(e) => setRacesWon(Number(e.target.value))} />
              <input type='text' value={favTrack} onChange={(e) => setFavTrack(e.target.value)} />
              <input type='text' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
              <input type='text' value={photoURL} onChange={(e) => setPhotoUrl(e.target.value)} />
            </div>
            <button onClick={() => editDriver.mutate()}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};