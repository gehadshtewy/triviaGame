import { create } from 'zustand'


export const useScoreStore = create((set)=>({
    score:0,
    correctAnswers: () => set((state) => ({score: state.score +1})),
    wrongAnswers: () => set((state)=> ({score: state.score -1}))
}))





export const resultstate = {
    score:0,
    correctAnswers:0,
    wrongAnswers:20
};