import type { SQKDSelectInterface } from '../type'
import moment from 'moment';
import { SQIAThresholdrandom } from './commonMethds/SQIAMethds'
import { SQIAAttackType } from './commonMethds/SQIAMethds'



const twoPartProtocol = (paramsValue:SQKDSelectInterface):Array<Array<Array<string>>> => {
    const { distributionKeyLength = 0, noiseThreshold, haveAttack, attackType, exeTimes = 0 } = paramsValue;
    const progressMessage:Array<Array<string>> = [];
    const resultMessage:Array<Array<string>> = [];

    progressMessage.push([moment().format('LTS'),'协议执行完成！'])

    resultMessage.push([moment().format('LTS'),`协议执行完成！结果如下：`])

    let protocolSuccessRate = 1;
    let averageParticlesGenerated = 0;
    let detectRate:number = 0;
    let successMutualAuthenticationRate = 1;
    let successMutualAuthenticationQuantity = 0;
    if(haveAttack === '1'){
        protocolSuccessRate = 1;
        successMutualAuthenticationRate = 1;
        successMutualAuthenticationQuantity = exeTimes;
        averageParticlesGenerated = SQIAThresholdrandom(distributionKeyLength,exeTimes,noiseThreshold)
    } else {
        switch(attackType) {
            case '1':
                detectRate = 1 - 0.5**distributionKeyLength
            case '2':
                detectRate = 1 - 0.5**distributionKeyLength
            case '3':
                detectRate = 1 - (0.75-0.5*0.5)**distributionKeyLength
            case '4':
                detectRate = 1 - 0.5**distributionKeyLength
        }
        [protocolSuccessRate, averageParticlesGenerated,successMutualAuthenticationRate,successMutualAuthenticationQuantity] = SQIAAttackType(distributionKeyLength, exeTimes, detectRate);
    }


    resultMessage.push(['',`共执行协议次数${exeTimes},协议执行成功率为${protocolSuccessRate*100}%`])
    resultMessage.push(['',`执行成功次数为${Math.round(exeTimes*protocolSuccessRate)}次,失败次数为${Math.round(exeTimes - exeTimes*protocolSuccessRate)}次`])
    exeTimes*protocolSuccessRate/100 > 0 && resultMessage.push(['',`在执行成功的协议中，能够完成相互认证的概率为${successMutualAuthenticationRate*100}%`])
    exeTimes*protocolSuccessRate/100 > 0 && resultMessage.push(['',`在执行成功的协议中，能够完成相互认证的次数为${successMutualAuthenticationQuantity}次`])
    exeTimes*protocolSuccessRate/100 > 0 && resultMessage.push(['',`在认证成功的协议中，平均成功认证密钥个数为${averageParticlesGenerated}个`])
    return [progressMessage,resultMessage]
}

export default twoPartProtocol