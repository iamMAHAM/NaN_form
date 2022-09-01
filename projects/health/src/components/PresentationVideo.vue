<template>
    <div class="infoemmmmmmmmmmmmm">
        <h1>INFOS: LA VIDEO SERA AJOUTÉE PLUS TARD (le 1er Aout) </h1>
        <p>POur linstant j'ai une video comme ça</p>
		<iframe width="560" height="315" src="https://www.youtube.com/embed/3mvq36DUuMA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</template>

<script>


export default {
    name: "presentation",
	setup(){
		window.location.href= "https://www.youtube.com/watch?v=3mvq36DUuMA"
	}
}

</script>

<style>
    .infoemmmmmmmmmmmmm{
		display: none;
        padding: 5rem;
        text-align: center;
    }
</style>