"use client";
import {APIProvider, Map,AdvancedMarker,Marker} from '@vis.gl/react-google-maps';

export default function Mapp(){
const position = {lat: 45.7538355, lng:21.2257474}
const position2 = {lat: 45.74439239501953, lng:21.214813232421875}

const api="AIzaSyDxQPtW3H3CMap8ojzAP7mLEcSS-yy9YnQ";
return(
    <>
        <APIProvider apiKey='AIzaSyDxQPtW3H3CMap8ojzAP7mLEcSS-yy9YnQ'>
           <div style={{height: '100vh'}}> 
            <Map zoom={9} center={position}>
                <Marker position={position2}></Marker>
            </Map>
            </div>
        </APIProvider>
    </>
)
}