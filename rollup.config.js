import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
  input: './src/index.js',
  output: {
    file: 'dist/umd/vue.js',
    name: 'Vue',  // 打包后全局变量名
    format: 'umd',
    sourcemap: true // 开启源码调试
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    process.env.ENV === 'development' ? serve({
      open: true,
      openPage: '/public/index.html',
      port: 3001,
      contentBase: '' // 空表示以当前文件路径启动一个服务
    }) : null
  ]
}