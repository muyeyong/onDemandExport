<template>
    <div class="myInput">
        <a-input placeholder="Basic usage" />
    </div>
</template>
    
<script setup lang='ts' name="MyInput">
    console.log('MyInput')
</script>
    
<style scoped>
@import url('./input.css');
    .myInput {
        margin: 10px;
        background-color: pink;
    }
</style>