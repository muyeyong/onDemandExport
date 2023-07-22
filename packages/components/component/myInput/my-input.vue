<template>
    <div class="myInput">
        <input placeholder="Basic usage" />
    </div>
</template>
    
<script setup lang='ts' name="MyInput">
import { cloneDeep } from 'lodash'
    console.log('MyInput v2')

    console.log(cloneDeep({ a: 1 }))

</script>
    
<style scoped>
@import url('./input.less');
    .myInput {
        margin: 10px;
        background-color: pink;
    }
</style>