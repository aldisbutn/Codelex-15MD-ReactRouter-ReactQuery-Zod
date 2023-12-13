import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const DisplayAndEditCard = () => {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['driver'],
    queryFn: () => fetch(`http://localhost:3002/drivers/${id}`).then((response) => response.json()),
  });

  if (isPending) {
    return 'Loading...';
  }

  if (error) {
    return 'Driver not Found!';
  }

  return (
    <div className='driver-item__wrapper'>
      <div className='driver-item'>
        <div className='photo-wrapper'>
          <img src={data[0].photoURL} className='photoURL' alt={data[0].driverName} />
        </div>
        <div className='driver-info__wrapper'>
          <h2 className='heading-main'>Driver Name</h2>
          <h3 className='heading-1'>{data[0].driverName}</h3>
          <hr />
          <h2 className='heading-3'>Races Won</h2>
          <h3 className='heading-2'>{data[0].racesWon}</h3>
          <hr />
          <h2 className='heading-3'>Favorite Track</h2>
          <h3 className='heading-2'>{data[0].favTrack}</h3>
          <hr />
          <h2 className='heading-3'>Racing Team</h2>
          <h3 className='heading-2'>{data[0].teamName}</h3>
          <hr />
          <h2 className='heading-3'>Joined the Site</h2>
          <p className='heading-2'>{data[0].createdAt}</p>
        </div>
      </div>
    </div>
  );
};

/*

  const clearEditForm = () => {
    setEditID(null);
    setDriverName('');
    setRacesWon(0);
    setFavTrack('');
    setTeamName('');
    setPhotoUrl('');
  };

  const editDriver = () => {
    if (selectedDriver) {
      axios
        .put(`http://localhost:3002/drivers/${editID}`, {
          driverName,
          racesWon,
          favTrack,
          teamName,
          photoURL,
          createdAt: selectedDriver?.createdAt,
        })
        .then(() => {
          setApiData((prevData) => {
            const updatedData = prevData.map((driver) =>
              driver.id === editID ? { ...driver, driverName, racesWon, favTrack, teamName, photoURL } : driver
            );
            return updatedData;
          });
          clearEditForm();
        });
    }
  };

  const deleteDriver = (driverId: number) => {
    axios.delete(`http://localhost:3002/drivers/${driverId}`).then(() => {
      setApiData((prevData) => prevData.filter((driver) => driver.id !== driverId));
    });
  };


          <div className='button__wrapper'>
            <button onClick={() => setEditID(selectedDriver?.id)}>Edit</button>
            <button onClick={deleteDriver}>Delete</button>
          </div>

          {editID === selectedDriver?.id && (
            <div className='edit-form__wrapper'>
              <input type='text' value={driverName} onChange={(e) => setDriverName(e.target.value)} />
              <input type='number' value={racesWon} onChange={(e) => setRacesWon(Number(e.target.value))} />
              <input type='text' value={favTrack} onChange={(e) => setFavTrack(e.target.value)} />
              <input type='text' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
              <input type='text' value={photoURL} onChange={(e) => setPhotoUrl(e.target.value)} />
              <button onClick={editDriver}>Save</button>
            </div>
          )}
*/
