import * as React from "react";
import { scaleLinear } from "d3-scale";
import { line, curveCatmullRomOpen } from "d3-shape";
import { Signal, sample } from "../signal";

interface FrequencyTimeProps {
    width: number,
    height: number,
    signal: Signal,
}

export const FrequencyTime: React.SFC<FrequencyTimeProps> = (props) => {
    const { width, height, signal } = props;
    const data = sample(signal);
    const scaleX = scaleLinear()
        .domain(signal.domain)
        .range([0, width]);
    const scaleY = scaleLinear()
        .domain(signal.range)
        .range([height, 0]);
    const path = line()
        .x(([t, _]) => scaleX(t))
        .y(([_, v]) => scaleY(v))
        .curve(curveCatmullRomOpen)
        (data.map(d => ([d[0], d[1]] as [number, number])))

    // const dotColor = scaleOrdinal(schemeCategory10);

    return (
        <svg width={width} height={height}>
            <path d={path!} fill="transparent" stroke="black" />
            {data.map(([t, v], i) => <circle cx={scaleX(t)} cy={scaleY(v)} r={2} key={i} />)}
        </svg>
    )
}
