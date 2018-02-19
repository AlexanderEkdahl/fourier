import * as React from "react";
import { scaleLinear } from "d3-scale";
import { line, curveCatmullRomOpen } from "d3-shape";
import { Signal, sample } from "../signal";

interface FrequencyTimeProps {
    width: number,
    height: number,
    signal: Signal,
    steps: number,
}

export const FrequencyTime: React.SFC<FrequencyTimeProps> = (props) => {
    const { width, height, signal, steps } = props;
    const scaleX = scaleLinear()
        .domain(signal.domain)
        .range([0, width]);
    const scaleY = scaleLinear()
        .domain(signal.range)
        .range([0, height]);
    const path = line()
        .x(([d, _]) => scaleX(d))
        .y(([_, d]) => height - scaleY(d))
        .curve(curveCatmullRomOpen)
        (sample(signal, steps))

    return (
        <svg width={width} height={height}>
            <path d={path!} fill="transparent" stroke="black" />
        </svg>
    )
}
