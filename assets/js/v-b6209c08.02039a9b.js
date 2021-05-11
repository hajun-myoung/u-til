(self.webpackChunkuntil=self.webpackChunkuntil||[]).push([[603],{7911:(n,s,l)=>{"use strict";l.r(s),l.d(s,{data:()=>a});const a={key:"v-b6209c08",path:"/tech/blog/google/analytics.html",title:"구글 애널리틱스(Analytics)",lang:"ko-KR",frontmatter:{},excerpt:"",headers:[{level:2,title:"왜 사용하게 됐나요?",slug:"왜-사용하게-됐나요",children:[]},{level:2,title:"구글 애널리틱스와의 연동은 플러그인으로",slug:"구글-애널리틱스와의-연동은-플러그인으로",children:[{level:3,title:"1.구글 애널리틱스 계정의 생성 및 목표 사이트의 등록",slug:"_1-구글-애널리틱스-계정의-생성-및-목표-사이트의-등록",children:[]},{level:3,title:"2.해당 사이트 소유권의 증명",slug:"_2-해당-사이트-소유권의-증명",children:[]}]}],filePathRelative:"tech/blog/google/analytics.md",git:{updatedTime:161955908e4}}},7817:(n,s,l)=>{"use strict";l.r(s),l.d(s,{default:()=>_});var a=l(6252);const e=(0,a.uE)('<h1 id="구글-애널리틱스-analytics"><a class="header-anchor" href="#구글-애널리틱스-analytics">#</a> 구글 애널리틱스(Analytics)</h1><p>구글 애널리틱스는 말 그대로 특정 사이트를 &#39;분석&#39;하게끔 해 주는 도구(tool)에요.</p><h2 id="왜-사용하게-됐나요"><a class="header-anchor" href="#왜-사용하게-됐나요">#</a> 왜 사용하게 됐나요?</h2><p>사실, 구글 애널리틱스가 아닌 &#39;구글 서치 콘솔&#39;의 사용이 목표였어요. 구글 서치 콘솔에 제 블로그를 등록해 놓고, 블로그가 구글 검색에 노출되도록 하고 싶었거든요.<br> 하지만, 구글 서치 콘솔에 블로그를 등록하려면 블로그가 제 소유라는 것을 증명하기 위해 <strong>추적 코드를 블로그의 모든 페이지 헤더 섹션에 삽입해야</strong> 했고, 이게 당시에는 너무 막막했어요. 각 페이지 헤드 섹션에 특정 코드를 붙여넣고 다닐 생각에 막막했냐구요? 아니요.. 매번 페이지를 빌드하고 디플로잉할 때마다 다시 써야 한다는 게 막막했죠.</p><p>그러던 와중, 소유권을 증명하는 방법 중에는 구글 애널리틱스와 연결하는 방법도 있다는 걸 알게 되어서 애널리틱스를 찾아보게 되고, 상당히 편할 것 같아서 본격적으로 찾아보고 공부하게 되었답니다.</p><blockquote><p>결국, 애널리틱스와 연결하여 서치 콘솔에 소유 증명을 완료했는데, 그 과정에서 비동기 추적 코드를 삽입해야 했기에 별반 차이는 없었다는 슬픈 이야기가 숨겨져 있는 건 비밀이에요.</p></blockquote><h2 id="구글-애널리틱스와의-연동은-플러그인으로"><a class="header-anchor" href="#구글-애널리틱스와의-연동은-플러그인으로">#</a> 구글 애널리틱스와의 연동은 플러그인으로</h2><p>구글 애널리틱스와의 연결은 생각보다 몹시 쉬워요.<br> 크게 두 가지 단계</p><ol><li>애널리틱스 계정의 생성 및 목표 사이트의 등록</li><li>해당 사이트 소유권의 증명</li></ol><p>으로 이루어지죠.</p><h3 id="_1-구글-애널리틱스-계정의-생성-및-목표-사이트의-등록"><a class="header-anchor" href="#_1-구글-애널리틱스-계정의-생성-및-목표-사이트의-등록">#</a> 1.구글 애널리틱스 계정의 생성 및 목표 사이트의 등록</h3><hr>',12),i=(0,a.Uk)("먼저, "),t={href:"https://analytics.google.com/",target:"_blank",rel:"noopener noreferrer"},p=(0,a.Uk)("구글 애널리틱스"),c=(0,a.Uk)("에 접속하세요."),o=(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,"로그인이 필요하시다면 로그인 하시구요,")],-1),u=(0,a.Uk)("'무료로 계정 만들기'를 눌러주세요. "),r=(0,a.Uk)("계정 이름을 결정하기 어려우시다면, 그냥 사이트 이름과 일치시키는 편이 속편해요. "),g=(0,a.Wm)("li",null,[(0,a.Wm)("p",null,"옵션들을 잘 읽어보시고, 원하지 않는 기능이 있다면 제외할 수 있구요,"),(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,"다 되었다면 '다음'단계로 넘어갑시다.")])],-1),m=(0,a.Wm)("li",null,[(0,a.Wm)("p",null,"측정하려는 대상은, 필요에 맞게 선택해주세요."),(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,"제 경우, 블로그를 등록하려 한 것이기 때문에 '웹'으로 선택했답니다.")])],-1),h=(0,a.Wm)("li",null,[(0,a.Wm)("p",null,"웹사이트 이름, 주소, 카테고리 및 보고 시간대까지 설정해주면")],-1),d=(0,a.Wm)("p",null,[(0,a.Uk)("..."),(0,a.Wm)("strong",null,"계정 생성이 완료"),(0,a.Uk)("되었어요!")],-1),b=(0,a.Wm)("h3",{id:"_2-해당-사이트-소유권의-증명"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_2-해당-사이트-소유권의-증명"},"#"),(0,a.Uk)(" 2.해당 사이트 소유권의 증명")],-1),k=(0,a.Wm)("hr",null,null,-1),v=(0,a.Uk)("사이트 소유권의 증명은 뷰프레스에서 제공하는 공식 플러그인인, "),W={href:"https://vuepress.vuejs.org/plugin/official/plugin-google-analytics.html",target:"_blank",rel:"noopener noreferrer"},f=(0,a.Uk)("'구글 애널리틱스 플러그인'"),y=(0,a.Uk)("을 사용할 거에요. 사용방법은 여타 플러그인들과 다를 것이 없어서, 공식 설명만으로도 충분히 이해할 수 있어요."),U=(0,a.uE)('<ol><li><code>yarn add -D @vuepress/plugin-google-analytics</code> 을 통해 플러그인을 설치하고 <ul><li><code>npm install -D @vuepress/plugin-google-analytics</code>로도 가능해요.</li><li>저는 yarn으로 했어요.</li></ul></li><li><strong><code>config.js</code></strong> 파일을 알맞게 수정해주세요. 예시는 아래와 같아요.</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token comment">//some plugins.. ,</span>\n    <span class="token punctuation">[</span>\n      <span class="token string">&quot;@vuepress/google-analytics&quot;</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        ga<span class="token operator">:</span> <span class="token string">&quot;UA-000000000-0&quot;</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token comment">//some plugins..</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token comment">//...</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>이걸로, 구글 애널리틱스와의 사이트 연동은 끝났어요. 이제, 구글 애널리틱스를 통해 사이트에서 일어나는 일들을 보고받을 수 있어요!</p>',3),_={render:function(n,s){const l=(0,a.up)("OutboundLink");return(0,a.wg)(),(0,a.j4)(a.HY,null,[e,(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[(0,a.Wm)("p",null,[i,(0,a.Wm)("a",t,[p,(0,a.Wm)(l)]),c]),o]),(0,a.Wm)("li",null,[(0,a.Wm)("p",null,[u,(0,a.Wm)("img",{src:n.$withBase("images/google/ga_001.png"),alt:"무료로 계정 만들기"},null,8,["src"])])]),(0,a.Wm)("li",null,[(0,a.Wm)("p",null,[r,(0,a.Wm)("img",{src:n.$withBase("images/google/ga_002.png"),alt:"계정 이름"},null,8,["src"])])]),g,m,h]),d,b,k,(0,a.Wm)("p",null,[v,(0,a.Wm)("a",W,[f,(0,a.Wm)(l)]),y]),U],64)}}}}]);