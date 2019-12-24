import json from 'rollup-plugin-json';

import {terser} from 'rollup-plugin-terser';
export default {
    input: 'main.js',
    output:   {
        format: 'amd',
        name: 'versionNamesdf',
        plugins: [terser()],
        dir:'dist1',

      },
    plugins:[json()]
  };