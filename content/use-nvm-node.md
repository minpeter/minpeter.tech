---
title: "nvm을 이용한 node버전관리"
description: "NodeJS의 버전 관리를 도와주는 툴, 자신이 노드만 사용한다면 최고의 선택일 것"
date: 2021-10-01 11:24:00 +0900
tags: ["Node", "Version Manager"]
---

### 공지사항

노드만 사용하는 개발자에겐 nvm의 사용을 추천하나,
python, java 등을 같이 이용한다면 nvm 대신 asdf이란 툴을 사용할 것을 권장한다.

**훨씬 엘레강스하다**

난 솔직히 자가진단이 싫다.  
최근 아이폰 7으로 바꾸기 전까지는 앱이 열리는데까지 너무 오래걸렸고,  
짜피 의식의 흐름대로 아니오를 3번 입력하는 동작은 정말 비효율적으로 느껴진다.  
하지만 교육청에선 필요하다고 생각하는 모양이다.  
뭐 과거의 나는 교육청에서 뭐라고 생각하든 신경쓰지않았고,  
python으로 자가진단 서버에 리퀘를 보내 자가진단을 자동으로 수행해주는 프로그램을 만들어서 사용했었다.  
~~선생님한테 적발되기 전까진,~~  
그 이후로 딱히 자가진단 자동화에 관심을 두지 않고 그냥 주어진대로 하면서 살아갔다.  
헌데 어느날 깃허브에서 [다음 레포](https://github.com/kimcore/hcs.js)를 발견했다.

hcs.js라는 노드 라이브러리 프로젝트인데 최근 추가된 보안키패드에 완벽대응한다!!  
내가 전에 작성했던 코드는 늅늅이때 작성한 코드라 개판이고, ~~지금도 늅이다..~~  
특히 이번에 보안키패드를 적용하여 그냥 작동불능이 되었다.  
난 hcs.js 프로젝트를 보고 다시 내가 만든 프로그램을 개량하고 싶었다.  
그냥 그저 시스탬을 분석해 자동으로 동작하는 모습을 보고 싶었다.

먼저 hcs.js 라이브러리를 사용해보기로 결심했고, node을 다운받을 방법을 찾았다.

## nodeJS를 설치하는 올바른 방법

nodeJS를 설치하는데 많은 방법이 있는거 같았다.  
'nodejs install'이라고 검색했을때 블로그마다 다른 검색결과가 뜨는걸 보면 알수 있었다.  
내가 찾은 방법은 2가지였다.

1. nvm 같은 노드버전관리자를 이용해 설치하는 방법
2. winget, apt같은 패키지관리자를 이용해 특정 버전의 node을 설치하는 방법,

솔직히 2번 방법을 사용해도 문제가 없겠지만 노드버전관리자가 존재하는 이유가 있다.  
nodejs의 신버전 출시가 매우 빈번하게 일어난다는것이다.

패키지관리자로 node을 설치하면 매번 신버전의 노드가 설치되어 기존 의존성이 깨질수도 있고, 의존성이외에 문제가 생길수도 있다.
이런걸 해결하기위해 다양한 버전에 노드를 동시에 사용할수 있는 nvm을 사용하는 것이다.

## nvm을 이용해 node을 설치하는 방법

curl 도구를 설치하자.  
`sudo apt-get install curl`  
아래 명령어로 nvm을 설치하자  
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`  
혹시 zsh이나 기타 다른 쉘을 이용하고 있다면 pipe(|) 뒤를 bash이 아닌 zsh 또는 다른 것으로 변경해주자  
++ 글을 쓰는 시점에선 0.39.0이 최신 버전이지만 나중에 업데이트가 될수도 있다.  
업데이트 여부를 확인하려면 [이 페이지](https://github.com/nvm-sh/nvm)에서 확인해보자

이제 nvm가 설치되었다.  
`command -v nvm` 명령을 사용해 설치여부를 알 수 있는데 '명령어를 찾을수 없음'과 같은 메세지가 출력되면 터미널을 닫았다가 다시 켜보자  
`nvm install node` 명령어를 이용해 최신버전의 node나 `nvm install --lts` 명령어로 안정적인 릴리즈를 설치할수도 있다.
`node --version` 명령어를 실행하면 설치된 node의 버전이 출력된다.  
nodejs가 잘 설치되었으니 프로그래밍을 즐기고, nvm tool에 대해 조금 더 공부해보자