import { useState } from 'react';
import axios from 'axios';
import z from 'zod';
import Style from './Create.module.css';
import { useMutation } from '@tanstack/react-query';

const DriverSchema = z.object({
  id: z.number(),
  driverName: z.string(),
  racesWon: z.number(),
  favTrack: z.string(),
  teamName: z.string(),
  photoURL: z.string().url(),
  createdAt: z.string(),
});

export type Driver = z.infer<typeof DriverSchema>;

export const Create = () => {
  const [driverName, setDriverName] = useState('');
  const [racesWon, setRacesWon] = useState(0);
  const [favTrack, setFavTrack] = useState('');
  const [teamName, setTeamName] = useState('');
  const [photoURL, setPhotoUrl] = useState('');
  const [createdAt] = useState(new Date().toLocaleString());
  const [driverCreated, setDriverCreated] = useState(false);

  const postDriver = useMutation({
    mutationFn: async () => {
      await axios.post<Driver>('http://localhost:3002/drivers', {
        driverName,
        racesWon,
        favTrack,
        teamName,
        photoURL,
        createdAt,
      });
      setDriverName('');
      setRacesWon(0);
      setFavTrack('');
      setTeamName('');
      setPhotoUrl('');
    },
    onSuccess: () => {
      setDriverCreated(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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

  return (
    <div className={Style.wrapper}>
      {driverCreated && <h1>Driver created!</h1>}
      {!driverCreated && (
        <>
          <h1>Register a Driver!</h1>
          <form className={Style.inputFormWrapper}>
            <input
              className={Style.input}
              type='text'
              name='driverName'
              placeholder='Full Name'
              required 
              onChange={(e) => setDriverName(e.target.value)}
            />
            <input
              className={Style.input}
              type='number'
              name='racesWon'
              placeholder='Races Won'
              required
              onChange={(e) => setRacesWon(e.target.valueAsNumber)}
            />
            <input
              className={Style.input}
              type='text'
              name='favTrack'
              placeholder='Favorite Track'
              required
              onChange={(e) => setFavTrack(e.target.value)}
            />
            <input
              className={Style.input}
              type='text'
              name='teamName'
              placeholder='Team Name'
              onChange={(e) => setTeamName(e.target.value)}
            />
            <input
              className={Style.input}
              type='text'
              name='photoUrl'
              placeholder='Photo URL'
              required
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <button onClick={() => postDriver.mutate()} type='button'>
              Register driver
            </button>
          </form>
        </>
      )}
    </div>
  );
};
