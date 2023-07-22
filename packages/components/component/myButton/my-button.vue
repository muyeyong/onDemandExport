<template>
    <div class="myButton">
        <button>我的按钮</button>
    </div>
</template>
    
<script setup lang='ts' name="MyButton">
import { cloneDeep } from 'lodash'

console.log("MyButton v2")
console.log(cloneDeep({ a: 'hhhh'}))
    
</script>
    
<style scoped>
   @import url('./button.less');
</style>