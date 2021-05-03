# 몇 가지 오류와 대처

이 문서는 뷰프레스 프레임워크를 사용하여 블로그를 작성하면서, 맞닥뜨렸던 오류들을 적은 문서입니다.  
구성은 다음과 같고, '해결' 항목은 정보의 전달을 위해 조금 건조하게 작성하니 양해 바라요:
- 오류 상황(오류 재현)
- 원인
- 해결
- 참고 _(optional)_

부디, 당신이 겪고 있는 '알 수 없는 오류'가 이 문서에서 해결된 것들 중에 있기를 바라요. :fist:

## 파워쉘 보안 문제

### 문제 상황
저는 파워쉘로 npm, yarn 등을 설치하고 작업했어요.  
yarn 설치까지는 성공했는데, 설치 확인을 위해 `yarn -version`을 명령하고 다음 오류를 받았어요:

```sh
yarn : 이 시스템에서 스크립트를 실행할 수 없으므로
C:\Users\Administrator\AppData\Roaming\npm\yarn.ps1 파일을 로드할 수 없습니다.
자세한 내용은 about_Execution_Policies(https://go.microsoft.com/fwlink/?LinkID=135170)
를 참조하십시오.

위치 줄:1 문자:1 + yarn -v + ~~~~ + CategoryInfo
: 보안 오류: (:) [], PSSecurityException + FullyQualifiedErrorId : UnauthorizedAccess
```

