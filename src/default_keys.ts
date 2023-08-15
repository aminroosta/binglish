export const defaultKeys = [
  {
    name: 'Rewrite message',
    template: [
      'Imagine you are copywriter.',
      'As a copywriter your task is to rewrite sample text messages.',
      'Try to reuse the same words and stay as close to the original text.',
      'Reply back with the rewritten text only.',
      'Here is the first such message to rewrite:',
      '',
      '"{{text}}"',
    ].join('\n'),
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

export type Binding = typeof defaultKeys[0];
