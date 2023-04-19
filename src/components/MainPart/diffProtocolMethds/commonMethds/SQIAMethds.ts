export const SQIAThresholdrandom = (distributionKeyLength: number = 0,times:number = 0,threshold: number = 0):number => {
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

export const SQIAAttackType = (distributionKeyLength: number = 0, times:number = 0, detectRate:number = 0) => {
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
    let successMutualAuthenticationRate = 0
    let successMutualAuthenticationQuantity = 0
    let successMutualAuthenticationFlage = true
    for(let i = 0; i < success; ++i){
        for(let j = 0; j < distributionKeyLength; ++j){
            if(Math.random() < detectRate){
                successMutualAuthenticationFlage = false
                break
            }
        }
        successMutualAuthenticationFlage && successMutualAuthenticationQuantity++
        successMutualAuthenticationFlage = true
    }

    // console.log(detectRate,successMutualAuthenticationQuantity)
    successMutualAuthenticationRate = parseFloat((successMutualAuthenticationQuantity/times).toFixed(4))
    protocolSuccessRate = parseFloat((success/times).toFixed(4))
    console.log(protocolSuccessRate,successMutualAuthenticationRate)
    return [protocolSuccessRate,distributionKeyLength,successMutualAuthenticationRate,successMutualAuthenticationQuantity]
}