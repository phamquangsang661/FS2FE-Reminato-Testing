// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/workspace/test/reminato/FS2FE-Reminato-Testing/front-end/node_modules/vite/dist/node/index.js";
import react from "file:///D:/workspace/test/reminato/FS2FE-Reminato-Testing/front-end/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///D:/workspace/test/reminato/FS2FE-Reminato-Testing/front-end/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [tsconfigPaths(), react()],
    server: {
      port: parseInt(process.env.VITE_WEB_APP_PORT)
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VcXFxcdGVzdFxcXFxyZW1pbmF0b1xcXFxGUzJGRS1SZW1pbmF0by1UZXN0aW5nXFxcXGZyb250LWVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya3NwYWNlXFxcXHRlc3RcXFxccmVtaW5hdG9cXFxcRlMyRkUtUmVtaW5hdG8tVGVzdGluZ1xcXFxmcm9udC1lbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmtzcGFjZS90ZXN0L3JlbWluYXRvL0ZTMkZFLVJlbWluYXRvLVRlc3RpbmcvZnJvbnQtZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xyXG4gIC8vR2V0IGVudiBpbiB2aXRlIGNvbmZpZ1xyXG4gIHByb2Nlc3MuZW52ID0gey4uLnByb2Nlc3MuZW52LCAuLi5sb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpfTtcclxuXHJcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbdHNjb25maWdQYXRocygpLHJlYWN0KCldLFxyXG5cclxuICAgICAgc2VydmVyOiB7XHJcbiAgICAgICAgICBwb3J0OiBwYXJzZUludChwcm9jZXNzLmVudi5WSVRFX1dFQl9BUFBfUE9SVCksXHJcbiAgICAgIH0sXHJcbiAgfSk7XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQStXLFNBQVMsY0FBYyxlQUFlO0FBQ3JaLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQU07QUFFM0IsVUFBUSxNQUFNLEVBQUMsR0FBRyxRQUFRLEtBQUssR0FBRyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUMsRUFBQztBQUU5RCxTQUFPLGFBQWE7QUFBQSxJQUNsQixTQUFTLENBQUMsY0FBYyxHQUFFLE1BQU0sQ0FBQztBQUFBLElBRS9CLFFBQVE7QUFBQSxNQUNKLE1BQU0sU0FBUyxRQUFRLElBQUksaUJBQWlCO0FBQUEsSUFDaEQ7QUFBQSxFQUNKLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K