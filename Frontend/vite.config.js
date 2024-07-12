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

import vitePluginRequire from "vite-plugin-require";

export default {
	plugins: [react(),
        vitePluginRequire.default()
	],
};
