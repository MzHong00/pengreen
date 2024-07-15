import { type VoteFormDto } from "entities/voteForm";

export const getFormData = (e: React.MouseEvent<HTMLInputElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget.form!);
  const formJson: VoteFormDto = {
    title: formData.get("title"),
    choice: formData.getAll("choice"),
    max_choice: formData.get("max_choice"),
    category: formData.getAll("category"),
    description: formData.get("description"),
  } as any;

  return formJson;
};
