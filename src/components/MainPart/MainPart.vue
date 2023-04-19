<script setup lang="ts">
import { ref } from 'vue';
import { protocolTypes, noiseThresholdOptions } from '@/constValue/constValue';
import type { SQKDSelectInterface } from './type'
import { ElMessage } from 'element-plus'
import RightShow from './RightShow.vue'

import {SQIAAttackType} from './diffProtocolMethds/commonMethds/SQIAMethds'


const protocolType = ref<number>(1); // 协议类型
const distributionKeyLength = ref<string>(''); // 密钥长度
const channelType = ref<string>('1'); // 信道类型
const noiseType = ref<string>('1'); // 噪声类型
const noiseThreshold = ref<number>(0); //  噪声阈值
const haveAttack = ref<string>('1'); // 有无攻击者
const attackType = ref<string>('1'); // 攻击类型
const exeTimes = ref<string>(''); // 运行次数
const showComfirmBox = ref<boolean>(false);


let SQKDSelect:SQKDSelectInterface = {
    protocolType: 1,
    distributionKeyLength : 0,
    channelType :'1',
    noiseType:'1',
    noiseThreshold: 0,
    haveAttack: '1',
    attackType: '1',
    exeTimes: 0,
}
const sendParams = ref<SQKDSelectInterface>({});
// 切换信道类型
const channelChange = () => {
    noiseType.value = '1';
    noiseThreshold.value = 0;
    console.log(channelType.value);
}
// 噪声类型切换
const noiseChange = () => {
    console.log(noiseType.value);
}
// 切换有无攻击者
const haveAttackChange = () => {
    attackType.value = '1';
    console.log(haveAttack.value)
}
// 攻击者类型切换
const attackTypeChange = () => {
    console.log(attackType.value)
}
// 确认信息
const comfirmInf = () => {
    showComfirmBox.value = true;
    SQKDSelect = {
        protocolType: protocolType.value,
        distributionKeyLength: parseInt(distributionKeyLength.value),
        channelType: channelType.value,
        noiseType: noiseType.value,
        noiseThreshold: noiseThreshold.value,
        haveAttack: haveAttack.value,
        attackType: attackType.value,
        exeTimes: parseInt(exeTimes.value),
    }
}
// 信息清除
const clearInf = () => {
    const length = 4
    SQIAAttackType(length,100000,1 - (0.75-0.5*0.5)**length)
    protocolType.value = 1;
    distributionKeyLength.value = '';
    channelType.value = '1';
    noiseType.value = '1';
    noiseThreshold.value = 0;
    haveAttack.value = '1';
    attackType.value = '1';
    exeTimes.value = '';
    SQKDSelect = {
        protocolType: protocolType.value,
        distributionKeyLength: parseInt(distributionKeyLength.value),
        channelType: channelType.value,
        noiseType: noiseType.value,
        noiseThreshold: noiseThreshold.value,
        haveAttack: haveAttack.value,
        attackType: attackType.value,
        exeTimes: parseInt(exeTimes.value),
    }
    showRight.value.clearMessage();
    
}
// 子组件引用
const showRight = ref<any>();
// 向子组件传参
const sendParams2ShowRight = (sendParams:any) => {
    showRight.value.preGetParams(sendParams)
}
// 开始传参给子组件
const startSimulation = () => {
    if(!SQKDSelect.distributionKeyLength && !SQKDSelect.exeTimes){
        ElMessage.error('请输入您想要分配的密钥个数和执行的次数')


    }else if(!SQKDSelect.exeTimes){
        ElMessage.error('请输入您想要执行的次数')
    }else if(!SQKDSelect.distributionKeyLength){
        ElMessage.error('请输入您想要分配的密钥个数')
    }else{
        sendParams.value = {...SQKDSelect};
        sendParams2ShowRight(sendParams.value)
    }
    showComfirmBox.value = false;
}


</script>

