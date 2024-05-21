const englishHello = (word,times)=>{
 console.warn(`Hello ${word} ${times}`)
}
const chineseHellp = (word)=>{
    console.warn(`Ni Hao ${word}!`)
}
function GetHelloFunction(type){
    switch(type){
        case 'english':
            return (word,times) => englishHello(word,times)
            
            case 'british':
                return (word,times) => englishHello(word,times)

                case 'chinese':
                    return  chineseHellp
    }
}

GetHelloFunction('british')('Bird',2)

function Test(word,anotherWord){
    console.warn(word)
    console.warn(arguments)
}

Test('Test',0,4,5,6)