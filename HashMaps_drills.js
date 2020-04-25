const hashmap = require('./hashmap')
const chainedmap = require('./chainedmap');

function main() {
  const lotr = new chainedmap();

  lotr.set("Hobbit", "Bilbo")
  lotr.set("Hobbit", "Frodo")
  lotr.set("Hobbit", "Bobo")
  lotr.set("Wizard", "Wizard")
  lotr.set("Human", "Aragorn")
  lotr.set("Elf", "Legolas")
  lotr.set("Maiar", "The Necromancer")
  lotr.set("Maiar", "Sauron")
  lotr.set("RingBearer", "Gollum")
  lotr.set("HalfElven", "Arwen")
  lotr.set("Ent", "Treebeard")

  // Hobbit and Maiar are duplicate keys, therefore, it's expected behavior
  // for them to be overwritten like in an object.

  // The capacity is 24 after all the keys are added. This is because the capacity
  // was increased from 8 to 24 (8 * 3 = 24) due to us having more than 4 keys (8 * 0.5 = 4)

  console.log(lotr.get('Hobbit'))
  console.log(lotr)

  const WhatDoesThisDo = function () {
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new hashmap();
    map1.set(str1, 10); // 'Hello World.': 10 (this gets overwritten in next line)
    map1.set(str2, 20); // 'Hello World.': 20
    let map2 = new hashmap();
    let str3 = str1; // 'Hello World.'
    let str4 = str2; // 'Hello World.'
    map2.set(str3, 20); // 'Hello World.': 20 (this gets overwritten in next line)
    map2.set(str4, 10); // 'Hello World.': 10

    console.log(map1.get(str1)); // 20
    console.log(map2.get(str3)); // 10
  }

  const removeDuplicates = (str) => {
    const map = new hashmap();
    let newString = '';

    for (let i = 0; i < str.length; i++) {
      if (map.get(str[i]) === undefined) {
        newString += str[i]
        map.set(str[i], str[i])
      }
    }
    return newString
  }

  console.log(removeDuplicates('google'))
  console.log(removeDuplicates('google all that you think can think of'))

  const isPalindrome = (str) => {
    let map = new hashmap();
    for (let i = 0; i < str.length; i++) {
      map.set(str[i], i);
    }
    let count = 0;
    console.log(map)
    for (let i = 0; i < str.length; i++) {
      if (map.get(str[i]) !== i) {
        console.log('letter doesnt equal other letter', i, str[i], ':', map.get(str[i]))
        count--;
      } else {
        console.log('letters match', i, str[i], ':', map.get(str[i]))
        count++;
      }
      console.log('count', count)
    }
    if (count > 1) {
      return false;
    }
    else {
      return true;
    }
  }

  console.log(isPalindrome('acecarr'))
  console.log(isPalindrome('acecarr3'))

  console.log(lotr)

  function anagram(array) {
    let map = new chainedmap(); // creates a hashmap

    array.forEach((word) => { // iterates through the words
      const groupWords = sortWords(word);
      // const group = map.get(groupWords) || []; // checks if sorted word already exists
      map.set(groupWords, word); // sorted word becomes the key, with a value of [all the previous words + this new one]
    });

    const anagrams = [];

    map._hashTable.forEach(hash => {
      if (hash !== null) {
        if (typeof hash.value === "string") {
          anagrams.push(hash.value)
        }
        else {
          const newElement = []
          const head = hash.value.head;

          newElement.push(head.data.value)
          let currentNode = head;

          while (currentNode !== null) {
            newElement.push(currentNode.data.value)
            currentNode = currentNode.next;
          }
          anagrams.push(newElement)
        }
      }
    })
    return anagrams;
  }
  const sortWords = (input) => input.split('').sort().join(''); // sorts letters inside a single word | car -> acr

  console.log(anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
}

main();

