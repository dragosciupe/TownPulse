import { getGeocode, getLatLng } from "use-places-autocomplete";
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import { ChangeEvent, useState } from "react";
import { AddEventRequest, EventType } from "../util/Types";
import { Form, json, redirect } from "react-router-dom";
import { getUserData, getAuthToken } from "../util/Methods";
import classes from "../components/AddEventPage.module.css";

function AddEventPage() {
  const [selectedLat, setSelectedLat] = useState<string>("");
  const [selectedLgn, setSelectedLgn] = useState<string>("");
  const [photo, setPhoto] = useState<string>();

  async function handleSelect(address) {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelectedLat(lat.toString());
    setSelectedLgn(lng.toString());
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;

    const eventImage = fileList?.item(0);
    if (eventImage) {
      loadEventPhoto(eventImage);
    }
  }

  function loadEventPhoto(image: File) {
    const reader = new FileReader();

    reader.onloadend = function () {
      const eventImageBase64 = (reader.result as string).split(",")[1];
      setPhoto(eventImageBase64);
    };

    reader.readAsDataURL(image);
  }

  return (
    <>
      <div className={classes.Bdiv}>
        <Form method="post" className={classes.addEvForm}>
          <p>
            <label htmlFor="titlu" className={classes.addEvLabel}>
              Titlu
            </label>
            <input id="titlu" type="text" name="titlu" required />
          </p>
          <p>
            <label className={classes.addEvLabel} htmlFor="type">
              Tipul
            </label>

            <select name="type" className={classes.addEventSelect}>
              {Object.values(EventType).map((eventType) => (
                <option
                  key={eventType}
                  value={eventType}
                  className={classes.optionStyle}
                >
                  {eventType}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label className={classes.addEvLabel} htmlFor="start_time">
              Ora incepere
            </label>
            <input id="start_time" type="time" name="start_time" required />
          </p>
          <p>
            <label className={classes.addEvLabel} htmlFor="durata">
              Durata
            </label>
            <input id="durata" type="number" name="durata" required />
          </p>
          <p>
            <label className={classes.addEvLabel} htmlFor="data">
              Data
            </label>
            <input id="data" type="date" name="data" required />
          </p>
          <p>
            <label className={classes.addEvLabel}>Descriere</label>
            <input
              className={classes.addEvFormDesc}
              id="descriere"
              type="text"
              name="descriere"
              required
            />
          </p>
          <p>
            <label className={classes.addEvLabel}>Locatia</label>
            <PlacesAutocomplete onSelect={handleSelect} />
          </p>
          <div>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handlePhotoChange}
            />
          </div>
          <button className={classes.addEvBtn}>Creaza eveniment</button>
          <input hidden readOnly value={selectedLat} name="lat" />
          <input hidden readOnly value={selectedLgn} name="lng" />
          <input hidden readOnly value={photo} name="photo" />
        </Form>
      </div>
    </>
  );
}

export default AddEventPage;

export async function action({ request }) {
  const userData = getUserData();

  const userName = userData!.username;
  const convertDateToTimestamp = (dateString: string): number => {
    const dateObject = new Date(dateString + "T00:00:00Z");
    dateObject.setUTCHours(2, 0, 0, 0);
    const timestamp = dateObject.getTime();
    return timestamp;
  };

  const data = await request.formData();

  const coords: [number, number] = [
    parseFloat(data.get("lat")),
    parseFloat(data.get("lng")),
  ];

  const eventData: AddEventRequest = {
    creatorUsername: userName,
    eventType: data.get("type"),
    title: data.get("titlu"),
    startTime: data.get("start_time"),
    duration: data.get("durata"),
    date: convertDateToTimestamp(data.get("data")),
    description: data.get("descriere"),
    coordinates: coords,
    photo: data.get("photo"),
  };

  console.log(eventData);

  const response = await fetch("http://localhost:3000/addEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw json({ message: "could not save event" }, { status: 500 });
  }
  return redirect("/");
}
