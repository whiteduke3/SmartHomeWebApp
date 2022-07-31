<template>
    <svg viewBox="0 0 404 210" width="404" height="210" class="rgb-svg" style="overflow: visible;">
        <rect x="0" y="190" width="404" height="30" fill="black" fill-opacity="0" stroke="white" stroke-opacity="0"/>
        <rect x="390" y="0" width="30" height="220" fill="black" fill-opacity="0" stroke="white" stroke-opacity="0"/>
        <polygon points="0,210 403,210 403,0 395,0 395,202 0,202" stroke-width="3px" stroke-opacity="1"/>
    </svg> 
</template>

<script>
export default {
	name: "apartCorner",
    props: {
        
    }
}
</script>

<style scoped lang="scss">

polygon {
  transition: fill .7s ease, fill-opacity .7s ease;
}

</style>