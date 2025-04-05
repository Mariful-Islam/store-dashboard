import React from 'react'
import ZingChart from 'zingchart-react';


export default function SellsChart() {
  const theme = localStorage.getItem('theme')
  
  const chartConfig = {
    type: 'area', // Type of chart (line chart in this case)
    series: [
      {
        values: [33, 20, 30, 40, 22, 11, 15, 34, 56, 21, 16, 5, 45, 38, 27], // Data for the series
        tooltip: {
          text: "%v taka \n day %k",  // Tooltip text format (you can use %value or any other placeholder)
          backgroundColor: "#2196F3",  // Set background color
          borderRadius: "5px",  // Set border radius for rounded corners
          fontSize: "16px",  // Set font size
          fontWeight: "bold",
          fontColor: "#fff",  // Set font color
          padding: "10px",  // Set padding around the text
          shadow: true,  // Add shadow effect to tooltip
          shadowColor: "#000",  // Shadow color
          shadowBlur: "8",  // Shadow blur intensity
        }
      },
    ],
    scaleX: {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], // X-axis labels
      label: {
        text: 'Date',
        color: '#2196F3'
      },
      value: {
        color: 'black'
      }
    },
    scaleY: {
      label: {
        text: 'Taka', // Y-axis label
        color: '#2196F3',
        fontWeight: 'bold',
        lineColor: '#2196F3'
      },
      
    },

    backgroundColor: theme === 'dark' ? '#0F172A' : '',


  };


  return (
    <div className='bg-white p-4 border border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900'>
      <h2 className='text-lg font-bold text-center'>Everyday Sells Report</h2>
      <ZingChart data={chartConfig} height={400} width='100%' />
    </div>
  )
}
