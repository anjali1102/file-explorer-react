import type { TreeNodeData } from "../App";

export function deleteNode(tree: TreeNodeData, targetId: string): TreeNodeData {
  if (!tree.children || tree.children.length === 0) {
    return tree;
  }

  const filteredChildren = tree.children.filter(
    (child) => child.id !== targetId
  );

  return {
    ...tree,
    children: filteredChildren.map((child) => deleteNode(child, targetId)),
  };
}
