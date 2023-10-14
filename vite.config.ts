import { defineConfig } from "vitest/config";
import dns from "dns";
import react from "@vitejs/plugin-react";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
	},
	server: {
		host: "localhost",
		port: 3000,
	},
});
