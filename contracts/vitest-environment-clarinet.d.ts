declare module 'vitest-environment-clarinet' {
  export const Clarinet: any;
  export const Tx: any;
  export const Chain: any;
  export const Account: any;
}

declare module 'vitest' {
  interface TestContext {
    chain: any;
    accounts: any;
  }
}