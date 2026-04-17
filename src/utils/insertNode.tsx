import type { TreeNodeData } from "../App";

export function insertNode(
  tree: TreeNodeData,
  parentId: string,
  newNode: TreeNodeData
): TreeNodeData {
  if (tree.id === parentId) {
    if (tree.type !== "folder") {
      return tree;
    }

    const existingChildren = tree.children ?? [];
    const updatedChildren = [...existingChildren, newNode];

    return {
      ...tree,
      children: updatedChildren,
    };
  }

  if (!tree.children || tree.children.length === 0) {
    return tree;
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      insertNode(child, parentId, newNode)
    ),
  };
}
