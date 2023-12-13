import { useState, useEffect } from 'react';
import axios from 'axios';
import z from 'zod';
import './Create.css';

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
  const [formSubmitted, setFormSubmitted] = useState(false);

  const postDriver = () => {
    axios
      .post<Driver>('http://localhost:3002/drivers', {
        driverName: driverName,
        racesWon: racesWon,
        favTrack: favTrack,
        teamName: teamName,
        photoURL: photoURL,
        createdAt: createdAt,
      })
      .then(() => {
        setFormSubmitted(true);
        setDriverName('');
        setRacesWon(0);
        setFavTrack('');
        setTeamName('');
        setPhotoUrl('');
      });
  };

  // Reload the page when the form is submitted
  useEffect(() => {
    if (formSubmitted) {
      window.location.reload();
    }
  }, [formSubmitted]);

  return (
    <>
      <h1>Register a Driver!</h1>
      <form className='input-form__wrapper'>
        <input
          className='input'
          type='text'
          name='driverName'
          placeholder='Full Name'
          onChange={(e) => setDriverName(e.target.value)}
        />
        <input
          className='input'
          type='number'
          name='racesWon'
          placeholder='Races Won'
          onChange={(e) => setRacesWon(e.target.valueAsNumber)}
        />
        <input
          className='input'
          type='text'
          name='favTrack'
          placeholder='Favorite Track'
          onChange={(e) => setFavTrack(e.target.value)}
        />
        <input
          className='input'
          type='text'
          name='teamName'
          placeholder='Team Name'
          onChange={(e) => setTeamName(e.target.value)}
        />
        <input
          className='input'
          type='text'
          name='photoUrl'
          placeholder='Photo URL'
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <button onClick={postDriver} type='button'>
          Register driver
        </button>
      </form>
    </>
  );
};
