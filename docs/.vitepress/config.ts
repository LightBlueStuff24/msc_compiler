import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MSC",
  description: "Build Addons with Javascript",
  lastUpdated: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Documentation',
        link: '/documentation/introduction/what-is-msc'
      }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Introduction',
        items: [
          {
            text: 'What is MSC',
            link: '/documentation/introduction/what-is-msc'
          }
        ]
      }
    ],

    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LightBlueStuff24/msc_compiler' }
    ],

    footer: {
      message: 'Released under the MIT license.',
      copyright: `Copyright © ${new Date().getFullYear()} OrgName(use LumStudios?).`
    },
  },

});

