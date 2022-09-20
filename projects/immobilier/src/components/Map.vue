<template> 
    <h2 style="color: var(--white); text-align: center; padding: .5rem;">Emplacement Exact</h2> 
    <div id='map' ref="mapRef"></div> 
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

const addMarker = async (map, emp)=>{
  if (emp){
    const url = `https://api.tomtom.com/search/2/geocode/${emp}.json?key=LewEOWy1BOVXQS06aFf5gX65MsCcivvw&contrySet=CI`
    let res = await fetch(url)
    res = await res.json()
    const location = Object.values(res?.results[0]?.position).reverse()
    let popupOffset = 25; 
  
    let marker = new tt.Marker().setLngLat(location).addTo(map); 
    let popup = new tt.Popup({ offset: popupOffset });
    reverseGeocoding(marker, popup); 
    marker.setPopup(popup).togglePopup(); 
  }
}

export default { 
  name: 'Map',
  props: ['emp'],
  setup(props) {
    const mapRef = ref(null);
    onMounted(() => {
      let map = tt.map({ 
      key: 'LewEOWy1BOVXQS06aFf5gX65MsCcivvw', 
      container: mapRef.value,
      // style: `https://api.tomtom.com/style/1/style/*?map=2/basic_street-satellite&poi=2/poi_dynamic-satellite&key=LewEOWy1BOVXQS06aFf5gX65MsCcivvw` 

    }); 
      map.addControl(new tt.FullscreenControl()); 
      map.addControl(new tt.NavigationControl());
      addMarker(map, props?.emp)
    })
    onUpdated(()=>
      console.log("updated")
    )
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
    margin: 2rem auto;
    border-radius: 1rem;
  } 
</style>