이 문제는 구글링을 통해 읽은, [확장형 뇌 저장소님의 글](https://extbrain.tistory.com/118)을 따라해 해결어요.

### 원인

**파워쉘이 보안 문제를 이유로 yarn이 무언가를 실행할 수 없게 막은 것** 이에요.  
보안에 퍽 까다로운 윈도우가 주는 숙제들 중 하나 쯤 되겠네요.

### 해결

1. 파워쉘을 **관리자 권한** 으로 실행 (혹시 모를 권한 문제를 대비)
1. 다음의 명령어를 입력해, 파워쉘 정책이 yarn을 제한시키는지 아닌지 테스트 (대소문자 무관)

```sh
$ ExecutionPolicy
```

- 'Restricted'라고 뜨면, 보안 정책 문제가 맞습니다.  
  <img :src="$withBase('images/vuepress/ps_001.png')" alt="restricted">

3. 보안 정책 해제

```sh
$ Set-ExecutionPolicy unRestricted
```

:::details 중간에 정말 변경할 건지 묻는 질문에 'y'로 동의
<img :src="$withBase('images/vuepress/ps_002.png')" alt="settingPs">
:::

4. 확인

- ExcutionPolicy 명령으로 체크
```sh
$ ExecutionPolicy
```
:::details 'Unrestricted'가 떠야 정상
<img :src="$withBase('images/vuepress/ps_003.png')" alt="compleps">
:::

- `yarn -version`으로 yarn이 제 역할을 수행하는지 체크

## 베이스 루트 문제
이 문제의 경우, `dev` 명령은 정상적이고, `build`는 의도대로 일하지 않으며, 페이지 빌드 결과물의 레이아웃이 적용되지 않은 상태로 존재해요.  
:::warning 이건(dev는 정상, build는 실패 및 레이아웃이 깨진 결과물) 흔한 결과물이에요.
여기서 작성한 베이스 루트 문제 외에도 여러 가지 이유로 build만 실패하고, 검정색 사각형으로 시작하는 '깨진 레이아웃'이 나타날 수 있어요.  
따라서, 같은 증상이라고 해 베이스 루트 문제일것이라고 해석하기에는 무리가 커요.
:::

> 같은 결과물, ['Three black rectangle' 이 나온다는 이슈 예시](https://github.com/vuejs/vuepress/issues/575), /vuejs/vuepress/에 올라옴    
> 물론, 링크된 이슈는 이 오류를 해결하는 데 아무런 도움이 되지 않았음 :grimacing:

### 문제 상황

`yarn dev` 명령에서는 문제 없이 의도한 페이지가 구성되는데 `yarn build`에서는 레이아웃이 완전히 깨진 결과물이 출력됩니다. 제 경우, 세 개의 검정 사각형이 반기는 페이지가 구성되었어요.

<img :src="$withBase('images/vuepress/onlyThreeRectangle.png')" alt="rayoutCrashed">

### 원인
config 파일에 `base=`의 대소문자를 잘못 적었어요.  
base는 '여러분의 블로그가 시작되는 기반(루트) 주소'를 의미하고, 제 블로그의 경우 `/until/` 이 여기에 해당되죠. **이 베이스 주소는, 레포지토리 이름과 일치하거나 없어야 한다는 점 주의하시기 바랍니다.**  
:::: code-group
::: code-group-item 베이스 O
```js
base='/until/'
```
:::
::: code-group-item 베이스 X
```js
base='/'
```
:::
::::
:::tip 베이스가 없는 경우와 있는 경우의 차이
없다면 `<username>.github.io/` 에 블로그가 deploying 되고,  
베이스를 지정했다면 `<username>.github.io/<base>/`에 블로그가 deploying 됩니다.
:::

### 해결
당시 레포지토리 이름은 studyB 였고, 다음과 같이 수정했어요:  

before:
```js{2}
module.exports={
    base : '/studyb/',
    ~~~
   }
```
after:
```js{2}
module.exports={
    base : '/studyB/',
    ~~~
   }
```

네 맞아요. 베이스 루트는 무려 대소문자를 구분해요.  
:::tip 이래서 레포지토리 이름에 대문자 쓰는거 아니에요.
그래서 레포지토리 이름을 'study_b'로 바꾸게 되었죠.
:::
:::details 이 블로그의 이름은 study_b가 아니라 until 아닌가요?
아 죄송해요, 혼선을 드렸네요. study_b는 이전 vuepress 1 framework를 이용할 당시의 블로그 이름이에요. 지금은 vuepress 2 framework를 이용중이구요.
:::

## 특정 파일의 추가
:::danger 지금은 쓰지 않는 방법이에요.
html&css 카테고리 예제파일에 적용했던 방법인데, 이제는 그 '예제파일' 구성을 취소했어요. 따라서 필요가 없어졌어요.
:::
오류는 아니에요. 말 그대로 블로그를 deploying 할 때 '내가 원하는 파일을 추가하고 싶어서' 시도한 내용이죠. 생각보다 쉽고, 꽤 유용해요. 주로 적용 가능한 경우는:  

1. 구글 서치 콘솔 소유권 증명을 위한 .html 파일 작성
1. 사이트맵을 build 결과물에 포함
1. 특정한 목적을 가진 페이지(ex: 404.html)의 임의포함
1. 블로그 문서에 필요한 파일을 임의추가
   - 뷰프레스가 지원하지 않는 파일이더라도 추가하고 링크를 걸어 사용가능

### 상황 및 가정
- 상황
   - 블로그 베이스 루트 주소(~/until/)에 `src.file` 이라는 파일이 있다고 할게요.
   - 이 파일을 매번 블로그를 deploying할 때 `~/until/target/`에 포함시키고 싶어요.

- 가정
   - 앞으로 설명할 방법은 쉘 명령을 이용한 방법이에요.
   - 따라서, `deploy.sh`파일을 이용한 반자동 deploying을 쓰시는 분들이 사용하기 편할거에요.

### 흐름
```sh
$ find . -maxdepth 1 -name "src.file" -exec cp {} ./target/ \;
```
이 명령은 "src.file" 이라는 파일을 찾아서, ./target/ 에 복사를 실행하라고 하고 있어요.  
:::details -maxdepth 1
find 명령은 명령이 실행되는 곳을 기준으로 '모든 하위 디렉토리'를 탐색 대상으로 둬요.  
이 옵션을 추가해서 탐색의 최대 깊이를 1로 한정(=현재 폴더)할 수 있어요.
:::
> 구글에 `쉘 특정 파일 복사하기` 따위로 검색하면 비슷한 표현식들을 많이 찾을 수 있어요.

이제 이 명령을 적당한 때에 실행해주면 되는데, '적당한 때'를 찾기 위해서 블로그가 어떤 순서로 deploying되고 있는지를 우선적으로 파악해야 해요.  

**반자동 쉘 deploying**을 쓰고 있다면, 다음과 같은 순서를 거치는 게 일반적이에요.

1. `deploy.sh`를 실행
   - `npm run build` (블로그 빌드)
      - 빌드 결과물: /dist/ 에 저장
   - 쉘이 /dist/ 에 접근
   - /dist/ 에 있는 빌드 결과물을 gh-pages 브랜치로 git push

빌드될 때, /dist/에 있는 기존 파일들은 모두 삭제되고 시작돼요. 따라서 다음과 같이 순서를 잡아야해요:  
1. `npm run build`
1. target.file 복사 _< 추가된 명령_
1. gh-pages 브랜치로 git push

그래서 `npm run build`와 `cd docs/.vuepress/dist` 사이에 다음 명령을 위치시켰어요.

```sh
find . -maxdepth 1 -name "sitemap.xml" -exec cp {} ./docs/.vuepress/dist/ \;
```

이 코드는 블로그가 빌드 된 상태(/dist/에 빌드 결과물이 저장된 상태)에서,  
**sitemap.xml 파일을 /dist/ 폴더로 복사**해요. 이후에 /dist/폴더 내용물이 gh-pages로 푸시되니, sitemap.xml도 같이 푸시되죠.

> 실행 타이밍과 그에 따른 파일의 위치, 목적지의 경로가 중요해요.

### 개선
복사 대상을 *'파일'* 한 개에서 *'폴더'* 로 바꾸기 위해, 명령어를 **조금** 수정했어요.

```sh
$ cp -r TargetFolder /PasteToHere/
```
`find` 명령어는 복사에 한계가 있어서, 훨씬 편한 `cp` 명령을 쓰게 되었어요. 위 예시 코드의 cp 명령은 다음과 같은 명령을 수행해요

1. 현재 경로에서 'TargetFolder' 폴더를 찾아
1. /PasteToHere/에 복사

그리고, 이렇게 적용했어요:
```sh
...
# CUSTOM SETTINGS : WROTE BY HAJUN

# -maxdepth 1 : for exclude childe folders
cd docs/src/
# copy&past specific 'folder'
cp -r TargetFolder ../../../.vuepress/dist/src/PasteToHere/
# go back to the origin(root) directory
cd ../../

# CUSTOM SETTINGS: END
...
```

## 텍스트 깨짐 문제(인코딩 문제)
vuepress 2로 블로그를 migration 하기 위해 다시 공식 가이드를 따라가는 중, 아주 머리아프고 알 수 없는 오류를 **또** 만났어요.
그리고 언제나와 같이, **역시나** 윈도우라서 문제가 생겼던 것으로 밝혀겼죠.

:::tip 행복-개발을 하고싶나요?
일단 당신 앞에 있는 그 윈도우부터 치워버리고 맥북을 사세요.  
:::

### 문제 상황
이 문제는, 블로그를 처음 셋팅할 때 주로 일어나고, `dev`나 `build`에 오류는 없지만, 내용 텍스트가 깨져버려요.
예시를 보여드릴게요:
1. [vuepress2 공식 가이드의 Installation](https://vuepress2.netlify.app/guide/getting-started.html#manual-installation)를 따라서 파일 생성

  <img :src="$withBase('images/vuepress/encoding-err-00.png')" style="width:500px;">

2. 정상적으로 생성 완료

  <img :src="$withBase('images/vuepress/encoding-err-01.png')">

3. `build`등을 통해 컴파일 및 렌더링 결과, 텍스트 깨짐

  <img :src="$withBase('images/vuepress/encoding-err-02.png')">

### 원인
`echo` 명령이 원인이에요.  
cmd나 파워쉘과 같은 윈도우 cli의 텍스트 인코딩 방식과 웹 표준이 다르다는 문제죠.  
- 윈도우 표준: **utf-16** 
- 웹 표준: **utf-8** 

즉, 윈도우는 `echo` 명령을 내리면 utf-16으로 인코딩 된 텍스트를 파일에 넣어줍니다.  
뷰프레스 프레임워크는 이 텍스트를 웹 표준인 utf-8로 인코딩해서 `.html` 파일을 만들기 때문에, 텍스트가 깨지는 것이죠.

### 해결
VScode를 쓰시나요? 거기서 파일을 만들면 해결돼요.  
:::details 웹 페이지 인코딩 방식을 바꾸는 크롬 플러그인을 설치해도 소용 없어요.
구글에 검색하니 인코딩이 달라서 텍스트가 깨지는 거니, 인코딩 방식을 다르게 해서 읽어내는 플러그인을 사용해보라고 하더라구요.
하지만 이 문제는, 애초에 파워쉘이 utf-16으로 인코딩된 파일을 줘서, 웹팩이 컴파일하면서 텍스트가 깨진거에요.
`build` 후에 `/docs/.vuepress/dist/`에 들어가서 확인해보세요. 아예 .html 파일 내용이 깨진 텍스트로 구성되어 있을거에요.  

즉, 텍스트 깨짐은 프레임워크 단계, `dev`나 `build`과정에서 발생하는 것이지, 브라우저가 파일을 잘못 읽는 게 아니랍니다.
:::

## Cannot create property '__probs' on string 'XXX'
정말 짜증나는 오류에요. **빌드 과정에서 이 문구를 만나고 해결이 금방 된 적이 없어요.**  
주로 *렌더링 오류* 이며, 특정 *태그* 를 뷰프레스가 렌더링하지 못해 발생하는 오류일 확률이 커요.

### Cannot create property '__probs' on string 'U'
밑 '참고' 문단에 넣은 예시이기도 해요. [블로그 사전준비 카테고리](./ready_for_blog.html)에서 발생한 렌더링 오류에요.  

오류 메시지: 
<img :src="$withBase('images/vuepress/cannot-01.PNG')">

### 원인
[해당 문서](./ready_for_blog.html)의 [6번째 문단 '준비물 3. clone it'](./ready_for_blog.html#준비물-3-clone-it)에서 Code 버튼 왼쪽에 있는 아래 방향 화살표를 재현하고자 `<u>↓</u>` 를 페이지에 삽입했어요.  
> `<u> 태그`는 해당 태그로 감싸진 텍스트에 밑줄을 치는 효과.

하지만 이 `<u> 태그`를 뷰프레스 프레임워크는 어떻게 렌더링해야할 지 몰라 발생된 오류에요.

### 해결
`<u> 태그`를 지웠어요.

### Cannot create property '__probs' on string 'math'
`/논테크/수능/수학/` 카테고리에 해당하는 문서에 수식을 쓰고자 다양한 플러그인들을 시도하다가 발생한 오류에요. 이 오류가 발생될 당시 플러그인은 'KaTeX'로 정했었어요.  

오류이미지:  
<img :src="$withBase('images/vuepress/cannot-02.PNG')">

### 원인
KaTeX 플러그인은 마크다운에서 TeX 문법으로 작성된 텍스트를 알맞은 수식으로 빠르게 변환시켜요.  
`config.ts` 파일의 수정을 통해 뷰프레스가 페이지를 `.html` 파일로 생성하기 전에 TeX를 먼저 거치게 되죠. 문제는, 여기서 `<math> 태그`가 생성된다는 점이에요.

### 해결
config.ts 에서 마크다운의 렌더링 함수를 다시 설정했어요. 가장 처음 시도한 건 오류를 내는 `<math> 태그` 항목의 상위항목인 `<span class="katex-mathml">` 자체를 날려버리는 거였어요:
```ts
...
   extendsMarkdown: (md) => {
      let katex = require('markdown-it-katex');

      let orignalRender = md.render;
      md.render = function(src, env) {
         let sub = orignalRender(src, env); //원본 마크다운 렌더러를 저장
         // 원본 렌더러에서 원하는 태그를 찾아 교체하는 함수(replace)를 사용
         return sub.replace(/<span class="katex-mathml"><math>[\s|\S]*<\/math><\/span>/g,'<p>에러에요!</p>');
      }

      md.use(katex, {"throwOnError" : false, "errorColor" : " #cc0000"});
   },
...
```
**하지만**, 이 방법으로는 문제가 해결되지 않았어요.  
오히려 `<span>` 태그의 짝이 안 맞으면서 **Invalid endtag** 오류를 계속 뿜어댔죠.  

그래서 [이 문제를 해결한 걸로 보이는 블로그의 코드](https://github.com/Maorey/Blog/blob/ac5ced6deb3bbec689c672ec425640a0fba598f3/docs/.vitepress/config.js#L77)에서 영감을 받아 이렇게 수정했어요:
```ts
...
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
...
```
수정하는 방향이 달아요. 문제가 되는 태그를 없애는 것이 아니라 `span`에 `v-pre`라는 걸 추가해줬어요.  
`v-pre`는 붙은 클래스가 vuepress에게 의미가 없는 것임을 알려줘서, 무시하고 넘어가게끔 도와줘요. 따라서, 그 어떤 오류도 발생하지 않을 수 있죠.
:::theorem 'v-pre'는 뷰프레스에 쓰는 directive 에요.
이 디렉티브는 특정 엘리먼트를 무시하는데에 사용 됩니다. 이걸 사용하므로서, Vue 시스템에서 해당 엘리먼트는 지시문이 없다는걸 인식하게 되어 그 엘리먼트 내부의 자식엘리먼트들을 신경쓰지 않고 그냥 건너뜁니다.
:::right
_from. [velopert.com/3044](https://velopert.com/3044)_
:::

### 참고
렌더링 문제일 경우, '어떤 문서'에서 오류가 발생했는지를 보는 게 꽤 의미있어요. 방법은 간단해요:  
- `yarn build`
- build log 확인
  <img :src="$withBase('images/vuepress/cannot-03.PNG')">
- build fail 메세지 바로 윗 줄 문서가 오류를 내는 문서임.
- `dev` 모드에서 해당 페이지 접근
- 콘솔 창(F12) 오픈
- 오류 발생 여부 확인