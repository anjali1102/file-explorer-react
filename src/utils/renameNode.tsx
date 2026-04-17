import type { TreeNodeData } from "../App";

export function renameNode(
  tree: TreeNodeData,
  targetId: string,
  newName: string,
  modifiedAt: string
): TreeNodeData {
  if (tree.id === targetId) {
    return {
      ...tree,
      name: newName,
      modifiedAt,
    };
  }

  if (!tree.children || tree.children.length === 0) {
    return tree;
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      renameNode(child, targetId, newName, modifiedAt)
    ),
  };
}
