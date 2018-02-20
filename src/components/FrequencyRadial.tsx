import * as React from "react";
import { scaleLinear } from "d3-scale";
import { lineRadial, curveCatmullRomOpen } from "d3-shape";
import { Signal, sample } from "../signal";

interface FrequencyRadialProps {
    width: number,
    height: number,
    signal: Signal,
}

export const FrequencyRadial: React.SFC<FrequencyRadialProps> = (props) => {
    const { width, height, signal } = props;
    const scaleX = scaleLinear()
        .domain([0, 1 / 3])
        .range([Math.PI / 2, 2 * Math.PI + Math.PI / 2]);
    const scaleY = scaleLinear()
        .domain(signal.range)
        .range([0, height / 2]);
    const path = lineRadial()
        .angle(([d, _]) => scaleX(d))
        .radius(([_, d]) => scaleY(d))
        .curve(curveCatmullRomOpen)
        (sample(signal))

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${width / 2} ${height / 2})`}>
                <path d={path!} fill="transparent" stroke="black" />
            </g>
        </svg>
    )
}
