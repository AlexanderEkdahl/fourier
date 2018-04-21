import { scaleLinear } from "d3-scale";

export interface Signal {
    range: [number, number];
    domain: [number, number];
    f: (t: number) => number;
    d?: (t: number) => number;
    dd?: (t: number) => number;
}

const STEPS = 80;

export const sample = (signal: Signal): [number, number][] => {
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

    const data: [number, number][] = [];

    for (let i = 0; i < STEPS; i++) {
        let extra = Math.ceil(Math.abs(highpass[i] * 12));
        for (let j = 0; j < extra; j++) {
            data.push([
                t(i + j * 1 / extra),
                signal.f(t(i + j * 1 / extra))
            ]);
        }
    }

    console.log("Total samples", data.length);

    return data;
}

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
