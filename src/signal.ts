import { scaleLinear } from "d3-scale";

export interface Signal {
    range: [number, number];
    domain: [number, number];
    f: (t: number) => number;
    d?: (t: number) => number;
    dd?: (t: number) => number;
}

const STEPS = 20;

// should add adaptive sampling
export const sample = (signal: Signal): [number, number][] => {
    const t = scaleLinear()
        .domain([1, STEPS])
        .range(signal.domain);

    return Array.from(
        { length: STEPS + 2 },
        (_, i) => [t(i), signal.f(t(i))] as [number, number]
    );
}

// export const sample = (signal: Signal): [number, number][] => {
//     const t = scaleLinear()
//         .domain([1, STEPS])
//         .range(signal.domain);

//     let data = Array.from(
//         { length: STEPS + 2 },
//         (_, i) => [t(i), signal.f(t(i))] as [number, number]
//     );

//     let length = data.length;
//     let j = 0; // offset from original, everytime we insert something we add to this number
//     for (let i = 1; i < length; i++) {
//         const p = data[i - 1 + j];
//         const c = data[i + j];

//         const midpoint = (p[0] + c[0]) / 2;
//         const x = signal.f(midpoint);

//         if (Math.abs(p[1] - x) > 0.001) {
//             console.log("adding point", i, "at position", i + j)
//             data.push([midpoint, x]);
//             j += 1;
//         }
//     }
//     data = data.sort(([ay, _ax], [by, _bx]) => ay > by ? 1 : -1);

//     return data;
// }

// divide the domain by some value that is based of the width of the visualization. For example every 10px
// further subdivide every range. If this yields a an improvement > X keep it otherwise discard
// This algorithm could be append only and sort the results after.

export const simpleSignal: Signal = {
    domain: [0, 4.5],
    range: [0, 2],
    f: (t) => Math.sin(2 * Math.PI * 3 * t + Math.PI / 2) + 1
}

export const complexSignal: Signal = {
    domain: [-2, 2],
    range: [0, 2],
    f: (t) => Math.cos(2 * Math.PI * 3 * t) * Math.exp(-Math.PI * Math.pow(t, 2)) + 1,
    d: (t) => -2 * Math.PI * Math.exp(-Math.PI * Math.pow(t, 2)) * (3 * Math.sin(6 * Math.PI * t) + t * Math.cos(6 * Math.PI * t)),
    dd: (t) => -2 * Math.exp(-Math.PI * Math.pow(t, 2)) * Math.PI * (t * Math.cos(6 * Math.PI * t) + 3 * Math.sin(6 * Math.PI * t))
}
