<template lang="html">
  <b-img
    class="clickable rounded align-self-end card overflow-hidden border-0"
    :src="coverUrl"
  />
</template>

<script>
import GameCardUtils from '@/components/GameCards/GameCard';

export default {
  mixins: [GameCardUtils],
};
</script>
