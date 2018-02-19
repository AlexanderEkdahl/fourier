import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
    input: './src/index.tsx',
    output: {
        file: './dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        replace({
            // The react sources include a reference to process.env.NODE_ENV so we need to replace it here with the actual value
            'process.env.NODE_ENV': '"development"',
        }),
        resolve(),
        commonjs({
            namedExports: {
                'node_modules/react-dom/index.js': [
                    'render',
                ],
                'node_modules/react/index.js': [
                    'Component',
                    'createElement',
                ],
            }
        }),
        typescript(),
    ]
}
