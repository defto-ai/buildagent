import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Build Agent',
  tagline: 'Learn AI Agent engineering by comparing production codebases',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://buildagent.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'yourusername', // Replace with your GitHub username
  projectName: 'buildagent', // Your repo name

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // Source of truth is repo-root docs/; website/docs was only stubs.
          path: '../docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/defto-ai/buildagent/tree/main/',
          exclude: [
            '**/WRITING_PLAN.md',
            '**/PROJECT_PLAN.md',
            '**/OUTLINE.md',
          ],
        },
        blog: false,
        gtag: {
          trackingID: 'G-KKCJ2EYDXK',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Build Agent',
      logo: {
        alt: 'Build Agent Logo',
        src: 'img/logo.svg',
      },
      hideOnScroll: false,
      items: [
        // Sprint 期间隐藏 Docs 入口；Day 30 后恢复。
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Docs',
        // },
        {
          href: 'https://x.com/KunhaiY',
          label: '@KunhaiY',
          position: 'right',
          className: 'navbar-icon-x',
          'aria-label': 'X (Twitter)',
        },
        {
          href: 'https://github.com/defto-ai/buildagent',
          position: 'right',
          className: 'navbar-icon-github',
          'aria-label': 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Sprint',
          items: [
            {
              label: '关注 X · @KunhaiY',
              href: 'https://x.com/KunhaiY',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/defto-ai/buildagent',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Build Agent · 坤海 · AI Coding Agent 研究`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
