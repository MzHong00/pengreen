export const getFormData = <T>(
  htmlForm: HTMLFormElement | null,
  attachJson?: object
): T | undefined => {
  if (!htmlForm) return;

  const form = new FormData(htmlForm);

  const entries = Array.from(form.entries());
  const json = entries.reduce(
    (prev, cur) => ({
      ...prev,
      [`${cur[0]}`]: cur[1],
    }),
    { ...attachJson }
  );

  return json as T;
};
