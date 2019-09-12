import React, { PureComponent } from "react";
import {Bar, ChartData, Line} from "react-chartjs-2";
import {settings} from "./settings";

export enum ChartType  {
    LINE = 'line',
    BAR = 'bar',
}

interface LineChartProps {
    config: {
        values: number[];
        labels: string[];
    };
    type: ChartType
}

export class Chart extends PureComponent<LineChartProps, ChartData<any>> {
    constructor(props: LineChartProps) {
        super(props);
        this.state = {
            data: {
                datasets: [
                    settings[this.props.type]
                ],
                labels: []
            }
        };
    }

    static getDerivedStateFromProps(nextProps: LineChartProps, prevState: ChartData<any>) {
        return {
            data: {
                datasets: [
                    {
                        ...prevState.data.datasets[0],
                        data: nextProps.config.values
                    }
                ],
                labels: nextProps.config.labels
            }
        };
    }

    render() {
        const { data } = this.state.data.datasets[0];
        const { type } = this.props;
        switch(type) {
            case ChartType.LINE:
                return data.length > 0 ? <Line data={this.state.data} /> : <span> Line Chart is Loading ...</span>;
            case ChartType.BAR:
                return data.length > 0 ? <Bar data={this.state.data} /> : <span> Bar Chart is Loading ...</span>;
            default:
                return <span> Loading ... </span>
        }
    }
}
