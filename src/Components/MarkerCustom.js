/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useObserver } from "mobx-react-lite";


import {Marker} from 'google-maps-react';

import GeneralStore  from "../Stores/GeneralStore";

const general =  GeneralStore;



const  MarkerCustom  = ({address,place_id,location,urlIcon,types}) => {
 

    return useObserver(() =>
  
            <Marker
                title={address}
                address={address}
                place_id={place_id}
            onClick={e => {

              let latlng = general.LocationSelect.place_id === e.place_id;
              general.openInfo = latlng  ? false : true;
              general.setSelecetLocation({address,place_id,location,types})

            }}
            icon={{
              url: urlIcon,
              size: { width: 30, height: 30 },
              anchor: { x: 30, y: 30 },
              scaledSize: { width: 30, height: 30 }
            }}
            position={latlng}/>)
    
}



export default MarkerCustom