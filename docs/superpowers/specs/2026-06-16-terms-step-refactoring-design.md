# 디자인 사양서: 약관 동의 단계(TermsStep) 리팩토링 및 레이아웃 버그 해결

## 1. 개요 및 목표
[TermsStep.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/TermsStep/TermsStep.tsx) 컴포넌트의 가독성 및 성능을 극대화하고, 기존 화면의 깨짐 현상과 레이아웃 고정 버그를 해결합니다.
1. **HTML 중첩 버그 해결**: "[선택] 전체동의" 하위 마케팅 수신 동의 체크박스들의 중첩 `<label>` 구조로 인해 발생하던 클릭 이벤트 버블링 및 정렬 깨짐 문제를 해결합니다.
2. **단일 컴포넌트 분할 (Container-Presenter 구조)**: 거대해진 단일 컴포넌트 파일을 역할별로 쪼개어 `frontend/src/app/login/TermsStep/components/` 경로에 개별 파일로 분리합니다.
3. **렌더링 최적화**: 분리된 하위 프레젠테이션 컴포넌트들을 `React.memo`로 감싸고, 컨테이너에서 전달하는 콜백 함수들은 `useCallback`과 `useMemo`를 통해 안정적으로 제공하여 불필요한 리렌더링을 차단합니다.
4. **하단 고정 레이아웃 및 Container Query 적용**: 기존에 스크롤 영역 내부에 포함되어 함께 올라가던 다음 단계 진행 버튼(`footer`)을 스크롤 영역 외부 하단으로 고정합니다. 이때 컨테이너 기준 단위(`cqw`, `cqh`, `cqi` 등)를 적용하여 기존 기기 레이아웃을 해치지 않고 반응형으로 정렬되도록 조정합니다.
5. **인라인 스타일 제거 및 Vanilla-Extract CSS 이관**: JSX 코드 내에 흩어져 있는 모든 인라인 스타일(`style={{ ... }}`)을 제거하고, `TermsStep.css.ts` 및 하위 컴포넌트별 스타일 파일로 분리/이관하여 가독성과 유지보수성을 극대화합니다.

---

## 2. 문제 분석 및 상세 원인

### A. HTML 중첩과 이벤트 오동작
선택 약관 영역 안에서 하위 `<Checkbox>`들이 상위 `<Checkbox>`의 `children` 내에 자식 노드로 들어가 있었습니다.
* **HTML 스펙 위반**: `<Checkbox>`는 `<label>` 태그를 렌더링하므로, `<label>` 내부에 또 다른 `<label>` 및 `<input>`을 두는 것은 웹 표준에 어긋납니다.
* **이벤트 버블링 이슈**: 자식 체크박스를 선택할 때 발생한 클릭 이벤트가 부모 `<label>`로 버블링되면서 부모의 체크 상태까지 토글되어 상태 제어 꼬임이 생겼습니다.
* **정렬 정중앙화 현상**: 부모 `labelContainer`의 CSS가 `display: "flex", alignItems: "center"` 상태이기 때문에 하위 트리가 전부 `children`에 포함되면 전체 높이의 정중앙에 부모 체크 박스가 와 정렬이 심각하게 깨집니다.

### B. 스크롤 뷰포트와 푸터 버튼
현재 `footer`가 `scrollContent` 내에 있어, 긴 약관 항목들을 스크롤할 때 버튼이 가려지거나 탐색에 방해를 주었습니다. 또한 기기 화면의 크기에 유연하게 반응하지 않고 고정 px 단위를 주로 써서 모바일 프레임 내부에서 가끔 삐져나가거나 잘려 보이는 현상이 있습니다.

---

## 3. 리팩토링 설계 및 컴포넌트 구조

약관 동의 화면을 컨테이너-프레젠터 구조로 평탄화하여 구현합니다.

