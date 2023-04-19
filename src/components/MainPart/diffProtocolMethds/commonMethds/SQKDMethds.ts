import { makeMap } from "@vue/shared";

export const SQKDThresholdrandom = (distributionKeyLength: number = 0,times:number = 0,threshold: number = 0):number => {
    if(threshold === 0){
        return distributionKeyLength
    }
    let totoalKeys = 0
    for(let i = 0; i < times; ++i){
        let realDKL = 0
        for(let j = 0; j < distributionKeyLength; ++j){
            if(Math.random() > threshold/100){
                realDKL++
            }
        }
        totoalKeys += realDKL
    }
    return parseFloat((totoalKeys / times).toFixed(2))
}

export const SQKDAttackType = (distributionKeyLength: number = 0, times:number = 0, detectRate:number = 0) => {
    let protocolSuccessRate = 100;
    let success = 0
    let defeat = 0
    let rateFlag:boolean = true
    for(let i = 0; i < times; ++i){
        for(let j = 0; j < distributionKeyLength; ++j){
            if(Math.random() < detectRate){
                rateFlag = false
                break;
            }
        }
        rateFlag ? success++ : defeat++
        rateFlag = true
    }
    let totolParticlesGenerated = 0
    const theoryprotocolSuccessRate = distributionKeyLength * (1 - detectRate)
    for(let i = 0; i < success; ++i){
        let particlesGenerated = 0
        for(let j = 0; j < distributionKeyLength; ++j){
            if(Math.random() > theoryprotocolSuccessRate){
                particlesGenerated++
            }
        }
        totolParticlesGenerated += particlesGenerated
    }

    protocolSuccessRate = parseFloat((success/times).toFixed(2))

    const averageParticlesGenerated = parseFloat((totolParticlesGenerated/success).toFixed(2))
    return [protocolSuccessRate,averageParticlesGenerated,]
}