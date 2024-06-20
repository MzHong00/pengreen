import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'

export default function BarChart({ data }) {
  const canvasRef = useRef();

  useEffect(() => {
    const config = {
      type: 'bar',
      data: {
        labels: data.map(choice => choice.content),
        datasets: [
          {
            data: data.map(choice => choice.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderRadius: 3,
            borderWidth: 1,
            minBarLength: 5
          }
        ]
      },
      options: {
        scales: {
          x: {
            ticks: {
              stepSize: 1 // 간격을 1로 설정합니다.
            }
          }
        },
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
        },
      }
    }
    const chart = new Chart(canvasRef.current, config);

    return () => {
      chart.destroy();
    }
  }, [data])

  return <canvas ref={canvasRef}></canvas>
}