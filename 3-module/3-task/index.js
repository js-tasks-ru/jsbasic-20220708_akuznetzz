function camelize(str) {
  
    let newStr = str.split('-')
        .map(function (word, index) {
            if(index != 0) {
                let newWord = word[0].toUpperCase() + word.slice(1)
                return newWord;
            } else return word;
        })
        .join('');

    return newStr;

}
