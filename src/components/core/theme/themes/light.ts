import { palette, DesignTokens } from '../DesignTokens';

export const LightTheme = {
  font: {
    color: {
      default: palette.black,
      disabled: palette.concrete,
      inverted: palette.white,
      action: palette.deepOcean,
      error: palette.bloodIn,
    },
  },
  icon: {
    color: {
      default: palette.black,
    },
  },
  background: {
    default: palette.white,
    disabled: palette.fog,
  },
  border: {
    color: {
      default: palette.concreteLight,
    },
    boxShadow: DesignTokens.border.default.boxShadow,
  },
  scrollBar: {
    thumb: {
      color: palette.concreteDark,
    },
  },
  input: {
    background: {
      default: palette.white,
      disabled: palette.fog,
    },
    description: {
      color: {
        default: palette.almostBlack,
        error: palette.bloodIn,
      },
    },
    font: {
      color: {
        default: palette.black,
        disabled: palette.concreteDark,
        error: palette.bloodIn,
      },
    },
    icon: {
      color: {
        default: palette.black,
      },
    },
  },
  radio: {
    background: {
      default: 'transparent',
      action: palette.almostBlack,
      disabled: palette.concreteSuperLight,
    },
    border: {
      default: palette.black,
      action: palette.almostBlack,
      disabled: palette.concreteSuperLight,
    },
    hover: {
      border: {
        default: palette.concreteDark,
      },
    },
  },
  switch: {
    background: {
      default: palette.concreteMedium,
      action: palette.almostBlack,
    },
  },
  textButton: {
    color: {
      default: palette.black,
      disabled: palette.concrete,
    },
  },
  primaryButton: {
    background: {
      default: palette.almostBlack,
      disabled: palette.concreteLight,
    },
    hover: {
      background: {
        default: palette.concreteBlack,
      },
    },
    font: {
      color: {
        default: palette.almostWhite,
        disabled: palette.concreteDark,
      },
    },
  },
  outlinedButton: {
    background: {
      default: palette.white,
      disabled: palette.fog,
    },
    hover: {
      background: {
        default: palette.fog,
      },
    },
    font: {
      color: {
        default: palette.black,
        disabled: palette.concrete,
      },
    },
  },
  plainButton: {
    hover: {
      primary: palette.concreteLight,
      secondary: palette.black,
    },
  },
  popup: {
    background: {
      default: palette.almostBlack,
    },
    font: {
      color: {
        default: palette.white,
      },
    },
  },
  footer: {
    logo: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCA2NiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMi4wMDQ0IDIuOTY0M1YxMS44ODA5SDI0LjMwNzhWMi45NjQzSDI3LjUwODhWMC44NDU3MDNIMTguODAzNFYyLjk2NDNIMjIuMDA0NFpNMjcuMTQ1OCAzLjg3NTA2VjExLjg4MDlWMTEuODg3NUgyOS4zNDM2VjguMzQ5ODZDMjkuMzQzNiA2LjU5NDI2IDMwLjIzNDYgNi4wMjAwNiAzMS4yMzEyIDYuMDIwMDZIMzEuOTI0MlYzLjg3NTA2SDMxLjEwNThDMzAuNDEyOCAzLjg3NTA2IDI5Ljc2NiA0LjA2NjQ2IDI5LjI2NDQgNS4xNDIyNlYzLjg3NTA2SDI3LjE0NThaTTMyLjkyMDggOC45NTA0NlYzLjg3NTA2SDM1LjExMlY4LjQ1NTQ2QzM1LjExMiA5LjM5MjY2IDM1LjU2NzQgMTAuMDg1NyAzNi41MDQ2IDEwLjA4NTdDMzcuNDA4OCAxMC4wODU3IDM3Ljk4MyA5LjM5MjY2IDM3Ljk4MyA4LjQ2ODY2VjMuODc1MDZINDAuMTc0MlYxMS44ODc1SDM4LjA4ODZWMTAuODc3N0MzNy41NjA2IDExLjY3NjMgMzYuNzc1MiAxMi4wNzIzIDM1Ljc3ODYgMTIuMDcyM0MzNC4wMjMgMTIuMDY1NyAzMi45MjA4IDEwLjg1NzkgMzIuOTIwOCA4Ljk1MDQ2Wk00My4wMTg4IDkuMTk0NzNMNDEuMTExNCA5LjYzMDMzQzQxLjE5NzIgMTAuNTA4MSA0Mi4wMjg4IDEyLjAzMjcgNDQuNTc2NCAxMi4wMzkzQzQ2Ljg5MyAxMi4wMzkzIDQ3LjkwMjggMTAuNzA2MSA0Ny45MDI4IDkuNDM4OTNDNDcuOTAyOCA4LjI1NzUzIDQ3LjI1NiA3LjQyNTkzIDQ1Ljg2MzQgNy4xMDkxM0w0NC4wMzUyIDYuNjg2NzNDNDMuNjM5MiA2LjU5NDMzIDQzLjQxNDggNi40MDk1MyA0My40MTQ4IDYuMDc5NTNDNDMuNDE0OCA1LjY4MzUzIDQzLjg2MzYgNS40MTI5MyA0NC40NzA4IDUuNDEyOTNDNDUuNDI3OCA1LjQxMjkzIDQ1Ljc3MSA1LjkyNzczIDQ1Ljg2MzQgNi4zOTYzM0w0Ny43ODQgNS45NzM5M0M0Ny42OTE2IDUuMDgyOTMgNDYuNzgwOCAzLjcyMzMzIDQ0LjUxNyAzLjcyMzMzQzQyLjM4NTIgMy43MjMzMyA0MS4yNSA0LjgzMjEzIDQxLjI1IDYuMjA0OTNDNDEuMjUgNy41NTEzMyA0MS45Mjk4IDguMjkwNTMgNDMuNTMzNiA4LjY0MDMzTDQ0Ljc4NzYgOC45MTA5M0M0NS41NDY2IDkuMDc1OTMgNDUuNzExNiA5LjMwMDMzIDQ1LjcxMTYgOS42MDM5M0M0NS43MTE2IDkuOTgwMTMgNDUuMzAyNCAxMC4yODM3IDQ0LjU2MzIgMTAuMjgzN0M0My42MDYyIDEwLjI4MzcgNDMuMTExMiA5LjgxNTEzIDQzLjAxODggOS4xOTQ3M1pNNTIuMTEzNiAxMS44ODA5QzUwLjY5NDYgMTEuODgwOSA0OS43NDQyIDExLjA5NTUgNDkuNzQ0MiA5LjUzNzg4VjUuNzg5MDhINDguMzk3OFYzLjg2ODQ4SDQ5Ljc0NDJWMi4wODY0OEw1MS45MzU0IDEuNDUyODhWMy44Njg0OEg1My41NTI0VjUuNzg5MDhINTEuOTM1NFY5LjE0MTg4QzUxLjkzNTQgOS43MjkyOCA1Mi4yMzkgOS45NjAyOCA1Mi44MjY0IDkuOTYwMjhINTMuNjcxMlYxMS44ODA5SDUyLjExMzZaTTU0Ljg1OTIgMC44NTIzMDdWMTEuODgwOVYxMS44ODc1SDU3LjA1MDRWMC44NTIzMDdINTQuODU5MlpNNjMuNjU3IDMuODc1MDZINjZMNjIuNjYwNCAxNC43NTg1SDYwLjMxNzRMNjEuMjQxNCAxMS44ODc1SDYwLjAzMzZMNTcuODI5MiAzLjg3NTA2SDYwLjE3MjJMNjEuODIyMiAxMC4wNzI1TDYzLjY1NyAzLjg3NTA2Wk01LjE0MTQgNS42ODM1MUgwVjAuODUyMzA3SDE0LjY5ODJWNS42ODM1MUgxMC4xMjQ0VjExLjg4MDlINS4xNDE0VjkuNzgyMTFMOS4yNDY2IDUuNjgzNTFMNS4xNDE0IDEuNTc4MzFWNS42ODM1MVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo='); background-repeat: no-repeat; background-size: cover; width: 66px; height: 16px",
  },
} as const;
