## Next vs React / Next왜 씀?

- 블로그 정리: https://zoon-bloom.tistory.com/112 ,<br/>
  https://zoon-bloom.tistory.com/119
- Next 에 SSR로 동작하며 Pre-Renderingn 된 Document는 자바스크립트 요소가 빠진
  가벼운 상태이기 때문에 클라이언트 측에서 빠르게 로딩이 가능한 장점이 있고.
  이후에 Chunk 단위로 다운로드된 자바스크립트 요소들이 렌더링 될 때는
  먼저 받아진 document의 DOM 요소에자바스크립트 속성이 매칭되는 것이기 때문에
  웹 페이지를 다시 그리는 과정은 일어나지가 않는다고 한다.

## Prisma란

- 블로그 정리 : https://zoon-bloom.tistory.com/114
- Prisma는 차세대 ORM(Object Relational Mapping) 프레임워크입니다.

## Clodinary란

- 블로그 정리 : https://zoon-bloom.tistory.com/118
- Cloudinary는 웹사이트 및 모바일 애플리케이션용 이미지와 동영상을 관리, 최적화, 전송할 수 있는 플랫폼을 제공하는 클라우드 기반 서비스이며. Cloudinary를 사용하면 미디어 자산을 클라우드에 쉽게 업로드 및 저장하고, 즉석에서 조작 및 변환할 수 있으며, 빠르고 안정적인 CDN을 통해 전 세계에 서비스를 제공할 수 있다고 한다.
- next에서는 next-clodinary 라이브러리를 사용해서 쉽게 clodinary와 연결이 가능하다
