<template>
  <div class="article-content">
	<Banner />
	<Card />
  </div>
</template>

<script>
import Banner from './partials/Banner.vue';
import Card from './partials/Card.vue';

export default {
	name: 'Article Content',
	components: {
		Banner,
		Card
	}
}
</script>

<style>

</style>