<template>
  <div className="main-part-oubox">
    <div className="operation-left">
        <div className="operation-left-title">Operation area</div>
        <div className="operation-left-select">
            <div>
                <span>协议选择: </span>
                <el-select v-model="protocolType" class="m-2 ml-5" placeholder="Select Protocol" size="large">
                    <el-option
                    v-for="item in protocolTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </div>
            <div>
                <div className="mt-20">
                    <span v-if="protocolType <= 2">分发密钥长度: </span>
                    <span v-else>用于认证密钥长度</span>
                    <div className="key-length ml-5"><el-input v-model="distributionKeyLength" placeholder="请输入密钥长度" type="number" /></div>
                </div>
                <div className="mt-20">
                    <span>信道类型: </span>
                    <div className="channel-type ml-5">
                        <div class="mb-2 flex items-center text-sm">
                            <el-radio-group v-model="channelType" class="ml-4" @change="channelChange">
                                <el-radio label="1" size="large">理想信道</el-radio>
                                <el-radio label="2" size="large">噪声信道</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <div v-show="channelType === '2'" className="ml-15">
                    <div>
                        <span>噪声类型: </span>
                        <div className="channel-type ml-5">
                            <div class="mb-2 flex items-center text-sm">
                                <el-radio-group v-model="noiseType" class="ml-4" @change="noiseChange">
                                    <el-radio label="1" size="large">比特旋转噪声</el-radio>
                                    <el-radio label="2" size="large">联合旋转噪声</el-radio>
                                    <el-radio label="3" size="large">联合退相位噪声</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div v-show="noiseType !== '0'">
                        <span>噪声阈值: </span>
                        <div className="noise-threshold ml-5">
                            <el-select v-model="noiseThreshold" class="m-2" placeholder="Select">
                                <el-option
                                v-for="item in noiseThresholdOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <span>有无攻击者: </span>
                    <div className="channel-type ml-5">
                        <div class="mb-2 flex items-center text-sm">
                            <el-radio-group v-model="haveAttack" class="ml-4" @change="haveAttackChange">
                                <el-radio label="1" size="large">无攻击者</el-radio>
                                <el-radio label="2" size="large">有攻击者</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <div v-show="haveAttack === '2'" className="ml-15">
                    <span>攻击类型: </span>
                    <div className="channel-type ml-5">
                        <div class="mb-2 flex items-center text-sm">
                            <el-radio-group v-model="attackType" class="ml-4" @change="attackTypeChange">
                                <el-radio label="1" size="large">截获攻击</el-radio>
                                <el-radio label="2" size="large">测量重发攻击</el-radio>
                                <el-radio label="3" size="large">纠缠攻击</el-radio>
                                <el-radio label="4" size="large">篡改攻击</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <span>执行次数: </span>
                    <div className="exe-times ml-5">
                        <div class="mb-2 flex items-center text-sm">
                            <el-input v-model="exeTimes" placeholder="请输入协议执行次数" type="number"/>
                        </div>
                    </div>
                </div>
                <div className="comfirm-operate mt-50 ml-45">
                    <span><el-button type="primary" round @click="comfirmInf">确认</el-button></span>
                    <span className="ml-35"><el-button type="info" round @click="clearInf">清空</el-button></span>
                </div>
            </div>
        </div>
    </div>
    <div className="show-right">
        <RightShow ref="showRight"></RightShow>
    </div>
    <el-dialog
        v-model="showComfirmBox"
        title="信息确认"
        width="30%"
        align-center
    >
        <span>
            <div>
                <span>协议类型： </span>
                <span>{{ SQKDSelect.protocolType === 1 ? '量子方与经典方的半量子密钥分发协议': SQKDSelect.protocolType === 2 ?'经典方与经典方的半量子密钥分发协议':SQKDSelect.protocolType === 3 ? '两方半量子相互认证协议': '三方半量子相互认证协议' }}</span>
            </div>
            <div>
                <span>{{ SQKDSelect.protocolType! < 2 ? '密钥分发长度：': '用于认证密钥长度：' }} </span>
                <span>{{ SQKDSelect.distributionKeyLength? SQKDSelect.distributionKeyLength + ' bit': '0 bit'}}</span>
            </div>
            <div>
                <span>信道类型： </span>
                <span>{{ SQKDSelect.channelType === '1' ? '理想信道':'噪声信道'}}</span>
            </div>
            <div v-show="SQKDSelect.channelType === '2'">
                <span>噪声类型： </span>
                <span>{{ SQKDSelect.noiseType === '1' ? '比特旋转噪声':SQKDSelect.noiseType === '2'?'联合旋转噪声':'联合退位噪声'}}</span>
            </div>
            <div v-show="SQKDSelect.channelType === '2'">
                <span>噪声阈值： </span>
                <span>{{ SQKDSelect.noiseThreshold + '%'}}</span>
            </div>
            <div>
                <span>有无攻击者： </span>
                <span>{{ SQKDSelect.haveAttack === '1' ? '无':'有'}}</span>
            </div>
            <div v-show="SQKDSelect.haveAttack === '2'">
                <span>噪声类型： </span>
                <span>{{ SQKDSelect.attackType === '1' ? '截获攻击':SQKDSelect.attackType === '2'?'测量重发攻击':SQKDSelect.attackType === '2'?'纠缠攻击':'篡改攻击'}}</span>
            </div>
            <div>
                <span>执行次数： </span>
                <span>{{ SQKDSelect.exeTimes? SQKDSelect.exeTimes+' 次': '0 次' }}</span>
            </div>
        </span>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="() => showComfirmBox = false">取消</el-button>
            <el-button type="primary" @click="startSimulation">确认</el-button>
        </span>
        </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.main-part-oubox {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
}
.operation-left {
    display: flex;
    flex-direction: column;
    width: 450px;
    margin: 15px;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 0 10px;
}
.operation-left-title {
    height: 40px;
    font-size: 20px;
    font-weight: 700;
    font-family: Helvetica ;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid rgba(60, 60, 60, .12);
    
}
.operation-left-select {
    margin-top: 20px;
    padding: 20px;
}
.key-length {
    display: inline-block;
    width: 150px;
}
.channel-type {
    display: inline-block;
}
.noise-threshold {
    display: inline-block;
}
.exe-times {
    display: inline-block;
}
.show-right {
    flex: 1;
    background-color: #f9f9f9;
    margin: 15px;
    border-radius: 10px;
    padding: 0 10px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.mt-10 {
    margin-top: 10px;
}
.mt-20 {
    margin-top: 20px;
}
.mt-30 {
    margin-top: 30px;
}
.mt-50 {
    margin-top: 50px;
}
.ml-5 {
    margin-left: 5px;
}
.ml-15 {
    margin-left: 15px;
}
.ml-35 {
    margin-left: 35px;
}
.ml-45 {
    margin-left: 45px;
}
</style>
