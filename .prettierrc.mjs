/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,

  // Order matters: the Tailwind plugin must stay last.
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],

  // Import groups, top to bottom. Mirrors the dependency direction described
  // in ARCHITECTURE.md: config -> content -> lib -> hooks -> components.
  importOrder: [
    "^(react|react-dom)(/.*)?$",
    "^next(/.*)?$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/config/(.*)$",
    "^@/content/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/motion/(.*)$",
    "^@/components/(.*)$",
    "",
    "^[.]",
    "",
    "^.+\\.css$",
  ],
  importOrderTypeScriptVersion: "5.0.0",

  // Tailwind v4 has no JS config file — point the plugin at the stylesheet.
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
