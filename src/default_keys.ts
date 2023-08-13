export const defaultKeys = [
  {
    name: 'Rewrite message',
    template: 'Rewrite the following message: {{text}}',
    keys: {
      ctrl: true,
      alt: true,
      command: false,
      shift: false,
      key: 'r'
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
      key: 'r'
    }
  }
];
