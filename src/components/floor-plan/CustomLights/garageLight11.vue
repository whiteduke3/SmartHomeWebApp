<template>
    <svg viewBox="0 0 400 650" width="400" height="650" class="light-svg" style="overflow: visible;">
        <rect x="0" y="0" width="20" height="540" fill="black" opacity="0" stroke="white"/>
        <rect x="0" y="0" width="221" height="20" fill="black" opacity="0" stroke="white"/>
        <rect x="200" y="0" width="20" height="266" fill="black" opacity="0" stroke="white"/>
        <rect x="200" y="259" width="193" height="20" fill="black" opacity="0" stroke="white"/>
        <rect x="0" y="520" width="245" height="20" fill="black" opacity="0" stroke="white"/>
        <polygon points="226,520 226,650 236,650 246,520" fill="black" stroke="white" opacity="0" stroke-opacity="1"/>
        <polygon points="0,0 0,540 227,540 227,650 235,650 235,532 8,532 8,8 213,8 213,267 392,267 392,259 221,259 221,0" stroke-width="2px" stroke-opacity="1"/>
    </svg> 
</template>

<script>
export default {
	name: "garageLight11",
    props: {
        
    }
}
</script>

<style scoped lang="scss">

polygon {
  transition: fill .7s ease, fill-opacity .7s ease;
}

</style>