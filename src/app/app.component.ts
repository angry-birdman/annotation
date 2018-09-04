import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'data-label';
  labelItem:any = {};

  ngOnInit() {
    this.labelItem.text = 'The following snippet, O\'Conar B shows how a component can implement, $323,22 dollars with 30% this interface to on Jun 23, 2012 its own initialization 10:20pm method.';
    this.labelItem.characters = this.labelItem.text.split('');
  }
  onSelectionMouseUp() {
    if (window.getSelection) {
      let selection = window.getSelection();
      if(selection.toString().length > 0) {
        this.expandSelection(selection);
      }
    } else {
      console.log('unsupported browser');
    }
  }

  expandSelection(selection: Selection) {
    try {
      let self = this;
      let anchorIndex = selection.anchorNode.parentNode.attributes['char-index'].value;
      let focusIndex = selection.focusNode.parentNode.attributes['char-index'].value;
      var anchorChar = selection.anchorNode.nodeValue;
      var focusChar = selection.focusNode.nodeValue;

      var newAnchorIndex, newFocusIndex;
      if (selection.isForward()) {
        newAnchorIndex = this.labelItem.text.indexOfWordDelimiter(anchorIndex, true);
        newFocusIndex = this.labelItem.text.indexOfWordDelimiter(focusIndex);
      } else {
        newAnchorIndex = this.labelItem.text.indexOfWordDelimiter(focusIndex, true);
        newFocusIndex = this.labelItem.text.indexOfWordDelimiter(anchorIndex);
      }
      if (newAnchorIndex === -1) newAnchorIndex = 0; else newAnchorIndex = newAnchorIndex + 1;
      if (newFocusIndex === -1) newAnchorIndex = this.labelItem.text.length - 1; else newFocusIndex = newFocusIndex - 1;

      let newAnchorNode = document.querySelector('#char-' + newAnchorIndex);
      let newFocusNode = document.querySelector('#char-' + newFocusIndex);
      selection.setBaseAndExtent(newAnchorNode,0 , newFocusNode, 1);

      let parent = document.querySelector('#char-parent');
      var highlight = document.createElement('span');
      highlight.className = 'highlight-word';
      parent.insertBefore(highlight, newAnchorNode);
      for (var _i = newAnchorIndex; _i <= newFocusIndex; _i++) {
        var el = document.querySelector('#char-' + _i);
        highlight.appendChild(el);
      }
      highlight.addEventListener('click', () => {
        self.unmark(highlight);
      });

      console.log(newAnchorNode + '-' + newFocusNode);
      console.log(anchorIndex + '-' + anchorChar);
      console.log(focusIndex + '-' + focusChar);
    }catch(err) {
        return selection;
    }
  }

  unmark(el) {
    el.parentNode.removeChild(el);
  }
    
}
