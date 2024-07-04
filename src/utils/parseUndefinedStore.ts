export function parseUndefined(info:object){
    let bak:object={};
    for(let key in info){
        if(info[key]!==undefined && info[key]!==null && info[key]!==''){
            bak[key] = info[key]
        }
    }
    return bak
}