<template>
  <div id="app"></div>
</template>

<script>
import { h, onMounted, onUpdated, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
    users: {
      type: Array,
      default: () => []
    },
    ads: {
      type: Array,
      default: () => []
    },
    data:{
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const usersData = ref(props.data.users)
    const adsData = ref(props.data.totalAds)
    const soldedData = ref(props.data.soldedAds)
    console.log(usersData.value)
    const chartData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      datasets: [
        {
          label: 'Users',
          backgroundColor: 'blue',
          data: usersData.value
        },
        {
          label: 'Ads',
          backgroundColor: 'darkgray',
          data: adsData.value
        },
        {
          label: 'Solded Ads',
          backgroundColor: 'green',
          data: soldedData.value
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }
    onMounted(()=>{
      console.log("mounted stats")
      usersData.value = props.data.users
      adsData.value = props.data.totalAds
      soldedData.value = props.data.soldedAds
    })
    onUpdated(()=>{
      console.log("update", props.data)
    })

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
}
</script>