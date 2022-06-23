/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.chain = new Object();
    for (let word of this.words) {
      if (!(Object.keys(this.chain).includes(word))) {
        //see if word index !== words.lastIndexOf(word).
        // if true, build an array of each index word is found at
        if (this.words.indexOf(word) !== this.words.lastIndexOf(word)) {
          const wordIndexArray = this.getIndexArray(word);
          // build array of words that follow each index in this.words
          const followWordsArray = this.getFollowWordsArray(wordIndexArray);
          // enter followWordsArray into chain
          this.chain[word] = followWordsArray;
        }
        else {
          let ind = this.words.indexOf(word) + 1;
          if (this.words.length == ind) {
            this.chain[word] = [null];
          }
          else {
            this.chain[word] = [this.words[ind]];
          }
        }
      }
    }
  }

  getIndexArray(word) {
    // Finds all indexes of word in this.words, returns array of nums
    const arr = new Array();
    let i = this.words.indexOf(word);
    arr.push(i);
    while (i < this.words.length) {
      let nextInd = this.words.indexOf(word, i + 1);
      arr.push(nextInd);
      i = nextInd;
      if (this.words.lastIndexOf(word) == i) {
        break;
      }
    }
    return arr;
  }

  getFollowWordsArray(indexArray) {
    // given an array of indexes, find the words that follow each index in this.words. Returns array of words.
    const wordArray = new Array();
    for (let ind of indexArray) {
      ind = ind + 1;
      if (this.words.length !== ind) {
        wordArray.push(this.words[ind]);
      }
      else {
        wordArray.push(null);
      }
    }
    return wordArray;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let markovArray = new Array();
    // get random number from 0 - chain.length - 1 || this will be the index of the chain.key we start with
    let keys = Object.keys(this.chain);
    let startInd = Math.floor(Math.random() * keys.length);
    markovArray.push(keys[startInd]);
    while (markovArray.length < numWords) {
      let ind = Math.floor(Math.random() * this.chain[markovArray[markovArray.length - 1]].length);
      if (this.chain[markovArray[markovArray.length - 1]][ind] !== null) {
        markovArray.push(this.chain[markovArray[markovArray.length - 1]][ind]);
      }
      else {
        break;
      }
    }
    let text = markovArray.join(" ");
    return text;
  }
}

module.exports = { MarkovMachine };