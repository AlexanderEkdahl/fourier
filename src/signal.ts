import { scaleLinear } from "d3-scale";

export interface Signal {
    range: [number, number];
    domain: [number, number];
    f: (t: number) => number;
}

// should add adaptive sampling
export const sample = (signal: Signal, steps: number): [number, number][] => {
    const t = scaleLinear()
        .domain([1, steps])
        .range(signal.domain);

    return Array.from(
        new Array(steps),
        (_, i) => [t(i), signal.f(t(i))] as [number, number]
    );
}

export const simpleSignal: Signal = {
    domain: [0, 4.5],
    range: [0, 2],
    f: (t) => Math.sin(2 * Math.PI * 3 * t + Math.PI / 2) + 1
}

export const complexSignal: Signal = {
    domain: [-2, 2],
    range: [0, 2],
    f: (t) => Math.cos(2 * Math.PI * 3 * t) * Math.exp(-Math.PI * Math.pow(t, 2)) + 1
}
