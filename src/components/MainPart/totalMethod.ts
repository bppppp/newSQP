import type { SQKDSelectInterface } from './type'
import moment from 'moment';
export const createInitInformation = (paramsValue: SQKDSelectInterface):Array<Array<Array<string>>> => {
    let protocolTypeMessage;
    let distributionKeyLengthMessage;
    let channelTypeMessage;
    let noiseTypeMessage;
    let noiseThresholdMessage;
    let haveAttackMessage;
    let attackTypeMessage;
    let exeTimesMessage;
    const startTime:string = moment().format('LTS');
    const progressMessage:Array<Array<string>> = [];
    const resultMessage:Array<Array<string>> = [];
    progressMessage.push([startTime,'用户参数输入完成！'])
    progressMessage.push(['','具体参数为：'])
    if(paramsValue.protocolType === 1){
        protocolTypeMessage = '量子方与经典方的SQKD协议'
    }else if(paramsValue.protocolType === 2){
        protocolTypeMessage = '经典方与经典方的SQKD协议'
    }else if(paramsValue.protocolType === 3){
        protocolTypeMessage = '两方半量子相互认证协议'
    }else {
        protocolTypeMessage = '三方半量子相互认证协议'
    }
    progressMessage.push(['',`协议类型：${protocolTypeMessage}`])
    if(paramsValue.protocolType! <= 2){
        distributionKeyLengthMessage = `${paramsValue.distributionKeyLength}bit`;
        progressMessage.push(['',`密钥长度：${distributionKeyLengthMessage}`])
    }else {
        distributionKeyLengthMessage = `${4*paramsValue.distributionKeyLength!}bit`;
        progressMessage.push(['',`共享密钥长度：${distributionKeyLengthMessage}`])
    }
    

    if(paramsValue.channelType === '1'){
        channelTypeMessage = '理想信道'
    }else {
        channelTypeMessage = '噪声信道'
        if(paramsValue.noiseType === '1'){
            noiseTypeMessage = '比特旋转噪声'
        }else if(paramsValue.noiseType === '2'){
            noiseTypeMessage = '联合旋转噪声'
        }else{
            noiseTypeMessage = '联合退位噪声'
        }
        noiseThresholdMessage = `${paramsValue.noiseThreshold}%`
    }
    progressMessage.push(['',`信道类型：${channelTypeMessage}`])
    noiseTypeMessage && progressMessage.push(['',`噪声类型：${noiseTypeMessage}`])
    noiseThresholdMessage && progressMessage.push(['',`噪声阈值: ${noiseThresholdMessage}`])

    if(paramsValue.haveAttack === '1'){
        haveAttackMessage = '无攻击者'
    }else {
        haveAttackMessage = '有攻击者'
        if(paramsValue.attackType === '1'){
            attackTypeMessage = '截获攻击'
        }else if(paramsValue.attackType === '2'){
            attackTypeMessage = '测量重发攻击'
        }else if(paramsValue.attackType === '3'){
            attackTypeMessage = '纠缠攻击'
        }else{
            attackTypeMessage = '篡改攻击'
        }
    }
    progressMessage.push(['',`攻击者：${haveAttackMessage}`])
    attackTypeMessage && progressMessage.push(['',`攻击类型：${attackTypeMessage}`])
    exeTimesMessage = `${paramsValue.exeTimes}次`
    progressMessage.push(['',`执行次数：${exeTimesMessage}`])
    progressMessage.push([startTime, '协议进行中请稍后'])

    resultMessage.push([startTime,'协议执行中....'])
    return [progressMessage, resultMessage]
}
