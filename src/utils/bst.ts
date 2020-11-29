import { FactorTreeNode } from '@/interfaces/tree';

interface BSTNode {
  value: string;
  left?: BSTNode;
  right?: BSTNode;
  level: number;
  data: FactorTreeNode[];
}

export class FactorBST {
  private root?: BSTNode;

  public search(query: string): BSTNode | undefined {
    const queue = [this.root];
    let found;
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (currentNode?.value === query) {
        found = currentNode;
        break;
      }
      if (currentNode?.left) {
        queue.push(currentNode.left);
      }
      if (currentNode?.right) {
        queue.push(currentNode.right);
      }
    }
    return found;
  }

  public insert(node: FactorTreeNode) {
    // excluding children
    node = {
      name: node.name,
      id: node.id,
    };

    if (!this.root) {
      this.root = {
        value: node.name,
        data: [node],
      } as BSTNode;

      return;
    }

    let current: BSTNode = this.root;

    while (true) {
      if (node.name < current.value) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = {
            value: node.name,
            data: [node],
          } as BSTNode;
          break;
        }
      } else if (node.name > current.value) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = {
            value: node.name,
            data: [node],
          } as BSTNode;
          break;
        }
      } else {
        current.data.push(node);
        break;
      }
    }
  }

  public BFT(): string {
    if (!this.root) { return ''; }

    const node = this.root;

    node.level = 1;
    const queue = [node];
    const out = ['\n\t'];
    let currentLevel = node.level;

    while (queue.length > 0) {
        const currentNode = queue.shift();

        if (!currentNode) {
          continue;
        }

        if (currentNode.level > currentLevel) {
            currentLevel++;
            out.push('\n');
        }
        out.push(currentNode.value + '\t');
        if (currentNode.left) {
            currentNode.left.level = currentLevel + 1;
            queue.push(currentNode.left);
        }
        if (currentNode.right) {
            currentNode.right.level = currentLevel + 1;
            queue.push(currentNode.right);
            out.push('\t');
        }
    }
    return out.join('');
  }
}
