Trie = function(){
  this.characters = {};
  this.isWord = false;
};

// learn('be')
Trie.prototype.learn = function(word, index){
    //console.log('learn', this, arguments);
    var substr = ""; //set empty substring
    if (typeof index == 'undefined') { //check if index undefined; if so, begin recursion
        // index is undefined
        index = 0;
    }

    substr = word[index]; //checks current letter by index number
    if (typeof this.characters[substr] == 'undefined') { //initialize new branch
        this.characters[substr] = new Trie(); //instantiate new trie; potential new record
    }

    if (( word.length - 1)  == index) { //termination case; if at last index of string
        this.characters[substr].isWord = true;
        return;
    } else {
        index++;
        this.learn.apply(this.characters[substr], [word, index]);
    }
};

//
// getWords()
// getWords([], 'b')
// getWords([], 'be')
// getWords([], 'bee')
// getWords(['bee'], 'bees')
Trie.prototype.getWords = function(words, currentWord){
    // Initialize variables for entering recursion
    if (typeof words == "undefined") {
        words = [];
    }

    if (typeof currentWord == 'undefined') {
        currentWord = '';
    }

    // process currentWord
    var node = this;
    if (node.isWord) {
        words.push(currentWord);
    }

    // start recursion to process children
    for(var character in node.characters) {
        if (node.characters.hasOwnProperty(character)) {
            this.getWords.apply(node.characters[character], [words, currentWord+character]);
        }
    }

    return words;
};

Trie.prototype.find = function(word, index){
    console.log('find', arguments);
    var substr = ""; //set empty substring
    if (typeof index == 'undefined') { //check if index undefined; if so, begin recursion
        // index is undefined
        index = 0;
    }

    substr = word[index]; //checks current letter by index number
    if (typeof this.characters[substr] == 'undefined') { //termination code
        console.log('returning early not defined');
        return;
    }

    if (( word.length - 1)  == index) { //termination case; if at last index of string
        console.log('returning word', this.characters[substr]);
        return this.characters[substr];
    } else {
        index++;
        //recursive; continue searching for a word
        return this.find.apply(this.characters[substr], [word, index]);
    }
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions
  // for a given prefix.
  // It should use find and getWords.
  var foundNode = this.find(prefix);
  if (typeof foundNode == 'undefined') {
      return [];
  }

  var words = foundNode.getWords();
  for (var idx = 0, len = words.length; idx < len; idx++) {
      words[idx] = prefix + words[idx];
  }

  return words;
};
