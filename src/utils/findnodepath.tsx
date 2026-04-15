import type { Crumb, TreeNodeData } from "../App";

export function findNodeAndPath(
  node: TreeNodeData,
  targetId: string,
  path: Crumb[] = []
): { node: TreeNodeData; path: Crumb[] } | null {
  const currentPath = [...path, { id: node.id, name: node.name }];

  if (node.id === targetId) {
    return { node, path: currentPath };
  }

  if (!node.children) return null;

  for (const child of node.children) {
    const result = findNodeAndPath(child, targetId, currentPath);
    if (result) return result;
  }

  return null;
}
