export const defaultBindings = [
  {
    name: 'Chat',
    template: '{{text}}',
    keys: {
      ctrl: true,
      alt: false,
      command: false,
      shift: true,
      code: 'KeyJ'
    }
  },
  {
    name: 'Rewrite message',
    template: [
      'Imagine you are a copywriter.',
      'As a copywriter your task is to rewrite text messages.',
      'Try to reuse the same words and to stay as close as possible to the original text.',
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
    template: 'Define "{{text}}"',
    keys: {
      ctrl: false,
      alt: false,
      command: true,
      shift: true,
      code: 'KeyU'
    }
  }
];

export type Binding = typeof defaultBindings[0];
