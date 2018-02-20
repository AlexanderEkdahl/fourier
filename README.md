# Fourier

Visualization of the Fourier transform. Inspired by a [video](https://www.youtube.com/watch?v=spUNpyF58BY) by [3blue1brown](https://github.com/3b1b)

``` sh
yarn install
yarn run dev
open dist/index.html
```

This experiment changed into how to sample and visualize a continuous function. Further improvements:

- Figure out the relationships of alpha and the graph in pixels
- Measure the difference using mean squared error
- Compare to equidistant points
- Compare different inputs variables
- https://scicomp.stackexchange.com/questions/2377/algorithms-for-adaptive-function-plotting
    - Very similar to what I had
- If lets say the function was expensive to evaluate the algorithm would be useful
- Investigate the difference between using a highpass filter and simply measuring the angle between two points
    - Highpass filter catches points where the is a change in direction
- Add points when there is a large change in Y

Another interesting paper: https://www.cs.uic.edu/~wilkinson/Publications/plotfunc.pdf
