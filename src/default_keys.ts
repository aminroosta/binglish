export const defaultKeys = [
  {
    name: 'Rewrite message',
    template: 'Rewrite the following message: {{text}}',
    keys: {
      ctrl: true,
      alt: false,
      command: false,
      shift: true,
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
      code: 'KeyU'
    }
  }
];

export type Key = typeof defaultKeys[0];
