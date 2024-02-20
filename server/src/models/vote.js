class Vote {
    constructor({ own_id, title, deadline, max_choice, choice }) {
        this.own_id = own_id || "";
        this.title = title || "";
        this.deadline = deadline || "";
        this.max_choice = max_choice || 0;
        this.choice = choice || [];
    }

    getChoice() {
        return this.choice;
    }

    getData() {
        return {
            owner_id: this.own_id,
            title: this.title,
            deadline: this.deadline,
            max_choice: this.max_choice,
        }
    }
}

export default Vote;