<script setup lang="ts">
import MainPart from './components/MainPart/MainPart.vue';

</script>

<template>
  <div className="outbox">
    <div className="page-head">Semi-quantum Communication Simulation Platform</div>
    <div className="page-content">
        <MainPart></MainPart>
    </div>
  </div>
</template>

<style scoped>
.outbox {
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    background-color: #eee;
}
.page-head {
    height: 50px;
    font-size: 25px;
    font-weight: 700;
    font-family: Helvetica ;
    border-bottom: 1px solid rgba(60, 60, 60, .5);
    line-height: 50px;
    text-align: center;
    background-color: #f9f9f9;
}
.page-content {
    flex: 1;
    /* background-color: #000; */
}
</style>
