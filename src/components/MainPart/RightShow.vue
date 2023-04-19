<script setup lang="ts">
import { ref } from "vue";
import moment from 'moment';
import type { SQKDSelectInterface } from './type';
import { createInitInformation } from './totalMethod';
import Q2CProtocol from './diffProtocolMethds/SQKDQ2CMethd'
import twoPartProtocol from './diffProtocolMethds/twoPartSQIAMethds'
// 运行进展信息
const progressMessage = ref<Array<Array<string>>>([]);
// 运行结果信息
const resultMessage = ref<Array<Array<string>>>([])
// 获取时间
const time:string = moment().format('LTS');
// 展示初始信息
const showInitInformation = (paramsValue:SQKDSelectInterface) => {
    const initInformation:Array<Array<Array<string>>> = createInitInformation(paramsValue);
    addProgressMessage(initInformation[0]);
    addResultMessage(initInformation[1]);
}

// 获得外部参数
const preGetParams = (paramsValue:SQKDSelectInterface) => {
    showInitInformation(paramsValue);
    const {exeTimes = 0,distributionKeyLength = 0} =  paramsValue;
    const costTimes = exeTimes * (distributionKeyLength * 2);
    let operateResult:Array<Array<Array<string>>> = [[],[]];
    const timer = setTimeout(()=>{
        console.log('start');
        switch (paramsValue.protocolType) {
            case 1:
                operateResult = Q2CProtocol(paramsValue);
                break;
            case 2:
                operateResult = Q2CProtocol(paramsValue);
                break;
            case 3:
                operateResult = twoPartProtocol(paramsValue);
                break;
            case 4:
                operateResult = twoPartProtocol(paramsValue);
                break;
        }
        console.log(operateResult)
        addProgressMessage(operateResult[0])
        addResultMessage(operateResult[1])
    }, costTimes)
}
// 添加运行进展信息
const addProgressMessage = (message: Array<Array<string>>) => {
    progressMessage.value.push(...message)
}
// 添加运行结果信息
const addResultMessage = (message: Array<Array<string>>) => {
    resultMessage.value.push(...message)
}
const clearMessage = () => {
    progressMessage.value = [];
    resultMessage.value = [];
}
// 向外暴露属性
defineExpose({preGetParams,clearMessage})
</script>

<template>
  <div className="right-show-box">
    <div className="opeartion-process">
        <div className="opeartion-process-title"><div>运行进展</div></div>
        <div className="opeartion-process-content">
            <div className="process-content-line mt-10">
                <span className="process-content-line-time">{{ moment().format('LTS')}}</span>
                <span className="process-content-line-content">等待用户进行参数选择...</span>
            </div>
            <div v-for="(message, index1) in progressMessage" :key="index1" className="process-content-line mt-10">
                <span className="process-content-line-time">{{ message[0]}}</span>
                <span className="process-content-line-content">{{message[1]}}</span>
            </div>
        </div>
    </div>
    <div className="operate-result">
        <div className="operate-result-title">
            <div>运行结果</div>
        </div>
        <div className="operate-result-content">
            <div className="result-content-line mt-10">
                <span className="result-content-line-time">{{ moment().format('LTS')}}</span>
                <span className="result-content-line-content">等待协议开始执行...</span>
            </div>
            <div v-for="(message, index1) in resultMessage" :key="index1" className="process-content-line mt-10">
                <span className="result-content-line-time">{{ message[0]}}</span>
                <span className="result-content-line-content">{{message[1]}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.right-show-box {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.opeartion-process {
    flex: 1;
    margin-top: 10px;
}
.opeartion-process-title {
    height: 26px;
}
.opeartion-process-title > div {
    margin: 5px 20px;
    font-size: 20px;
    font-weight: 700;
    font-family: Helvetica ;
}
.opeartion-process-content {
    height: calc(100vh - 500px);
    margin: 20px;
    background-color: #eee;
    border-radius: 8px;
    overflow: scroll;
}
.process-content-line {
    margin: 8px;
}
.process-content-line-time {
    display: inline-block;
    width: 100px;
    color: #409eff;
    margin-right: 20px;
}
.operate-result {
    height: 320px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}
.operate-result-title {
    height: 26px;
}
.operate-result-title > div {
    margin: 5px 20px;
    font-size: 20px;
    font-weight: 700;
    font-family: Helvetica ;
}
.operate-result-content {
    height: calc(100vh - 650px);
    margin: 20px;
    background-color: #eee;
    border-radius: 8px;
    overflow: scroll;
}
.result-content-line {
    margin: 8px;
}
.result-content-line-time {
    display: inline-block;
    width: 100px;
    color: #409eff;
    margin-right: 20px;
}

</style>
