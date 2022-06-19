// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: '龙瑜的文字世界',
    tagline: '行走的猫眼',
    url: 'https://longyuwlz.github.io',
    baseUrl: '/longyu.github.io/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // search plugins
    plugins: [
        [
            require.resolve("@cmfcmf/docusaurus-search-local"),
            {
                // Options here
		// whether to index docs pages
		indexDocs: true,
		indexDocSidebarParentCategories: 0,

                // whether to index blog pages
                indexBlog: true,

                // whether to index static pages
                // /404.html is never indexed
                indexPages: false,

                // language of your documentation, see next section
                language: "zh",

                // setting this to "none" will prevent the default CSS to be included. The default CSS
                // comes from autocomplete-theme-classic, which you can read more about here:
                // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-theme-classic/
                // When you want to overwrite CSS variables defined by the default theme, make sure to suffix your
                // overwrites with `!important`, because they might otherwise not be applied as expected. See the
                // following comment for more information: https://github.com/cmfcmf/docusaurus-search-local/issues/107#issuecomment-1119831938.
                style: undefined,

                // The maximum number of search results shown to the user. This does _not_ affect performance of
                // searches, but simply does not display additional search results that have been found.
                maxSearchResults: 8,

            },
        ],
    ],

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'longyuwlz', // Usually your GitHub org/user name.
    projectName: 'longyu.github.io', // Usually your repo name.
    deploymentBranch: 'gh-pages', // set default deployment branch

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                    'https://github.com/longyuwlz/longyu.github.io',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                    'https://github.com/longyuwlz/longyu.github.io',
		    blogTitle: '龙瑜的博客',
                    blogDescription: '美好的时光在文字中停滞不前',
                    blogSidebarCount: 17,
                    blogSidebarTitle: '历史发布',
                    routeBasePath: 'blog',
                    include: ['**/*.{md,mdx}'],
		    postsPerPage: 10,
		    blogListComponent: '@theme/BlogListPage',
                    blogPostComponent: '@theme/BlogPostPage',
                    blogTagsListComponent: '@theme/BlogTagsListPage',
                    blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
                    rehypePlugins: [],
                    beforeDefaultRemarkPlugins: [],
                    beforeDefaultRehypePlugins: [],
                    truncateMarker: /<!--\s*(truncate)\s*-->/,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        navbar: {
            title: '龙瑜的文字世界',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [
                {to: '/blog', label: 'Blog', position: 'left'},
                {
                    href: 'https://github.com/longyuwlz',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'longyuwlz',
                            href: 'https://github.com/longyuwlz',
                        }
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: '/blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/longyuwlz',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} 龙瑜的文字世界, Inc. Built with Docusaurus.`,
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
        },
    }),
};

module.exports = config;
