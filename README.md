# next-use-funnel

`@toss/use-funnel`을 Next.js의 최신 App Router 에서 구동합니다.

### 사용상의 차이점

- Next.js의 Pages Router 에서 사용이 불가능합니다.
  - `@toss/use-funnel`을 사용해 주세요.
- `react-query` 대신 `swr`을 peerDependency 로 사용합니다.
  - `react-query`을 사용하시는 분들은 내부 코드를 복사, 붙여넣기 후 재구현해 주세요.
  - 관련 요청이 많을 경우 `swr`을 peerDependency 대신 일반 dependency 로 변경하겠습니다. (약 620KB)
- `preserveQuery` 등 몇몇 기능이 미구현입니다.
  - 시간이 나는 대로 추가 구현하겠습니다.
