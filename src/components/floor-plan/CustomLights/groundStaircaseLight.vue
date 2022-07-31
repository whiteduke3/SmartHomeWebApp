<template>
    <svg viewBox="0 0 200 200"  class="light-svg" style="overflow: visible;">
        <rect x="-10" y="-30" width="800" height="90" fill="black" opacity="0" stroke="white"/>
        <rect x="-30" y="-110" width="170" height="120" fill="black" opacity="0" stroke="white" transform="rotate(90)"/>
        <polygon points="0,0 0,120 25,120 25,25 710,25 710,0" stroke-width="5px" stroke-opacity="1" />
    </svg> 
</template>

<script>
export default {
	name: "groundStaircaseLight",
    props: {
        
    }
}
</script>

<style scoped lang="scss">

polygon {
  transition: fill .7s ease, fill-opacity .7s ease;
}

</style>