### A. 컨테이너: [TermsStep.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/TermsStep/TermsStep.tsx)
* 필수(`req`) 및 선택(`opt`) 약관의 체크 상태를 관리합니다.
* `termsSchema`를 통한 Zod 유효성 검증 및 `useOnboardingStore`로 데이터 연동을 수행합니다.
* 하위 컴포넌트로 전달될 모든 토글/체인지 핸들러들을 `useCallback`으로 최적화합니다.
* 반환 구조:
  ```tsx
  return (
    <div className={layoutContainer}>
      <div className={scrollContent}>
        <TermsHeader />
        <TermsAllAgreement checked={isAllChecked} onChange={handleToggleAll} />
        
        {/* 필수 약관 섹션 */}
        <RequiredTermsSection 
          values={req} 
          onChange={handleReqChange} 
          onToggleAll={handleToggleReqAll} 
          onToggleCertAll={handleToggleCertAll} 
        />
        
        {/* 선택 약관 섹션 */}
        <OptionalTermsSection 
          values={opt} 
          onChange={handleOptChange} 
          onToggleAll={handleToggleOptAll} 
          onToggleMarketingAll={handleToggleMarketingAll} 
        />
      </div>
      {/* 바닥에 항상 고정되는 다음 버튼 영역 */}
      <TermsFooter onNext={handleSubmit} disabled={!isValid} />
    </div>
  );
  ```

### B. 분리될 컴포넌트 목록 (`frontend/src/app/login/TermsStep/components/`)
모든 서브 컴포넌트는 `React.memo`로 최적화하여 렌더링 성능을 개선합니다.

1. **`TermsHeader.tsx`**: "약관에 동의해 주세요" 타이틀 영역.
2. **`TermsAllAgreement.tsx`**: "전체동의 (선택 동의 포함)" 영역.
3. **`RequiredTermsSection.tsx`**: 필수 약관 전체 영역 제어 (아코디언 형태).
4. **`OptionalTermsSection.tsx`**: 선택 약관 영역 제어 (중첩된 HTML 구조를 시각적 여백 기반의 Sibling 평탄화 구조로 개편).
5. **`TermsRow.tsx`**: 단일 체크박스 행 렌더링 (약관명, 필수/선택 표시 및 상세 우측 화살표 아이콘 연동).
6. **`TermsFooter.tsx`**: 하단에 고정되는 다음 액션 버튼 영역.

---

## 4. 평탄화된 선택 약관 컴포넌트 DOM 구조 (Nesting 제거)
부모 체크박스의 `children`에 하위 요소를 중첩시키지 않고, 시각적인 들여쓰기(`subItemContainer`, `subItemContainerBordered`) 클래스를 활용해 형제 노드로 나열합니다. 인라인 스타일을 배제하고 CSS 클래스로 마진과 레이아웃을 처리합니다.

```tsx
<Flex direction="column" gap={3}>
  {/* [선택] 수집/이용 및 제공 동의서 헤더 */}
  <div className={itemRow}>
    <Checkbox checked={values.personalInfoCollectionOptional} onChange={(e) => onChange("personalInfoCollectionOptional", e.target.checked)}>
      <span className={textGray}>개인(신용)정보 수집 · 이용동의</span>
    </Checkbox>
  </div>

  {/* 들여쓰기 및 왼쪽 세로선이 있는 별개의 형제(Sibling) 컨테이너 */}
  <div className={subItemContainerBordered}>
    {/* 광고성정보 수신동의 */}
    <div className={marketingHeaderWrapper}>
      <Checkbox checked={isMarketingAllChecked} onChange={(e) => onToggleMarketingAll(e.target.checked)}>
        <span className={textGray}>광고성정보 수신동의</span>
      </Checkbox>
    </div>

    {/* 추가 들여쓰기 하위 마케팅 항목들 */}
    <div className={subItemContainer}>
      <Checkbox checked={values.marketingSms} onChange={(e) => onChange("marketingSms", e.target.checked)}>
        <span className={textSmallGray}>문자메시지(SMS, LMS, 모바일메시지 등)</span>
      </Checkbox>
      <Checkbox checked={values.marketingCall} onChange={(e) => onChange("marketingCall", e.target.checked)}>
        <span className={textSmallGray}>전화</span>
      </Checkbox>
      <Checkbox checked={values.marketingEmail} onChange={(e) => onChange("marketingEmail", e.target.checked)}>
        <span className={textSmallGray}>전자우편(이메일)</span>
      </Checkbox>
      <Checkbox checked={values.marketingMail} onChange={(e) => onChange("marketingMail", e.target.checked)}>
        <span className={textSmallGray}>우편, 택배 등</span>
      </Checkbox>
    </div>

    {/* 개인정보 제공 동의 */}
    <div className={personalInfoProvisionWrapper}>
      <Checkbox checked={values.personalInfoProvisionOptional} onChange={(e) => onChange("personalInfoProvisionOptional", e.target.checked)}>
        <span className={textGray}>개인(신용)정보 제공 동의</span>
      </Checkbox>
    </div>
  </div>
</Flex>
```

