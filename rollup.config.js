import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))
const external = Object.keys(pkg.dependencies || {}).concat(['fs/promises'])

const extensions = ['.js', '.ts']

export default {
  external,
  input: 'source/index.ts',
  output: [
    {
      banner: '#!/usr/bin/env node',
      file: './bin/index.js',
      format: 'esm',
    },
  ],
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    json(),
    typescript(),
  ],
}
