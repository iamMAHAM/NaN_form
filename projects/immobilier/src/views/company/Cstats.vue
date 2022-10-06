<template>
  <div id="app"></div>
</template>

<script>
import { h, onMounted, onUpdated, ref, watchEffect } from 'vue'
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
    const totalAds = ref(props.data.totalsAds)
    const online = ref(props.data.online)
    const solded = ref(props.data.solded)
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
          label: 'total',
          backgroundColor: 'blue',
          data: totalAds.value
        },
        {
          label: 'online',
          backgroundColor: 'darkgray',
          data: online.value
        },
        {
          label: 'solded',
          backgroundColor: 'green',
          data: solded.value
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          suggestedMax: 200,
          ticks: {
            min: 0,
            max: 2000,
            stepSize: 10,
            reverse: false,
            beginAtZero: true
          }
        }
      }
    }
    onMounted(()=>{
      totalAds.value = props.data.totalsAds
      online.value = props.data.online
      solded.value = props.data.solded
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