<template>
    <svg viewBox="0 0 200 200" :transform="`rotate(${rotation})`" transform-origin="center" style="overflow: visible;">
        <rect width="230%" height="25%" fill="black" opacity="0" stroke="white" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="2" stroke-opacity="1" width="15" height="15" x="15" y="17" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="2" stroke-opacity="1" width="15" height="15" x="80" y="17" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="2" stroke-opacity="1" width="15" height="15" x="145" y="17" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="2" stroke-opacity="1" width="15" height="15" x="210" y="17" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="2" stroke-opacity="1" width="15" height="15" x="275" y="17" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="2" stroke-opacity="1" width="15" height="15" x="340" y="17" :transform="`rotate(${rotation})`" transform-origin="center"/>
        <rect stroke-width="2" stroke-opacity="1" width="15" height="15" x="405" y="17" :transform="`rotate(${rotation})`" transform-origin="center"/>
    </svg> 
</template>

<script>
export default {
	name: "rotated7",
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