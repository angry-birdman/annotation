// prototypes for string
String.prototype.isAlphaNumeric = isAlphaNumeric;
String.prototype.isAlphabetic = isAlphabetic;
String.prototype.indexOfWordDelimiter = indexOfWordDelimiter;
interface String {
  isAlphaNumeric: typeof isAlphaNumeric;
  isAlphabetic: typeof isAlphabetic;
  indexOfWordDelimiter: typeof indexOfWordDelimiter;
}
function isAlphaNumeric(): boolean {
  return /^[a-z0-9]+$/i.test(this);
}
function isAlphabetic(): boolean {
  return /^[a-z]+$/i.test(this);
}
function indexOfWordDelimiter(index: number, backward: boolean = false): number {
  if(!this.charAt(index).isAlphaNumeric())
    if (backward) return --index; else return ++index;
  var couldBeName = false, couldBeDatetime = false;
  let len = this.length;
  if (backward) index--; else index++;

  while (index > -1 && index < len) {
    var _i = index;
    if (backward) index--; else index++;

    let char = this.charAt(_i);
    if (couldBeName ) {
      if (char.isAlphabetic()) { //next char is alphabetic, most likely it is a name
        couldBeName = false;
        continue; 
      }
      //otherwise return previous index
      else if (backward) return (_i + 1);
      else return (_i - 1);
    }
    if (couldBeDatetime) {
      if (!isNaN(char)){ //next char is number, most likely it is a datetime
        couldBeDatetime = false; 
        continue; 
      }
      //otherwise return previous index
      else if (backward) return (_i + 1);
      else return (_i - 1);
    }
    if (char.isAlphaNumeric()) continue;
    else if (char === '\'') couldBeName = true; // could be a name like O'Connar
    else if (char === ':' || char === '-' || char === '/') couldBeDatetime = true; // could be a datetime: 9/5/18 2018-9-5 9:30pm
    else return _i;
  }
  return -1;
}

// prototypes for selection
Selection.prototype.isForward = isForward;
interface Selection {
  isForward: typeof isForward;
}
function isForward(): boolean {
  let position = this.anchorNode.compareDocumentPosition(this.focusNode);
  var forward = true;
  // position == 0 if nodes are the same
  if (!position && this.anchorOffset > this.focusOffset ||
    position === Node.DOCUMENT_POSITION_PRECEDING)
    forward = false;
  return forward;
}