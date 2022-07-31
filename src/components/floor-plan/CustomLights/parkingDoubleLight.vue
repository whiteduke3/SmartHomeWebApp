<template>
	<svg viewBox="0 0 200 200" >
		<rect width="55%" height="10%" fill="black" opacity="0" stroke="white" />
    <rect fill="black" fill-opacity="0" stroke-width="0.5" stroke-opacity="1" width="60" height="2" x="25" y="10" />
    <rect fill="black" fill-opacity="0" stroke-width="0.5" stroke-opacity="1" width="10" height="2" x="5" y="10" />
    <circle stroke-width="1" cx="20" cy="11" r="4" />
    <circle stroke-width="1" cx="90" cy="11" r="4" />
    <rect fill="black" fill-opacity="0" stroke-width="0.5" stroke-opacity="1" width="10" height="2" x="95" y="10" />
  </svg> 
</template>

<script>
export default {
	name: "parkingDoubleLight",
}
</script>

<style scoped lang="scss">

circle {
  transition: fill .7s ease, fill-opacity .7s ease;
}

</style>