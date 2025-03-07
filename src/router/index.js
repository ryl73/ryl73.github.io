import { createRouter, createWebHistory } from 'vue-router'
import Question from "@/pages/Question.vue";
import Home from "@/pages/Home.vue";
import Results from "@/pages/Results.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/question/:id/',
			name: 'Question',
			component: Question,
		},
		{
			path: '/results/',
			name: 'Results',
			component: Results
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/',
		},
	],
})

export default router
