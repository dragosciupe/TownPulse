import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const libraries = ["places"];



export default function PlacesAutocomplete(handleSelect){
    const { isLoaded, loadError } = useLoadScript({
  googleMapsApiKey: "YOUR_API_KEY",
 // libraries,
});

if (loadError) return "Error loading maps";
if (!isLoaded) return "Loading maps";
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
      } = usePlacesAutocomplete();
    

    
      return (
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className="combobox-input"
            placeholder="Search an address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      );
    };
