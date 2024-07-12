// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import vitePluginRequire from "vite-plugin-require";

// export default defineConfig({
//   plugins: [react(),],
//   build: {
//     rollupOptions: {
//       external: ['scriptjs',]
//     }
//   }
// });

import { defineConfig } from 'vite';
import vitePluginRequire from "vite-plugin-require";
import react from '@vitejs/plugin-react';

export default {
	plugins: [react(),
        vitePluginRequire.default()
	]
};
