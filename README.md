# next-use-funnel

`@toss/use-funnel`을 Next.js의 최신 App Router 에서 구동합니다.

### 유의사항

- Next.js의 Pages Router 에서 사용이 불가능합니다.
- `react-query` 대신 `swr`을 peerDependency 로 사용합니다.
  - 관련 요청이 많을 경우 `swr`을 peerDependency 대신 일반 dependency 로 변경하겠습니다. (약 620KB)