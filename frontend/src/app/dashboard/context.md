# Dashboard Context

## 1. Role and Purpose
- Serves as the primary landing dashboard (`/dashboard`) for authenticated users, presenting an overview of their registered bank accounts and transaction history.
- Restricts access to users who haven't completed simplified PIN registration, redirecting them back to `/register-pin`.
- Features an adaptive design tailored for mobile-first presentation wrapped in a simulated desktop frame, aligned with the design system tokens.
- Hosts key user interactions, including viewing account balances (with show/hide toggle), sliding between accounts via a carousel, and observing transaction data visualizations.

## 2. Core Sub-domains
- **Account Card Component (`ui/Account/`)**: Renders visual representation cards for accounts, supporting state tracking for balance visibility and loading indicators.
- **Alert Controls (`ui/Alert/`)**: Reusable close button component designed to interface with Alert and Dialog containers.
- **Transfer Route (`transfer/`)**: Child route served at `/dashboard/transfer`, preserving dashboard-authenticated navigation while rendering the standalone transfer funnel and guide layout.
- **Dashboard Sections (`ui/Dashboard/`)**:
  - **DashboardHeader**: Contains the greeting section (`UsernameSection`) that responds to mouse hover with spring-physics transitions, and the logout action trigger.
  - **RollingNumberList**: An animated number list that slides/rolls individual digits to dynamically increment or decrement the active balance representation.
  - **TransactionChart**: Draws and updates SVGs representing transaction trajectories (over one or multiple months) using native Canvas/SVG-based calculations.
  - **utils/**: Server actions and caches to request account details (`getAccountsData`), PIN eligibility (`getPinAvailable`), transaction aggregates (`getTransactions`), authenticated user details (`getUsername`), and session removal (`logoutAction`).

## 3. Shared Assets & Helpers
### Hooks (ui/Dashboard/ui/TransactionChart/hooks/)
- `useTitleAnimation() => void`: Controls chart visual header title entry transitions.
- `useTransactionChart() => void`: Handles SVG bounds calculation, rendering paths, and coordinate mapping for financial logs.

### Utilities (ui/Dashboard/utils/ & ui/Dashboard/ui/TransactionChart/utils/)
- `getAccountsData() => Promise<AccountData[]>`: Fetches and parses user account details using server caching.
- `getPinAvailable() => Promise<boolean>`: Validates if the user has a registered simplified PIN authentication method.
- `getTransactions(accountNumber: number) => Promise<Transaction[]>`: Fetches transaction history for the past 6 months for a given account.
- `getUsername() => Promise<string | null>`: Fetches the cached name of the current authenticated user.
- `logoutAction() => Promise<void>`: Performs session cleanup on the server database, destroys session cookies, and redirects the user to `/onboarding`.
- `addAxisLabels()`: Computes and formats monthly indicators on chart timelines.
- `drawOneMonthChart()`: Draws rendering parameters for single-month timelines.
- `drawMoreThanOneMonthChart()`: Draws rendering parameters for multi-month timelines.

## 4. Directory Structure (Max Depth 3)
```text
dashboard/
├── DashboardGuide.tsx
├── TransitionLayout.tsx
├── layout.css.ts
├── layout.tsx
├── loading.tsx
├── page.tsx
├── transfer/
│   ├── TransferContentContainer.tsx
│   ├── TransferGuide.tsx
│   ├── TransferGuideParts/
│   │   ├── TransferGuideContent.tsx
│   │   ├── guideContentData.ts
│   │   └── components/
│   ├── funnelConfig.ts
│   ├── page.tsx
│   └── steps/
└── ui/
    ├── Account/
    │   ├── index.ts
    │   └── ui/
    │       ├── AccountCard.css.ts
    │       ├── AccountCard.tsx
    │       ├── Card.tsx
    │       ├── CardContainer.css.ts
    │       └── CardContainer.tsx
    ├── Alert/
    │   ├── AlertCloseButton.css.ts
    │   └── AlertCloseButton.tsx
    ├── AnimatePresenceContainer.css.ts
    ├── AnimatePresenceContainer.tsx
    ├── Dashboard/
    │   ├── ui/
    │   │   ├── DashboardHeader/
    │   │   │   ├── DashboardHeader.css.ts
    │   │   │   ├── DashboardHeader.tsx
    │   │   │   ├── DashboardHeaderSkeleton.tsx
    │   │   │   ├── Username.tsx
    │   │   │   └── UsernameSection.tsx
    │   │   ├── RollingNumberList/
    │   │   │   ├── DigitDivider.tsx
    │   │   │   ├── RollingNumber.css.ts
    │   │   │   ├── RollingNumber.tsx
    │   │   │   ├── RollingNumberList.tsx
    │   │   │   └── index.ts
    │   │   ├── TransactionChart/
    │   │   │   ├── hooks/
    │   │   │   ├── ui/
    │   │   │   ├── utils/
    │   │   │   ├── TransactionHistory.tsx
    │   │   │   └── index.ts
    │   │   ├── AccountSection.tsx
    │   │   ├── AlertMessage.tsx
    │   │   ├── DashBoardContent.tsx
    │   │   ├── DashboardContent.css.ts
    │   │   ├── DashboardSeperator.css.ts
    │   │   └── DashboardSeperator.tsx
    │   └── utils/
    │       ├── getAccountsData.ts
    │       ├── getPinAvailable.ts
    │       ├── getTransactions.ts
    │       ├── getUsername.ts
    │       └── logoutAction.ts
    ├── DashboardPage.tsx
    ├── MainTitle.css.ts
    └── MainTitle.tsx
```
