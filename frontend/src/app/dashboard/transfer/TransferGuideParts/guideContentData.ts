export interface TransferGuideStep {
  id: string;
  text: string;
}

export interface TransferGuideNotice {
  id: string;
  text: string;
}

interface TransferGuideInfo {
  title: string;
  description: string;
}

export interface TransferGuideContent {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  why: TransferGuideInfo;
  what: TransferGuideInfo;
  steps: TransferGuideStep[];
  warnings: TransferGuideNotice[];
  testAccounts?: boolean;
}

export const TRANSFER_GUIDE_CONTENT: Record<string, TransferGuideContent> = {
  "recipient-selection": {
    badge: "이체 1/5",
    title: "먼저 받을 사람을",
    titleHighlight: "선택해 주세요",
    description:
      "자주 보내는 대상이 있다면 빠르게 선택하고, 새 대상이라면 직접 입력으로 진행할 수 있습니다.",
    why: {
      title: "왜 필요한가요?",
      description:
        "송금은 받는 사람이 먼저 확정되어야 금액 입력과 최종 확인 단계에서 실수를 줄일 수 있습니다.",
    },
    what: {
      title: "무엇을 해야 하나요?",
      description:
        "등록된 수취인을 선택하거나, 목록에 없는 경우 계좌번호 직접 입력을 선택해 주세요.",
    },
    steps: [
      {
        id: "check-recipient-list",
        text: "최근 또는 등록된 수취인 목록에서 보낼 대상을 확인해 주세요.",
      },
      {
        id: "select-recipient",
        text: "대상이 보이면 선택하고, 없으면 직접 입력 흐름으로 이동해 주세요.",
      },
      {
        id: "confirm-recipient-intent",
        text: "선택한 대상이 이번 이체의 받는 사람이 맞는지 한 번 더 확인해 주세요.",
      },
    ],
    warnings: [
      {
        id: "recipient-selection-mistake",
        text: "동명이인이나 비슷한 계좌 별칭이 있을 수 있으니 이름만 보고 넘기지 마세요.",
      },
    ],
  },
  "recipient-input": {
    badge: "이체 2/5",
    title: "은행과 계좌번호를",
    titleHighlight: "정확히 입력해 주세요",
    description:
      "은행과 계좌번호는 수취인 조회에 사용됩니다. 하이픈은 입력해도 되고 생략해도 됩니다.",
    why: {
      title: "왜 필요한가요?",
      description:
        "계좌번호 확인은 송금 전 받는 사람을 검증하는 절차입니다. 잘못된 계좌로 이체되는 일을 막는 핵심 단계입니다.",
    },
    what: {
      title: "무엇을 해야 하나요?",
      description:
        "은행을 먼저 선택한 뒤 계좌번호를 입력하고, 조회된 예금주명이 의도한 수취인과 같은지 확인해 주세요.",
    },
    steps: [
      {
        id: "choose-bank",
        text: "받는 계좌의 은행을 선택해 주세요.",
      },
      {
        id: "enter-account-number",
        text: "계좌번호를 숫자로 입력해 주세요. 하이픈이 있어도 입력할 수 있습니다.",
      },
      {
        id: "verify-account-holder",
        text: "조회된 예금주명이 실제로 보내려는 사람과 일치하는지 확인해 주세요.",
      },
    ],
    warnings: [
      {
        id: "account-number-warning",
        text: "예금주명이 예상과 다르면 다음 단계로 진행하지 말고 계좌 정보를 다시 확인해 주세요.",
      },
    ],
    testAccounts: true,
  },
  "amount-input": {
    badge: "이체 3/5",
    title: "보낼 금액을",
    titleHighlight: "입력해 주세요",
    description:
      "잔액과 이체 목적을 함께 확인하면서 정확한 금액을 입력하는 단계입니다.",
    why: {
      title: "왜 필요한가요?",
      description:
        "금액은 이체 결과를 직접 결정합니다. 한 자리 차이도 실제 출금액이 달라지므로 별도 확인이 필요합니다.",
    },
    what: {
      title: "무엇을 해야 하나요?",
      description:
        "숫자 패드로 금액을 입력하고, 표시된 원화 단위와 내 계좌 잔액을 함께 확인해 주세요.",
    },
    steps: [
      {
        id: "enter-amount",
        text: "보낼 금액을 숫자로 입력해 주세요.",
      },
      {
        id: "review-amount-digits",
        text: "입력한 금액의 자리수와 원 단위를 확인해 주세요.",
      },
      {
        id: "check-balance",
        text: "잔액보다 큰 금액을 입력하지 않았는지 확인한 뒤 다음으로 이동해 주세요.",
      },
    ],
    warnings: [
      {
        id: "amount-digit-warning",
        text: "금액을 빠르게 입력하면 0이 더 들어갈 수 있으니 다음 단계 전 한 번 멈춰 확인해 주세요.",
      },
    ],
  },
  summary: {
    badge: "이체 4/5",
    title: "보내기 전에",
    titleHighlight: "최종 확인해 주세요",
    description:
      "받는 사람, 은행, 계좌번호, 금액이 모두 맞는지 이체 실행 전에 확인하는 단계입니다.",
    why: {
      title: "왜 필요한가요?",
      description:
        "간편 비밀번호를 입력하면 이체가 완료됩니다. 최종 확인은 실행 전 되돌릴 수 있는 마지막 안전 장치입니다.",
    },
    what: {
      title: "무엇을 해야 하나요?",
      description:
        "수취인 정보와 금액을 순서대로 읽고, 하나라도 다르면 이전 단계로 돌아가 수정해 주세요.",
    },
    steps: [
      {
        id: "review-recipient",
        text: "받는 사람 이름과 은행, 계좌번호를 확인해 주세요.",
      },
      {
        id: "review-transfer-amount",
        text: "보낼 금액이 의도한 금액과 같은지 확인해 주세요.",
      },
      {
        id: "move-to-pin",
        text: "모든 정보가 맞을 때만 간편 비밀번호 입력 단계로 진행해 주세요.",
      },
    ],
    warnings: [
      {
        id: "summary-final-warning",
        text: "정보가 틀린 상태에서 인증하면 잘못된 이체가 완료될 수 있습니다.",
      },
    ],
  },
  "confirm-pin": {
    badge: "이체 5/5",
    title: "간편 비밀번호로",
    titleHighlight: "이체를 인증해 주세요",
    description:
      "등록한 6자리 비밀번호를 입력하면 확인한 내용대로 이체가 실행됩니다.",
    why: {
      title: "왜 필요한가요?",
      description:
        "비밀번호 인증은 계좌 주인이 직접 이체를 승인했다는 것을 확인하는 보안 단계입니다.",
    },
    what: {
      title: "무엇을 해야 하나요?",
      description:
        "주변에서 비밀번호가 보이지 않도록 한 뒤, 등록한 6자리 간편 비밀번호를 입력해 주세요.",
    },
    steps: [
      {
        id: "shield-pin",
        text: "화면과 키보드 입력이 다른 사람에게 보이지 않는지 확인해 주세요.",
      },
      {
        id: "enter-pin",
        text: "등록한 간편 비밀번호 6자리를 입력해 주세요.",
      },
      {
        id: "wait-for-completion",
        text: "인증 후 완료 화면이 나올 때까지 화면을 닫지 말고 기다려 주세요.",
      },
    ],
    warnings: [
      {
        id: "pin-security-warning",
        text: "간편 비밀번호는 누구에게도 알려주지 마세요. 입력 실패가 반복되면 인증이 제한될 수 있습니다.",
      },
    ],
  },
  success: {
    badge: "이체 완료",
    title: "고생하셨습니다",
    titleHighlight: "교육이 완료되었습니다",
    description:
      "이체 흐름의 마지막 단계까지 모두 완료했습니다. 이제 사이트를 종료하셔도 됩니다.",
    why: {
      title: "무엇을 마쳤나요?",
      description:
        "받는 사람 선택, 계좌 확인, 금액 입력, 최종 확인, 간편 비밀번호 인증까지 전체 이체 교육을 완료했습니다.",
    },
    what: {
      title: "이제 무엇을 하면 되나요?",
      description:
        "화면의 완료 메시지를 확인한 뒤 더 진행할 작업이 없다면 브라우저 또는 사이트를 닫아도 괜찮습니다.",
    },
    steps: [
      {
        id: "review-success-result",
        text: "완료 화면이 표시되었는지 확인해 주세요.",
      },
      {
        id: "finish-learning",
        text: "모든 교육 과정이 끝났다는 안내를 확인해 주세요.",
      },
      {
        id: "close-site",
        text: "추가로 진행할 내용이 없다면 이제 사이트를 종료하셔도 됩니다.",
      },
    ],
    warnings: [],
  },
} as const;
