/* eslint-disable react/react-in-jsx-scope */
import { makeAutoObservable, toJS} from "mobx"
import { geocodeByAddress,getLatLng} from 'react-places-autocomplete';

import General from "../api/General";

class GeneralStore {
    mapCenter = {}
    myLoaction = {};
    currentSelect = {}
    listCategorySreach = [];
    listCategory = [];
    nameAddress = "";
    listLocation = []
    locationSelect = {}
    searchResult = []
    editText = '';
    address = '';
    latlng = [];
    locationSreach = [];
    openInfo = false;
    
      
    constructor() {
        makeAutoObservable(this)
    }

    async getListData(){
        let old_obj = JSON.parse(localStorage.getItem("listLocations"))
        if(old_obj === null){
            localStorage.setItem("listLocations",JSON.stringify([]))
        }else{
            this.listLocation =  old_obj
            this.getCategory()
        }
            
    }
    async getUserLocation() {
        let currentLocation = await General.currentLocation();
        
        const { latitude, longitude } = currentLocation.coords;
        this.mapCenter = { lat: latitude, lng: longitude };
        let res = await General.selectLocations([latitude,longitude])
        this.myLoaction = { ...res}
        this.setSelecetLocation(res)
      }
    
    async SreachPlace(text){
        this.address = text

      let res = await  General.searchPlace(text)
      this.searchResult = res.predictions
    }

    async selectLocations(text){
        let res = await  General.selectLocations(text);
        this.searchResult = []
        this.mapCenter = res.location;
        this.address = res.address

        this.setSelecetLocation(res)
      }
    async setSelecetLocation({address,location,types, place_id}){
        this.locationSelect = { address,
            location,
            types,
            place_id,}
    }
     
    async addLocation(place_id){
        let listLocations = localStorage.getItem("listLocations")
        console.log(typeof listLocations)
        if( listLocations === null){
            localStorage.setItem("listLocations",JSON.stringify([this.locationSelect]))
            listLocations = localStorage.getItem("listLocations")
        }

            let old_obj = JSON.parse(listLocations)
            let indexOf =  old_obj.findIndex((item,i)=>item.place_id === place_id)

                indexOf < 0 ? old_obj.push(this.locationSelect) : old_obj.splice(indexOf,1);
                this.listLocation = old_obj;
                localStorage.setItem("listLocations",JSON.stringify(old_obj))
                this.getCategory()
        }
        async removeLocation(indexOf){
            let old_obj = JSON.parse(localStorage.getItem("listLocations"))

            old_obj.splice(indexOf,1);
                    this.listLocation = old_obj;
                    localStorage.setItem("listLocations",JSON.stringify(old_obj))
                    this.getCategory()

        }

        async updateLocation(indexOf,text){
            let old_obj = JSON.parse(localStorage.getItem("listLocations"))

            old_obj[indexOf].address = text
           this.listLocation = old_obj
           this.locationSelect.address = text
                    localStorage.setItem("listLocations",JSON.stringify(old_obj))
    
        }
            
        async searchByType(){
            let res = await General.searchByType(this.mapCenter,['zoo'])
        }

        async getCategory(){
            let listCategory = [];
            let  list = JSON.parse(localStorage.getItem("listLocations"))
         list &&  await list.map((e)=> {
                e.types.map((type)=>{
                    if(!listCategory.includes(type)){
                        listCategory.push(type)
                    }
                })
            })

            this.listCategory = listCategory
        }

        

        async fillterCateGory(name){
            let obj = this.listCategorySreach;
            let indexOf =  obj.findIndex((e)=> e === name);
            console.log(indexOf);
            indexOf < 0  ? obj.push(name) : obj.splice(indexOf,1)
            
            this.listCategorySreach =  obj
            let old_obj = JSON.parse(localStorage.getItem("listLocations"));
            let newList  =  []
            this.listCategorySreach.length > 0 &&
            old_obj.map((loop,i)=> {
                loop.types.map((type)=>{
                    this.listCategorySreach.map(cate=>{
                        if(type === cate){
                            newList.push(loop)
                        }
                    })
                })
                
            })
            this.listLocation =  this.listCategorySreach.length  === 0 ?  old_obj : newList
            
        }
     
}





export default  new GeneralStore();
