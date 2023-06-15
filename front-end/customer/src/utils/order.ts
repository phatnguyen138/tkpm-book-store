import { deliveryStatus } from "../types/Order"
export function initOrderDate(deliveryLog : deliveryStatus[]) {
    return formatDate(deliveryLog[0].date)
}

export function formatDate(oldDate: string) {
    // date format: YYYY-MM-DD[T]hh:mm:ss[.]117Z

    let [rawdate, rawtime] = oldDate.split('T')
    let date = rawdate.split('-').reverse().join("-")    
    let time = rawtime.split('.')[0]
    return date + ', ' + time

}

export function latestStatus(deliveryLog : deliveryStatus[]) {
    let lastIndex = deliveryLog.length-1
    return deliveryLog[lastIndex].state
}