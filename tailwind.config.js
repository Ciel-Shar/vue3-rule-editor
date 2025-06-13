/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        suricata: {
          primary: "#10B981", // 绿色主色调
          secondary: "#34D399", // 辅助绿色
          accent: "#10B981",
          neutral: "#1F2937",
          "base-100": "#F3F4F6",
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
    theme: "suricata",
  },
} 