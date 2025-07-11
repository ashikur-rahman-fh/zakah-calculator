import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import"; // Import the plugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Create the ESLint configuration using flat config format
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: importPlugin, // Use the imported plugin
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
    },
  },
];

// Export the configuration
export default eslintConfig;
