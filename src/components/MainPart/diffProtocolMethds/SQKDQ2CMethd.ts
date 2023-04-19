import type { SQKDSelectInterface } from '../type'
import moment from 'moment';
import { SQKDThresholdrandom } from './commonMethds/SQKDMethds'
import { SQKDAttackType } from './commonMethds/SQKDMethds'



const Q2CProtocol = (paramsValue:SQKDSelectInterface):Array<Array<Array<string>>> => {
    const { distributionKeyLength = 0, noiseThreshold, haveAttack, attackType, exeTimes = 0 } = paramsValue;
    const progressMessage:Array<Array<string>> = [];
    const resultMessage:Array<Array<string>> = [];

    progressMessage.push([moment().format('LTS'),'协议执行完成！'])

    resultMessage.push([moment().format('LTS'),`协议执行完成！结果如下：`])

    let protocolSuccessRate = 1;
    let averageParticlesGenerated = 0;
    let detectRate:number = 0;
    if(haveAttack === '1'){
        protocolSuccessRate = 1;
        averageParticlesGenerated = SQKDThresholdrandom(distributionKeyLength,exeTimes,noiseThreshold)
    } else {
        switch(attackType) {
            case '1':
                detectRate = 3*(1 - 0.5**distributionKeyLength)/4 + (1 - 0.75**distributionKeyLength)/4
            case '2':
                detectRate = 1 - 0.5**distributionKeyLength
            case '3':
                detectRate = 1 - (0.875-0.625*0.25)**distributionKeyLength
            case '4':
                detectRate = 1 - 0.5**distributionKeyLength
        }
        [protocolSuccessRate, averageParticlesGenerated] = SQKDAttackType(distributionKeyLength, exeTimes, detectRate);
    }


    resultMessage.push(['',`共执行协议次数${exeTimes},协议执行成功率为${protocolSuccessRate*100}%`])
    resultMessage.push(['',`执行成功次数为${Math.round(exeTimes*protocolSuccessRate)}次,失败次数为${Math.round(exeTimes - exeTimes*protocolSuccessRate)}次`])
    exeTimes*protocolSuccessRate/100 > 0 && resultMessage.push(['',`在执行成功的协议中，平均有效密钥生成个数为${averageParticlesGenerated}`])
    // exeTimes - exeTimes*protocolSuccessRate/100 > 0 && resultMessage.push(['',`在执行失败的协议中，检测粒子中检测出的平均错误率为${failureDetectionRate*100}%`])

    return [progressMessage,resultMessage]
}

export default Q2CProtocol