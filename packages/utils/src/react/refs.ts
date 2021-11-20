export function mergeRefs<T>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> | React.MutableRefObject<T> | React.LegacyRef<T> {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) {
    return null;
  }
  if (filteredRefs.length === 1 && filteredRefs[0]) {
    return filteredRefs[0];
  }
  return inst => {
    filteredRefs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(inst);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = inst;
      }
    });
  };
}
