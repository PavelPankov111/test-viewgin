import React from 'react'
import ReactApexChart from 'react-apexcharts'

// вот наш круговой график, он принимает 1 пропс - props.series и мы используем те же данные, что и для линейного графика 
export class CircularChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: props.series,
            options: {
                cricularChart: {
                    type: 'donut',
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
        };
    }

    render() {
        return (
            <div id="cricularChart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
            </div>
        );
    }
}