---

## 5. 컨테이너 쿼리 단위(cqw, cqh, cqi) 및 Vanilla-Extract CSS 적용

기존의 기기 내부 뷰포트 레이아웃 흐름을 해치지 않고 디바이스 프레임 내부에서 올바르게 비례적으로 축소/확장되도록 `TermsStep.css.ts` 및 하위 스타일을 다음과 같이 수정합니다. 기존 인라인 스타일을 CSS 클래스로 이관합니다.

* **여백 및 패딩 (Container Query 단위)**:
  * `scrollContent`: `padding: "3cqh 3cqw"` 적용.
  * `sectionCard`: `marginBottom: "2.5cqh"`, `borderRadius: "3cqw"` 적용.
  * `subItemContainerBordered`: `marginLeft: "6cqw"`, `paddingLeft: "3cqw"` 적용.
  * `footer`: `padding: "3cqh 5cqw"` 및 고정 영역 구분을 위한 `borderTop: "1px solid #e2e2e2"` 적용.
* **텍스트 및 제목 스타일**: 
  * `headerTitle`의 크기를 기존 `18px`에서 `4.5cqw` 수준의 기기 반응형 폰트로 조정.
* **인라인 스타일 이관 클래스**:
  * `allAgreementWrapper` (기존 `style={{ marginBottom: "24px" }}` 대체)
  * `itemGroupHeaderChevron` (기존 `style={{ marginTop: "4px" }}` 대체)
  * `marketingHeaderWrapper` (기존 `style={{ marginBottom: "8px" }}` 대체)
  * `personalInfoProvisionWrapper` (기존 `style={{ marginTop: "8px", display: "flex" ... }}` 대체)
  * `optionalSectionGuide` (선택 동의서 안내 문구 인라인 스타일 대체)

---

## 6. 검증 계획

### 자동화 검증
1. Biome 린터 실행 및 포맷 검사: `pnpm run lint` 및 `pnpm run format` 실행
2. Production 빌드 테스트: `pnpm run build`를 수행하여 TypeScript 컴파일 에러 및 빌드 무결성 확인

### 수동 검증
1. 선택 약관 헤더 및 개별 체크박스 토글 시 하위/상위 체크 상태가 정상적으로 동기화되는지 확인합니다.
2. 체크박스 클릭 시 다른 엉뚱한 체크박스가 동시에 반응하거나 정렬이 튀는 현상이 완벽히 고쳐졌는지 검사합니다.
3. 약관이 길어져 스크롤이 발생할 때, 하단 푸터 버튼 영역이 항상 디바이스 프레임 하단에 고정되어 있고 스크롤 영역만 정상 동작하는지 테스트합니다.
4. 모든 UI 요소에서 인라인 스타일이 완전히 제거되었는지 코드를 재검토합니다.
