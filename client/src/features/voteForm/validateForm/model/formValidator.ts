import { type VoteFormDto } from "entities/voteForm";

export const getVoteFormData = (e: React.MouseEvent<HTMLInputElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget.form!);

  const initForm: Omit<VoteFormDto, "owner"> = {
    title: formData.get("title"),
    choice: formData.getAll("choice").map((choice) => ({
      content: choice,
      count: 0,
    })),
    max_choice: formData.get("max_choice"),
    category: formData.get("category"),
    description: formData.get("description"),
  } as any;

  return initForm;
};

export const getEmptyFieldsFromForm = (vote: Omit<VoteFormDto, "owner">) => {
  const invalidationItems = [];

  if (!vote.title) invalidationItems.push("제목");
  if (vote.choice.length < 2) invalidationItems.push("투표");
  if (!vote.category) invalidationItems.push("카테고리");

  return invalidationItems;
};
