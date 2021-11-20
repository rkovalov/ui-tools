import '@ui-tools/components/dist/styles/once.scss';
import '@ui-tools/components/dist/assets/fonts/proxima-nova/_index.scss';
import '@ui-tools/components/dist/assets/fonts/wf-icons/_index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    // storySort: (a, b) =>
    //   a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    storySort: {
      method: 'alphabetical',
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
