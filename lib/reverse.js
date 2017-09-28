'use babel';

import ReverseView from './reverse-view';
import { CompositeDisposable } from 'atom';

export default {

  reverseView: null,
  modalPanel: null,
  subscriptions: null,
  reversed: null,
  wordToSearch: null,

  activate(state) {
    reversed = "default";
    wordToSearch = "default";
    this.reverseView = new ReverseView(state.reverseViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.reverseView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'reverse:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.reverseView.destroy();
  },

  serialize() {
    return {
      reverseViewState: this.reverseView.serialize()
    };
  },

  toggle() {
    if (editor = atom.workspace.getActiveTextEditor()) {
        selection = editor.getSelectedText()
        if(!selection){
          selection= editor.getWordUnderCursor();
          wordToSearch = selection.split('').reverse().join('')
        }

    }
  //   this.reverseView.setElement();
    // toggle() {
    // editor = atom.workspace.getActiveTextEditor();
    // wordToSearch = editor.getSelectedText();
    // if(!wordToSearch){
    //   wordToSearch = editor.getWordUnderCursor();
    // }
    this.reverseView.setElement();


    console.log('Reverse was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
