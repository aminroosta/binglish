export const defaultKeys = [
  {
    name: 'Rewrite message',
    template: 'Rewrite the following message: {{text}}',
    keys: {
      ctrl: true,
      alt: true,
      command: false,
      shift: false,
      code: 'KeyD'
    }
  },
  {
    name: 'Define word',
    template: 'Define the following word: {{text}}',
    keys: {
      ctrl: false,
      alt: false,
      command: true,
      shift: true,
      code: 'KeyR'
    }
  }
];

export type Key = typeof defaultKeys[0];
