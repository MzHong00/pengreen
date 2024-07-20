import { type VoteFormDto } from "entities/voteForm";

export const getFormData = (e: React.MouseEvent<HTMLInputElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget.form!);
  console.log(formData.get("category"));

  const formJson: Omit<VoteFormDto, 'owner'> = {
    title: formData.get("title"),
    choice: formData.getAll("choice"),
    max_choice: formData.get("max_choice"),
    category: formData.get("category"),
    description: formData.get("description"),
  } as any;

  return formJson;
};
