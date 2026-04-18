import type { Crumb, TreeNodeData } from "../App";

export type SearchResult = {
  node: TreeNodeData;
  path: Crumb[];
};

export function searchTree(
  tree: TreeNodeData,
  query: string,
  path: Crumb[] = []
): SearchResult[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const currentPath = [...path, { id: tree.id, name: tree.name }];
  let results: SearchResult[] = [];

  if (tree.name.toLowerCase().includes(normalizedQuery)) {
    results.push({
      node: tree,
      path: currentPath,
    });
  }

  if (!tree.children || tree.children.length === 0) {
    return results;
  }

  for (const child of tree.children) {
    results = [...results, ...searchTree(child, normalizedQuery, currentPath)];
  }

  return results;
}
