// Capitalises the first letter in each word of a string
// E.g. "transform this sentence" -> "Transform This Sentence"
const capitaliseString = (text) => {
    let wordsArray = text.toLowerCase().split(' ')

    let capsArray = wordsArray.map(word => {
        return word.replace(word[0], word[0].toUpperCase())
    })

    return capsArray.join(' ')
}

module.exports = { capitaliseString };