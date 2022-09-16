<template> 
    <h2 style="color: var(--white)">Emplacement Exact</h2> 
    <div id='map' ref="mapRef"></div> 
</template>
 
<script>
import { onMounted, ref } from 'vue' 
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

const addMarker = async (map, emp)=>{ 

  const url = `https://api.tomtom.com/search/2/geocode/${emp}.json?key=LewEOWy1BOVXQS06aFf5gX65MsCcivvw&contrySet=CI`
  let res = await fetch(url)
  res = await res.json()
  const location = Object.values(res.results[0].position).reverse()
  let popupOffset = 25; 

  let marker = new tt.Marker().setLngLat(location).addTo(map); 
  let popup = new tt.Popup({ offset: popupOffset });
  reverseGeocoding(marker, popup); 
  marker.setPopup(popup).togglePopup(); 
}

export default { 
  name: 'Map',
  setup(props) {
    const mapRef = ref(null);
    console.log(props)
    onMounted(() => {
      let map = tt.map({ 
      key: 'LewEOWy1BOVXQS06aFf5gX65MsCcivvw', 
      container: mapRef.value,
    }); 
      map.addControl(new tt.FullscreenControl()); 
      map.addControl(new tt.NavigationControl());
      addMarker(map, props.location)
    })
 
    return { 
      mapRef, 
    }; 
  }  
}
</script>

<style> 
  #map {
    height: 50vh; 
    width: 75vw;
    margin: 0 auto;
  } 
</style>