export function Qualitative_difference_principalities(arr){
    const sortedarr = [...arr].sort((a,b)=>a-b);
    const max1 = sortedarr[arr.length-1];
    const max2 = sortedarr[arr.length-2];
    const min1 = sortedarr[0];
    const min2 = sortedarr[1];
    return (max1*max2)-(min1*min2);
}

export function Polindrom_principalities(stroka){
    stroka = String(stroka);  
    
    stroka = stroka.replaceAll(' ', '');
    stroka = stroka.toLowerCase();
    
    let isPalindrom = true;
    for (let i = 0; i <= stroka.length / 2; i++) {
        if (stroka[i] !== stroka[stroka.length - 1 - i]) {
            isPalindrom = false;
            break; 
        }
    }
    return isPalindrom;
}