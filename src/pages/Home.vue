<script setup>
import {RouterLink} from "vue-router";
import Button from "@/components/Button.vue";
import {useAnswerStore} from "@/store/answer.js";
const store = useAnswerStore();
</script>

<template>
<div class="card">
  <div class="card__content">
    <h1 class="card__header">Привет, моя любимая! &#128150;</h1>
    <p>
      Решил подготовить небольшой квиз, чтобы ты смогла выбрать,
      как ты хочешь провести свой вечер и&nbsp;чтобы я тебе это успешно (по&nbsp;возможности&nbsp;&#129313;) организовал
    </p>
    <p>
      P.S. Выбирай с&nbsp;умом, есть вопросы с&nbsp;подвохом&nbsp;&#129320;
    </p>
  </div>
  <div class="card__footer">
    <a href="tel:+79778806105">
      <Button label="Связаться с бубликом	&#129300;"/>
    </a>
    <RouterLink :to="store.skipFakeFlag ? '/question/1/' : '/question/0/'">
      <Button label="Стартуем! &#128527;" animated/>
    </RouterLink>
  </div>
</div>
</template>

<style scoped>
</style>