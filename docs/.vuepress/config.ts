import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'ko-KR',
    title: 'UNTIL',
    description: "Until is Not Today I Learned",
    base: '/until/',
    dest: './dist',
    head: [
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
        // ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }],
        // 두번째 태그는 recomended 돼서 추가한 것일 뿐, 없어도 math-expression 정상적으로 됨
    ],
    extendsMarkdown: (md) => {
        let katex = require('markdown-it-katex');
        
        let orignalRender = md.render;
        let MATH_TAG = /<span class="katex">/g
        let REPLACER = '<span v-pre class="katex">'
        md.render = function(src, env) {
            let sub = orignalRender(src, env);
            return sub.replace(MATH_TAG, REPLACER);
        }

        md.use(katex, {"throwOnError" : false, "errorColor" : " #cc0000"});
    },
    plugins: [
        [
            "@vuepress/container",
            {
              type: "right",
              defaultTitle: "",
            },
        ],
        [
            "@vuepress/container",
            {
              type: "theorem",
              before: (info: string): string =>
              `<div class="custom-container theorem">${info ? `<p class="custom-container-title">${info}</p>` : ''}\n`,
              after: (): string => '</div>',
            },
        ],
    ],
    themeConfig: {
        logo: 'images/logo.png',
        lastUpdated: true,
        repo: 'hajun-myoung/until',
        home: '/',
        editLink: false,
        contributors: false,
        notFound: ['여기가...어디요?', '앜! 잘못들어와따!', '햇빛이 선명하게 나뭇잎을 핥고 있었다', '많고 많은 사람 중에 그대 한 사람'],
        backToHome: '돌아가자...',
        navbar: [
            {
                text: '테크',
                children: [
                    {
                        text: '프로그래밍 언어',
                        children: [
                            {
                                text: 'C',
                                link: '/tech/pg/lang/c/'
                            },
                            {
                                text: 'Python',
                                link: '/tech/pg/lang/python/'
                            },
                            {
                                text: 'JavaScript',
                                link: '/tech/pg/lang/js/'
                            },
                            {
                                text: 'HTML&CSS',
                                link: '/tech/pg/lang/html_css/'
                            },
                        ]
                    },
                    {
                        text: '프로그래밍 이론',
                        children: [
                            {
                                text: '준비중입니다.',
                                link: '/tech/pg/theory/'
                            },
                        ]
                    },
                    {
                        text: '메이킹',
                        children: [
                            {
                                text: '아두이노',
                                link: '/tech/making/arduino/'
                            },
                            {
                                text: '프로세싱',
                                link: '/tech/making/processing/'
                            },
                        ]
                    },
                    {
                        text: '블로그',
                        children: [
                            {
                                text: 'Google',
                                link: '/tech/others/google/'
                            },
                            {
                                text: 'Vuepress',
                                link: '/tech/others/vuepress/'
                            },
                        ]
                    },
                ],
            },
            {
                text: '논테크',
                children: [
                    {
                        text: '샤이학문',
                        children: [
                            {
                                text: '수능수학',
                                link: '/non-tech-learning/csat/math/'
                            }
                        ]
                    }
                ]
            },
            {
                text: '프로젝트',
                children: [
                    {
                        text: '메이킹 pj.',
                        children: [
                            {
                                text: '배터리를 유선으로',
                                link: '/pj/making/battery-to-wired/'
                            },
                            {
                                text: '짐벌만들기',
                                link: '/pj/making/gimbal/'
                            },
                            {
                                text: '체크카드 시스템',
                                link: '/pj/making/debit-card-sys/'
                            },
                        ]
                    },
                    {
                        text: '클론코딩',
                        children: [
                            {
                                text: '준비중입니다.',
                                link: '/pj/clone-coding/'
                            }
                        ]
                    }
                ]
            },
            {
                text: '삶',
                children: [
                    {
                        text: '독서와 서평',
                        children: [
                            {
                                text: '독서와 서평',
                                link: '/life/reading/'
                            }
                        ]
                    },
                    {
                        text: '취미',
                        children: [
                            {
                                text: '음향 엔지니어링(기초)',
                                link: '/life/hobby/sound-engineering/basic/'
                            },
                            {
                                text: '영상 편집',
                                link: '/life/hobby/video-editing/'
                            }
                        ]
                    },
                ]
            },
        ],

        sidebar: {
            // guide
            '/guide/': [
                {
                    isGroup: true,
                    text: '블로그 열람 가이드',
                    children: [
                        'README.md',
                        'direction.md',
                    ]
                }
            ],

            // programming languages
            '/tech/pg/lang/c/': [
                {
                    isGroup: true,
                    text: 'C언어',
                    children: [
                        'README.md',
                        '01_dataType.md'
                    ]
                }
            ],
            '/tech/pg/lang/python/': [
                {
                    isGroup: true,
                    text: 'Python(파이썬)',
                    children: [
                        'README.md',
                    ]
                }
            ],
            '/tech/pg/lang/js/': [
                {
                    isGroup: true,
                    text: 'JavaScript(자바 스크립트)',
                    children: [
                        'README.md',
                    ]
                }
            ],
            '/tech/pg/lang/html_css/': [
                {
                    isGroup: true,
                    text: 'HTML&CSS',
                    children: [
                        'README.md',
                        '01_basicStructure.md',
                        '02_basicTags.md',
                        'htmlFonts.md',
                        'namedColors.md',
                    ]
                }
            ],

            // programming theory
            '/tech/pg/theory/': [
                {
                    isGroup: true,
                    text: '프로그래밍 이론',
                    children: [
                        'READMD.md',
                    ]
                }
            ],

            // blog: vuepress and google
            '/tech/blog/google/': [
                {
                    isGroup: true,
                    text: '구글 | Google',
                    children: [
                        'README.md',
                        'analytics.md',
                        'search_console.md',
                    ]
                }
            ],
            '/tech/blog/vuepress/': [
                {
                    isGroup: true,
                    text: '뷰프레스와 블로그 셋팅',
                    children: [
                        'README.md',
                        'ready_for_blog.md',
                        'guideTransl.md',
                        'plugins.md',
                        'rfv_errors.md'
                    ]
                }
            ],

            // project: making
            '/pj/making/battery-to-wired/': [
                {
                    isGroup: true,
                    text: '배터리에서 유선전원공급으로 바꾸기',
                    children: [
                        'README.md',
                        'v1_0_0.md'
                    ]
                }
            ],
            '/pj/making/debit-card-sys/': [
                {
                    isGroup: true,
                    text: '체크카드 시스템 만들기',
                    children: [
                        'README.md',
                        'v1_0_0.md',
                        'v1_1_0.md',
                        'v2_0_0.md',
                    ]
                }
            ],
            '/pj/making/gimbal/': [
                {
                    isGroup: true,
                    text: '짐벌 만들기',
                    children: [
                        'README.md',
                        'v1_0_0.md',
                    ]
                }
            ],

            // project: clone-coding
            '/pj/clone-coding/': [
                {
                    isGroup: true,
                    text: '클론코딩',
                    children: [
                        'README.md'
                    ]
                }
            ],

            // others: arduino and processing
            '/tech/making/arduino/': [
                {
                    isGroup: true,
                    text: '아두이노',
                    children: [
                        'README.md',
                    ]
                }
            ],
            '/tech/making/processing/': [
                {
                    isGroup: true,
                    text: '프로세싱',
                    children: [
                        'README.md',
                    ]
                }
            ],

            // life (with hobby)
            '/life/reading/': [
                {
                    isGroup: true,
                    text: "독서와 서평",
                    children: [
                        'README.md',
                    ]
                }
            ],

            '/life/hobby/sound-engineering/basic/': [
                {
                    isGroup: true,
                    text: '음향 엔지니어링의 기본',
                    children: [
                        'README.md',
                        'lecture01.md'
                    ]
                }
            ],
            '/life/hobby/video-editing/': [
                {
                    isGroup: true,
                    text: '영상편집',
                    children: [
                        'README.md',
                    ]
                }
            ],

            // non-tech learning
            '/non-tech-learning/csat/math/': [
                {
                    isGroup: true,
                    text: "논-테크 공부: 수능수학",
                    children: [
                        'README.md',
                        '2022exam.md'
                    ]
                }
            ]
        },
    },
})