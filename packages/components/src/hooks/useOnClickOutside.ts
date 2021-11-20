import React, { useEffect } from 'react';

const defaultOptions = {
  ignoreClassNames: [],
};

export default function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: Event) => void,
  { ignoreClassNames }: { ignoreClassNames: string[] } = defaultOptions
): void {
  useEffect(() => {
    const listener = (event: Event) => {
      const shouldBeIgnored =
        Array.isArray(ignoreClassNames) &&
        ignoreClassNames.some(cls => !!(event.target as Element)?.closest(`.${cls}`));
      if (!ref.current || ref.current.contains(event.target as Element) || shouldBeIgnored) {
        return;
      }
      handler(event);
    };

    // eslint-disable-next-line no-undef
    document.addEventListener('mousedown', listener);
    // eslint-disable-next-line no-undef
    document.addEventListener('touchstart', listener);

    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener('mousedown', listener);
      // eslint-disable-next-line no-undef
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, ignoreClassNames]);
}
