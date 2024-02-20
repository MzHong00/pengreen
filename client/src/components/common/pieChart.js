import { useEffect, useRef } from "react"
import Chart from 'chart.js/auto'


export default function PieChart({ data }) {
    const canvasRef = useRef();

    useEffect(() => {
        const config = {
            type: 'pie',
            data: {
                labels: data.map((value, idx) => value.content),
                datasets: [{
                    data: data.map((value, idx) => value.count === 0 ? 0.0001 : value.count),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(201, 203, 207, 0.8)'
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
                    hoverOffset: 4,
                    minBarLength: 5
                }]
            },
            options: {
                maintainAspectRatio: false, // 종횡비 유지 안함
                plugins: {
                    datalabels: {
                        formatter: function(value, context) {
                            if (value === 0) {
                                return value;
                            } else {
                                return 1; // 예시로 소수점 2자리까지 표시
                            }
                        }
                    },
                    legend: {
                        position: 'left', // 라벨을 오른쪽에 표시
                        labels: {
                            font: {
                                size: 12 // 라벨 크기 조정
                            }
                        }
                    },
                },
            }
        };

        const chart = new Chart(canvasRef.current, config);

        return () => {
            chart.destroy();
        }
    }, [data])

    return <canvas ref={canvasRef}></canvas>
}