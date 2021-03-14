/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import { useObserver } from "mobx-react-lite";


import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

import GeneralStore  from "../Stores/GeneralStore";
import { toJS } from "mobx";

const general =  GeneralStore;



const  Home  = (props) => {
 
  useEffect(() => {
    general.getUserLocation();
    general.getCategory()

  }, []);

const checkCatgory = async(item)=>{
  let check = false;
  check = general.listCategorySreach.length === 0 
   general.listCategorySreach.map((e)=>{
    item.types.map((type)=>{
      console.log(toJS(type),toJS(e))

      if(e === type){
        check = true;
        return 
      }
    })
  })

  return 
}

const checkAdd = () => {
  let indexOf =    general.listLocation.findIndex((item,i)=>item.place_id === general.locationSelect.place_id)

  return  <>
  {indexOf >= 0  && <div className="edit">
                      <input type="text" onChange={(e)=> general.editText = e.target.value} value={general.locationSelect.address}/>
                   </div> }
        {indexOf < 0 && general.locationSelect.place_id !== null ? <button onClick={(e)=> general.addLocation(general.locationSelect.place_id)}>Add</button> :
          <div className="btns">
          <button onClick={(e)=> general.updateLocation(indexOf,general.editText)} className="update" >Update</button>
          <button onClick={(e)=> general.removeLocation(indexOf)} className="danger">Remove</button>

          </div>
          }
 
 </>;
 }
  const OnMarker = (e,item)=>{
    let checkOpen = general.locationSelect.place_id === e.place_id
    general.openInfo = checkOpen  ? false : true;
    general.setSelecetLocation(item)
  }

    return useObserver(() =>
    <div className="wapperMap">
             {general.openInfo && 
                <div className="showInfo">
                  {general.listLocation.findIndex((item,i)=>item.place_id === general.locationSelect.place_id) 
                  < 0 &&
                  <p>{general.locationSelect.address}</p>}
                  {checkAdd()}
                </div>}
    <Map google={props.google} 
    center={general.mapCenter}
    zoom={14}>
      <Marker position={general.mapCenter}
       {...general.myLoaction}
      onClick={(e)=> OnMarker(e,general.locationSelect)} >
                 
      </Marker>
    {general.locationSreach.location &&
        <Marker
        title={general.locationSreach.address}
        address={general.locationSreach.address}
        key={general.locationSreach.place_id}
        
        place_id={general.locationSreach.place_id}
        icon={{
          url: "../map-marker.png",
          size: { width: 30, height: 30 },
          anchor: { x: 30, y: 30 },
          scaledSize: { width: 30, height: 30 }
        }}
        onClick={e =>  OnMarker(e,general.locationSreach)}
        position={general.locationSreach.location}/>}
        {general.listLocation.map((item,i)=>
         
            <Marker
                title={item.address}
                address={item.address}
                place_id={item.place_id}
                key={item.place_id}
                onClick={e =>  OnMarker(e,item)}

            icon={{
              url: "../compass.png",
              size: { width: 30, height: 30 },
              anchor: { x: 30, y: 30 },
              scaledSize: { width: 30, height: 30 }
            }}
            position={item.location}/> 
            
       
     )}
     

  </Map>

  </div>
    )
}



export default GoogleApiWrapper({
  
  apiKey: global.apiKey 
})(Home)