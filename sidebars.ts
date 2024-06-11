import { type SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mySidebar: [
    {
      type: "category",
      label: "Android",
      items: [{ type: "autogenerated", dirName: "android" }],
    },
    {
      type: "category",
      label: "iOS",
      items: [{ type: "autogenerated", dirName: "ios" }],
    },
    {
      type: "category",
      label: "Unity",
      items: [{ type: "autogenerated", dirName: "unity" }],
    },
    {
      type: "category",
      label: "React Native",
      items: [{ type: "autogenerated", dirName: "react-native" }],
    },
    {
      type: "category",
      label: "Flutter",
      items: [{ type: "autogenerated", dirName: "flutter" }],
    },
    {
      type: "category",
      label: "Product Information",
      items: [{ type: "autogenerated", dirName: "product" }],
    },

    {
      type: "category",
      label: "Best Practices",
      items: [{ type: "autogenerated", dirName: "best-practices" }],
    },

    {
      type: "category",
      label: "Metrics API",
      items: [{ type: "autogenerated", dirName: "embrace-api" }],
    },

    {
      type: "category",
      label: "Custom Metrics API",
      items: [{ type: "autogenerated", dirName: "custom-metrics-api" }],
    },

    {
      type: "category",
      label: "Spans API",
      items: [{ type: "autogenerated", dirName: "spans-api" }],
    },

    {
      type: "category",
      label: "Data Destinations",
      items: [{ type: "autogenerated", dirName: "data-destinations" }],
    },

    {
      type: "category",
      label: "OpenTelemetry",
      items: [{ type: "autogenerated", dirName: "open-telemetry" }],
    },

    {
      type: "category",
      label: "Features",
      items: [{ type: "autogenerated", dirName: "features" }],
    },

    {
      type: "category",
      label: "Partnerships",
      items: [{ type: "autogenerated", dirName: "partners" }],
    },

    {
      type: "category",
      collapsible: true,
      collapsed: true,
      label: "SDK Repositories",
      items: [
        {
          type: "link",
          href: "https://github.com/embrace-io/embrace-android-sdk",
          label: "Android",
        },
        {
          type: "link",
          href: "https://github.com/embrace-io/embrace-apple-sdk/",
          label: "iOS",
        },
        {
          type: "link",
          href: "https://github.com/embrace-io/embrace-unity-sdk/",
          label: "Unity",
        },
        {
          type: "link",
          href: "https://github.com/embrace-io/embrace-react-native-sdk/",
          label: "React Native",
        },
        {
          type: "link",
          href: "https://github.com/embrace-io/embrace-flutter-sdk/",
          label: "Flutter",
        },
      ],
    },

    {
      type: "category",
      collapsible: true,
      collapsed: true,
      label: "Legal",
      items: [
        {
          type: "doc",
          id: "privacy-policy",
        },
        {
          type: "doc",
          id: "terms-of-service",
        },
        {
          type: "doc",
          id: "dpa",
        },
      ],
    },
  ],
};

module.exports = sidebars;
