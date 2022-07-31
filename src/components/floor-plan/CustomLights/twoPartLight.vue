<template>
    <svg viewBox="0 0 200 200">
        <rect width="35%" height="30%" fill="black" opacity="0" stroke="white" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect fill="black" fill-opacity="0" stroke-width="1.5" stroke-opacity="1" width="32" height="16" x="15" y="23" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="1.5" stroke-opacity="1" width="15" height="16" x="15" y="23" :transform="`rotate(${rotation})`" transform-origin="center"/>
    </svg> 
</template>

<script>
export default {
	name: "twoPartLight",
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