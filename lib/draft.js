let testString = `<p>[2,7,11,15]
9
[2,7,11,15]
13
[2,7,11,15]
26</p>
`




const convertTestCase = (inputString, params, types) => {
    let lines = typeof inputString === 'string' ?
        inputString.trim().split('\n').map(str => str.replace(/^<p>/, '').replace(/<\/p>$/, '')) :
        JSON.parse(JSON.stringify(inputString))

    if (typeof lines[0] === 'string') {
        let pairs = []
        for (let i = 0; i < lines.length; i += params.length) {
            pairs.push(lines.slice(i, i + params.length));
        }
        lines = pairs
    }

    let result = null;
    console.log('LINEs')
    console.log(lines)

    for (let i = 0; i < lines.length; i += params.length) {
        console.log(i)
        const testCase = lines.slice(i, i + params.length).map(pair => {

            console.log('PAIR!!!!')
            console.log(pair)

            return pair.map((inp, index) => {

                const type = types[index].toLowerCase()
                try {
                    //console.log(index)
                    console.log('\n\n')
                    console.log(`INP - TYPE:`)
                    console.log(inp)
                    console.log(typeof inp)
                    console.log(`TYPE: ${type}`)

                    console.log('\n\n')




                    const parsed = typeof inp === 'string' ? JSON.parse(inp) : inp

                    console.log('PARSED:')
                    console.log(parsed)
                    if (typeof inp === 'string' || typeof inp === 'number') {
                        if (type.startsWith('list[')) {
                            if (!Array.isArray(parsed)) {
                                return `${inp} is not a valid value of type ${types[index]}`
                            }
                            if (type.startsWith('list[list[')) {
                                if (!Array.isArray(parsed[0])) {
                                    return `${inp} is not a valid value of type ${types[index]}`
                                }
                                if (type.startsWith('list[list[int]')) {
                                    console.log(`TEST 1 - from ${pair} <- ${index}\n\n`)
                                    return parsed
                                } else if (type.startsWith('list[list[str]')) {
                                    return parsed.map(subitem => {
                                        return subitem.map(val => val.toString())
                                    })
                                }
                            } else if (type.startsWith('list[int]')) {
                                console.log('list[int]')
                                console.log(parsed)
                                return parsed
                            } else if (type.startsWith('list[str]')) {
                                return parsed.map(val => val.toString())
                            }
                        } else if (type.startsWith('int')) {
                            console.log(`TEST 2 - from ${pair} <- ${index}\n\n`)
                            return parsed
                        } else if (type.startsWith('str')) {
                            return parsed.toString()
                        }
                    } else {
                        if (type.startsWith('list[')) {
                            if (!Array.isArray(parsed)) {
                                return `${inp} is not a valid value of type ${types[index]}`
                            }
                            console.log(`parsed`)
                            console.log(parsed)



                            const parsedLs = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
                            console.log(`parsed LS`)
                            console.log(parsedLs)
                            console.log(typeof parsedLs)

                            if (type.startsWith('list[list[')) {
                                if (!Array.isArray(parsed[0])) {
                                    return `${inp} is not a valid value of type ${types[index]}`
                                }

                                if (type.startsWith('list[list[int]')) {
                                    console.log(`TEST 3 - from ${pair} <- ${index}\n\n`)
                                    return parsedLs
                                } else if (type.startsWith('list[list[str]')) {
                                    return parsedLs.map(ls => {
                                        return ls.map(val => val.toString())
                                    })
                                }

                            } else if (type.startsWith('list[int]')) {
                                console.log('HERE')
                                return parsedLs
                            } else if (type.startsWith('list[str]')) {
                                return parsedLs.map(val => val.toString())
                            }




                        } else if (type.startsWith('int') && parsed) {
                            console.log(parsed)
                            return parsed[index]
                        } else if (type.startsWith('str') && parsed) {

                            return parsed[index].toString()
                        }
                    }
                    console.log('----')

                    return parsed
                } catch (e) {
                    return `${inp} is not a valid value of type ${types[index]}`

                }


            })

        });
        console.log('\n\n\n\n\n\nTEST INPUTS:')
        console.log(testCase)
        console.log('\n\n\n\n\n\n\n')

        if (!result) {
            result = testCase;
        } else {
            result.push(testCase[0])
        }
    }
    console.log('RESULT')
    console.log(result)
    return result;
};

//console.log(JSON.stringify(convertTestCase([['2,7,11,15,349999', 9], [[2, 7, 11, 15, 324], 8]], ["num1", "num2"], ["List[int]", "int"])))
//console.log(JSON.stringify(convertTestCase(testString, ["num1", "num2"], ["List[int]", "int"])))

//console.log(JSON.stringify(convertTestCase(JSON.stringify([[[2, 7, 11, 15], 8], [[2, 7, 11, 15], 8], [[2, 7, 11, 15], 10]]), ["num1", "num2"], ["List[int]", "int"])))

// [[[["2,7,11,15,324","3,4,5"],"6"],[["2,7,11,15,324","3,4,5"],"8"]]]
// [[[[["2","7","11","15","324"],["3","4","5"]],"6"],[[["2","7","11","15","324"],["3","4","5"]],"8"]]]
//console.log(JSON.parse(JSON.parse('[2,7,11,15,324]')))

//const f = [[[[2, 7, 11, 15], 9], [[2, 7, 11, 15], 13]], [[[2, 7, 11, 15], 26]]]

console.log(JSON.parse('2,7,11,15,349999'))