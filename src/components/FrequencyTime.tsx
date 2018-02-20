import * as React from "react";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { line, curveCatmullRomOpen } from "d3-shape";
import { Signal } from "../signal";
import { schemeCategory10 } from "d3-scale-chromatic";

interface FrequencyTimeProps {
    width: number,
    height: number,
    signal: Signal,
}

interface Datum {
    x: number,
    iteration: number,
}

const STEPS = 80;

// const sample = (signal: Signal): [number, Datum][] => {
//     const t = scaleLinear()
//         .domain([1, STEPS])
//         .range(signal.domain);

//     let data = Array.from(
//         { length: STEPS + 2 },
//         (_, i) => [
//             t(i),
//             { x: signal.f(t(i)), iteration: 0 }
//         ] as [number, Datum]
//     );

//     // an improve might just use a highpass filter
//     for (let iteration = 1; iteration < 3; iteration++) {
//         let length = data.length;
//         console.log("iteration", iteration)
//         console.log("length", length)
//         let j = 0; // offset from original, everytime we insert something we add to this number
//         for (let i = 1; i < length; i++) {
//             const p = data[i + j - 1];
//             const c = data[i + j];

//             // console.log(Math.abs((c[1].x - p[1].x) / (c[0] - p[0])))
//             if (Math.abs((c[1].x - p[1].x) / (c[0] - p[0])) > 0.1) {
//                 const midpoint = (p[0] + c[0]) / 2;
//                 const x = signal.f(midpoint);
//                 console.log("adding", [midpoint, { x: x, iteration: iteration }])
//                 data.push([midpoint, { x: x, iteration: iteration }]);
//                 // j += 1;
//             } else {
//                 console.log("skipping")
//             }
//         }
//         data = data.sort(([ay, _ax], [by, _bx]) => ay > by ? 1 : -1);
//     }

//     console.log("Total samples", data.length)

//     return data;
// }

// const sample = (signal: Signal): [number, Datum][] => {
//     const t = scaleLinear()
//         .domain([1, STEPS])
//         .range(signal.domain);

//     let data = Array.from(
//         { length: STEPS + 2 },
//         (_, i) => [
//             t(i),
//             { x: signal.f(t(i)), iteration: 0 }
//         ] as [number, Datum]
//     );

//     for (let iteration = 1; iteration < 4; iteration++) {
//         if (signal.dd) {
//             let length = data.length;
//             let j = 0;
//             for (let i = 1; i < length; i++) {
//                 const p = data[i + j - 1];
//                 const c = data[i + j];
//                 const midpoint = (p[0] + c[0]) / 2;

//                 if (Math.abs(signal.dd(midpoint)) > 0.1) {
//                     data.push([midpoint, { x: signal.f(midpoint), iteration: iteration }]);
//                 }
//             }
//         }

//         data = data.sort(([ay, _ax], [by, _bx]) => ay > by ? 1 : -1);
//     }

//     console.log("Total samples", data.length);

//     return data;
// }

const sample = (signal: Signal): [number, Datum][] => {
    const t = scaleLinear()
        .domain([1, STEPS])
        .range(signal.domain);

    // const rc = 1;
    // const dt = 1;
    const highpass = new Array(STEPS);
    const alpha = 0.4; //rc / (rc + dt)
    highpass[0] = signal.f((t(0)));

    for (let i = 1; i < STEPS + 2; i++) {
        highpass[i] = alpha * (highpass[i-1] + signal.f(t(i)) - signal.f(t(i - 1)));
    }

    const data: [number, Datum][] = [];

    for (let i = 0; i < STEPS; i++) {
        let extra = Math.ceil(Math.abs(highpass[i] * 12));
        console.log("", i, extra)
        for (let j = 0; j < extra; j++) {
            data.push([
                t(i + j * 1 / extra),
                { x: signal.f(t(i + j * 1 / extra)), iteration: j }
            ]);
        }
    }

    console.log("Total samples", data.length);

    return data;
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
        (data.map(d => ([d[0], d[1].x] as [number, number])))

    const dotColor = scaleOrdinal(schemeCategory10);

    return (
        <svg width={width} height={height}>
            <path d={path!} fill="transparent" stroke="black" />
            {data.map(([t, v], i) => <circle cx={scaleX(t)} cy={scaleY(v.x)} r={2} fill={dotColor(v.iteration.toString())} key={i} />)}
        </svg>
    )
}
