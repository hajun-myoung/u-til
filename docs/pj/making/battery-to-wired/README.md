# 배터리를 유선전원 제품으로

:::warning 진행상태
현재 **진행중**인 프로젝트 입니다.
:::

| 프로젝트 구분 | 버젼 | 사용 하드웨어 | 사용 소프트웨어 | 시작일 | 종료일 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 온리-하드웨어 | v1.0.0 | X | X | '20년 10월 4일 | ~진행중~ |

> 기존 제품을 배터리에서 유선 전원으로 바꾸는 프로젝트입니다.  
> 특정 하드웨어(아두이노 등)를 사용하여 구동하는 게 아니기 때문에 해당사항이 없다고 표시했습니다.

## 청사진

### v1.0.0

---

#### 기본 아이디어

- 배터리로 전원을 공급하는 대신, AC전원에 연결하여 동력을 공급한다.

#### 요구사항

- `핵심` 가정용 AC전원을 제품 input에 맞게 변환
- `기본` 약간의 납땜
- `기본` 여분의 케이블

#### 대상

보풀제거기  

<table>
    <tr>
        <td style="text-align: center;">제품 이미지</td>
        <td style="text-align: center;">배터리 위치</td>
    </tr>
    <tr>
        <td> <img :src="$withBase('images/battery-to-wired/target_001.jpg')"> </td>
        <td> <img :src="$withBase('images/battery-to-wired/target_002.jpg')"> </td>
    </tr>
    <tr>
        <td style="text-align:center;"> 보풀트레이를 열면 배터리박스가 있음.<br>(대체 왜...?) </td>
        <td style="text-align:center;"> AA(1.5V) X2<br>3V 전압으로 생각됨. </td>
    </tr>
</table>
