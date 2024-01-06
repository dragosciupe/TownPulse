import { getGeocode, getLatLng } from "use-places-autocomplete";
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import { useRef, useState } from "react";
import { UserData } from "../util/Types";
import {AddEventRequest} from '../../../../backend/src/route_methods/request-types'
import { Form,json,redirect,useRouteLoaderData } from "react-router-dom";
 import { getUserData } from "../util/Methods";
 import classes from '../components/AddEventPage.module.css'
function AddEventPage() {
  const [selectedLat, setSelectedLat] = useState<string>('');
  const [selectedLgn, setSelectedLgn] = useState<string>('');
  async function handleSelect (address){
    
    const results = await getGeocode({address})
    const {lat, lng} = await getLatLng(results[0])
    setSelectedLat(lat.toString());
    setSelectedLgn(lng.toString());
  }
  
 
  return (
    <>
    <div className={classes.Bdiv}>
     <Form method="post" className={classes.addEvForm}>
      <p>
        <label htmlFor="titlu" className={classes.addEvLabel}>Titlu</label>
        <input id="titlu"
                type="text"
                name="titlu"
                required/>
      </p>
      <p>
        <label className={classes.addEvLabel} htmlFor="durata">Durata</label>
        <input id="durata" type="number" name="durata" required/>
      </p>
      <p>
      <label className={classes.addEvLabel} htmlFor="data">Data</label>
      <input  id="data" type="date" name="data" required />
      </p>
      <p>
        <label className={classes.addEvLabel} >Descriere</label>
        <input className={classes.addEvFormDesc} id="descriere" type="text" name="descriere" required />
      </p>
      <p>
        <label className={classes.addEvLabel}>Locatia</label>
         <PlacesAutocomplete onSelect={handleSelect}/>
      </p>
      <button className={classes.addEvBtn}>Creaza eveniment</button>
      <input  hidden  value={selectedLat} name="lat"/>
      <input hidden value={selectedLgn} name="lng"/>
     </Form>
     </div>
    </>
  );
}

export default AddEventPage;

export async function action({request}){
  const userData = getUserData();
  
  const userName = userData!.username;
  const convertDateToTimestamp = (dateString: string): number => {
    const dateObject = new Date(dateString + "T00:00:00Z");
    const timestamp = dateObject.getTime();
    return timestamp;
  };
  
  const data = await request.formData();
  
  
  const coords: [number, number] = [parseFloat(data.get('lat')), parseFloat(data.get('lng'))];

  const eventData={
    creatorUsername: userName,
    title: data.get('titlu'),
    duration: data.get('durata'),
    date: convertDateToTimestamp(data.get("data")),
    description: data.get('descriere'),
    coordinates: coords,

  }
  console.log(eventData);
  const response = await fetch('http://localhost:3000/addEvent',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(eventData)
  }) 
  if(!response.ok){
    throw json({message:"could not save event"},{status:500});
  }
  return redirect('/');
} 