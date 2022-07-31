<template>
	<svg viewBox="0 0 200 200" class="light-svg">
		<rect width="100%" height="100%" fill="black" fill-opacity="0" stroke-opacity="0" stroke="white"/>
        <path stroke-width="1" d="M100 100m-75,0a75,75,0 1,0 150,0a 75,75 0 1,0 -150,0zM100 100m-66,0a66,66,0 0,1 132,0a 66,66 0 0,1 -132,0z"/>
      </svg>
</template>

<script>
export default {
	name: "CircleLight",

}
</script>


<style scoped lang="scss">

.light-svg path {
  transition: fill .7s ease, fill-opacity .7s ease;
}

</style>