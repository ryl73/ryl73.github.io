import {defineStore} from "pinia";

export const useAnswerStore = defineStore('answer', {
    state: () => ({
        answers: null,
        skipFakeFlag: false,
    }),
    actions: {
        addAnswer(questionId, answer) {
           if (this.answers) {
               this.answers[questionId] = answer;
           } else {
               this.answers = {
                   [questionId]: answer,
               }
           }
        },
        retry() {
            setTimeout(() => {
                this.answers = null;
            }, 500)
        },
    },
})