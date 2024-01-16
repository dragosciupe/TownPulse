import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function PlacesAutocomplete({ onSelect }) {
  useLoadScript({
    googleMapsApiKey: "AIzaSyDxQPtW3H3CMap8ojzAP7mLEcSS-yy9YnQ",
    libraries: ["places"],
  });

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();
  function handleSelect(address) {
    onSelect(address);
    setValue(address, false);
  }
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Cauta locatia"
        disabled={!ready}
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
}
