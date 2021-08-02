export default class TreeNode {
  constructor({ path, id, parentID }) {
    // this path should be unique identifer and be updated
    this.path = path;
    this.id = id;
    this.parentID = parentID;

    this.data = '';
    this.children = [];
    this.expanded = false;
    this.checked = false;
  }
}
