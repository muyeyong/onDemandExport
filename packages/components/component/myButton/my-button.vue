<template>
    <div class="myButton">
        <a-button type="primary">我的按钮</a-button>
        <Input />
    </div>
</template>
    
<script setup lang='ts' name="MyButton">
import Input from '../myInput/my-input.vue'

console.log("MyButton")
    
</script>
    
<style scoped>
   @import url('./button.less');
</style>