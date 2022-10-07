<template>
    <h2 style="color: var(--navcolor); text-align: center; padding: .5rem;">Emplacement Exact</h2> 
    <div id='map' ref="mapRef">
      <div class="btn">
        <i @click="satelite" class="material-symbols-outlined" v-if="normalvue">satellite_alt</i>
      <i @click="normal" class="material-symbols-outlined" v-else>map</i>
      </div>
      </div> 
</template>
 
<script>
import { onMounted, onUpdated, ref } from 'vue' 
import tt from '@tomtom-international/web-sdk-maps'
import {services} from '@tomtom-international/web-sdk-services'

const reverseGeocoding = (marker, popup)=>{
    services.reverseGeocode({ 
        key: 'LewEOWy1BOVXQS06aFf5gX65MsCcivvw', 
        position: marker.getLngLat() 
    }).then(result=>{ 
        popup.setHTML(result.addresses[0].address.freeformAddress); 
    }) 
}

const addMarker = async (map, emp, coordinate)=>{
  let location = []
  if (coordinate){ location = coordinate.map(c => parseFloat(c)) }
  else{
    const url = `https://api.tomtom.com/search/2/geocode/${emp}.json?key=LewEOWy1BOVXQS06aFf5gX65MsCcivvw&contrySet=CI`
    let res = await fetch(url)
    res = await res.json()
    location = Object.values(res?.results[0]?.position)
  }
  location = location.reverse()
  let popupOffset = 25;
  let marker = new tt.Marker().setLngLat(location).addTo(map); 
  let popup = new tt.Popup({ offset: popupOffset });
  reverseGeocoding(marker, popup); 
  marker.setPopup(popup).togglePopup();
}

export default { 
  name: 'Map',
  props: ['emp', 'coordinate'],
  setup(props) {
    const mapRef = ref(null);
    let map = null
    let normalvue = ref(true)

    const satelite = ()=>{
      map = tt.map({
      key: 'LewEOWy1BOVXQS06aFf5gX65MsCcivvw', 
      container: mapRef.value,
      style: `https://api.tomtom.com/style/1/style/*?map=2/basic_street-satellite&poi=2/poi_dynamic-satellite&key=LewEOWy1BOVXQS06aFf5gX65MsCcivvw` 
      })
      map.addControl(new tt.FullscreenControl()); 
      map.addControl(new tt.NavigationControl());
      addMarker(map, props?.emp, props?.coordinate)
      normalvue.value = false
    }

    const normal = ()=>{
      map = tt.map({
      key: 'LewEOWy1BOVXQS06aFf5gX65MsCcivvw', 
      container: mapRef.value,
      })
      map.addControl(new tt.FullscreenControl()); 
      map.addControl(new tt.NavigationControl());
      addMarker(map, props?.emp, props?.coordinate)
      normalvue.value = true
    }
    onMounted(async () => {
      normal()
    })

    return { 
      mapRef,satelite, normal, normalvue
    }; 
  }  
}
</script>

<style scoped>
div.btn{
  color: var(--blue);
  cursor: pointer;
  position: absolute;
  z-index: 999;
  top: 5px;
  left: 0;
  font-size: 30px;
}

div.btn i {
  margin: 5px;
}
</style>
<style> 
  #map {
    height: 70vh; 
    width: 90vw;
    margin: 2rem auto;
    border-radius: 1rem;
  } 
</style>