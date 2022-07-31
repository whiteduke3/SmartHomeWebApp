<template>
    <svg viewBox="0 0 200 200">
        <rect width="70%" height="25%" fill="black" opacity="0" stroke="white" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect fill="black" fill-opacity="0" stroke-width="0.7" stroke-opacity="1" width="110" height="7" x="15" y="20" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="1" stroke-opacity="1" width="20" height="7" x="15" y="20" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="1" stroke-opacity="1" width="20" height="7" x="105" y="20" :transform="`rotate(${rotation})`" transform-origin="center"/>
    </svg> 
</template>

<script>
export default {
	name: "threePartLight",
    props: {
        rotation: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style scoped lang="scss">

rect {
  transition: fill .7s ease, fill-opacity .7s ease;
}

</style>