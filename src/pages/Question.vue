<script setup>
import {computed, onMounted, ref, toRaw, toValue} from "vue";
import {RouterLink, useRoute, useRouter} from "vue-router";
import Button from "@/components/Button.vue";
import Radio from "@/components/Radio.vue";
import {useAnswerStore} from "@/store/answer.js";

const router = useRouter();
const route = useRoute();
const store = useAnswerStore();
const questionId = computed(() => +route.params.id);

const questions = ref([]);
const question = computed(() => questions.value.find((q) => q.id === questionId.value) || null);

const answer = ref(null);

const isFake = ref(false);
const isSerious = ref(false);

const goBack = () => {
  if (questionId.value === 0 || questionId.value === 1) {
    router.push("/");
  } else {
    router.push(`/question/${questionId.value - 1}`);
    setTimeout(() => {
      setInit();
      if (store.answers && store.answers[questionId.value]) {
        answer.value = store.answers[questionId.value];
      }
    }, 800)
  }
}

const setAnswer = () => {
  console.log('111')
  if (questionId.value === 0) return
  store.addAnswer(toValue(questionId.value), toRaw(answer.value));
}

const goForward = () => {
  if (questionId.value === 0) {
    isFake.value = true;
  } else {
    if (questionId.value === 4) {
      router.push('/results/')
      return;
    }
    router.push(`/question/${questionId.value + 1}`);
    setTimeout(() => {
      setInit();
      if (store.answers && store.answers[questionId.value]) {
        answer.value = store.answers[questionId.value];
      }
    }, 800)
  }
}

const setInit = () => {
  isFake.value = false;
  isSerious.value = false;
  answer.value = null;
}

const skipFake = () => {
  setInit();
  store.skipFakeFlag = true;
}

onMounted(async () => {
  const res = await fetch('/questions.json');
  questions.value = await res.json();
  if (store.answers && store.answers[questionId.value]) {
    answer.value = store.answers[questionId.value];
  }
})
</script>

<template>
  <div v-if="question">
    <transition name="slide-fade" mode="out-in">
      <div class="card" v-if="!isFake" :key="questionId">
        <div class="card__content">
          <h2 v-html="question.question"/>
          <Radio v-model="answer" name="question-variants" :options="question?.variants" @update:model-value="setAnswer"/>
        </div>
        <div class="card__footer">
          <Button label="Бля, назад	&#128579;" @click="goBack"/>
          <transition name="slide-fade" mode="out-in">
              <Button
                  v-if="answer !== null"
                  :label="question.nextBtnText ? question.nextBtnText + ' &#128076;' : 'Следующий, нах! &#128527;'"
                  :animated="answer"
                  @click="goForward"
              />
          </transition>
        </div>
      </div>
      <div v-else class="card">
        <div class="card__content">
          <h2>Ну вот и мы и выбрали - {{answer.label}}</h2>
          <transition name="fade" mode="out-in">
            <p v-if="!isSerious">
              Поздравляю!
            </p>
            <p v-else>
              Ладно, ладно, наебал &#128515;<br>
              Теперь серьезно.
            </p>
          </transition>
        </div>
        <div class="card__footer">
          <Button v-if="!isSerious" label="Блять, серьезно, Дань?! Ты еблан?! &#129324;" @click="isSerious = true"/>
          <RouterLink v-else to="/question/1/">
            <Button label="Ну давай серьезно &#128556;" @click="skipFake"/>
          </RouterLink>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>