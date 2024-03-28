# next-use-funnel

```bash
npm i next-use-funnel
# or
yarn add next-use-funnel
```

`@toss/use-funnel`을 Next.js의 최신 App Router 에서 구동합니다.

예제: https://next-use-funnel.vercel.app

### 특징

- 기존 @toss/use-funnel과 모든 인터페이스가 호환됩니다. (test coverage 100%)
- 미구현된 store 추상화를 SWRProvider를 통해 각 funnel key에 따라 원하는 store를 injection할 수 있는 구조로 바꾸었습니다.
- 미구현된 withState 함수 분리를 HOC로 분리했습니다. HOC는 외부에서 router를 매개변수로 받을 수 있어, Next.js 라우터 외에도 다른 라우터를 적용할 수 있습니다.
- 예제는 toss UI를 흉내내는 ui kit을 포함하고 있습니다. Scaffold와 btn-cta를 직접 사용해 보세요.

### 유의사항

- `react-query` 대신 `swr`을 peerDependency 로 사용합니다.