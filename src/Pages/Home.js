/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import {  Route } from "react-router-dom";
import GeneralStore  from "../Stores/GeneralStore";
import Home from "../Components/Home";

import { toJS } from "mobx";
const general =  GeneralStore;


const setActive = (item)=> {
  return general.listCategorySreach.includes(item) ? 'active' : ''
}
 
const  HomeScreen  = () => {

  useEffect(()=>{
    general.getListData();
    general.searchByType();

   },[])

   const addToSreach = (name)=>{
      general.fillterCateGory(name)

   }
  

    return useObserver(() =>
    <div className="home">
      <div className="wapper">
        <div className={`wapper-sub ${general.checkToggleBar ? "active" : ""}`}>
            <nav>
              <div  className="wapper-search">
            <input 
            value={general.address}
            onChange={(e)=>  general.SreachPlace(e.target.value)}
            placeholder= 'Search Places ...'
                  className='location-search-input'/>
             
            { general.searchResult.length > 0 && <div className="searchResult">
                {general.searchResult.map((item)=> 
                <div className="item" onClick={()=> general.selectLocations(item.description)}>
                    {item.description}
                </div>
                )}
              </div>}
              </div>
      <div className="listCategory">
      {general.listCategory.map((item)=>
        
      <div className={`Category ${setActive(item)}`} onClick={(e)=> addToSreach(item)}>{item}</div>
      )}
      </div>

            </nav>
            <Route exact path="/" component={Home} />

        </div>

      </div>
    </div>
        
    )
}

export default HomeScreen