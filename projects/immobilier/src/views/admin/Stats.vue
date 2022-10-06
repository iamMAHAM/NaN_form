<template>
  <div id="app"></div>
</template>

<script>
import { h, onUpdated, toRefs } from 'vue'
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
    const { data } = toRefs(props)
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
          data: data.value.users
        },
        {
          label: 'Ads',
          backgroundColor: 'darkgray',
          data: data.value.totalAds
        },
        {
          label: 'Solded Ads',
          backgroundColor: 'green',
          data: data.value.soldedAds
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

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      })
  }
}
</script>