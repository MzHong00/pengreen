export const getFormData = <T>(
  htmlForm: HTMLFormElement,
  attachJson?: object
): T=> {
  if (!htmlForm) throw new Error("htmlForm is empty");

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
