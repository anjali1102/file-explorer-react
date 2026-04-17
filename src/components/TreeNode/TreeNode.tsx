import { useState } from "react";
import type { TreeNodeData } from "../../App";

interface TreeNodeProps {
  node: TreeNodeData;
  depth?: number;
  defaultOpen?: boolean;
  sidebarOpen: boolean;
  onSelect: (id: string) => void;
  selectedNode: TreeNodeData;
}

function TreeNode({
  node,
  depth = 0,
  defaultOpen = false,
  sidebarOpen,
  onSelect,
  selectedNode,
}: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const hasChildren = !!node.children?.length;
  const isActive = selectedNode.id === node.id;

  const depthStyles = [
    "border-l-4 border-blue-900 bg-teal-400 text-black",
    "border-l-4 border-blue-700 bg-teal-300 text-black",
    "border-l-4 border-blue-500 bg-teal-200 text-black",
    "border-l-4 border-sky-500 bg-teal-100 text-black",
    "border-l-4 border-cyan-500 bg-teal-50 text-black",
  ];

  const depthClass = depthStyles[Math.min(depth, depthStyles.length - 1)];

  function handleTreeOpen(): void {
    onSelect(node.id);

    if (node.type === "folder") {
      setIsOpen((prev) => !prev);
    }
  }

  return (
    <li>
      <button
        type="button"
        title={!sidebarOpen ? node.name : undefined}
        onClick={handleTreeOpen}
        className={`flex w-full items-center rounded-md px-2 py-2 text-left cursor-pointer ${
          sidebarOpen ? "gap-2" : "justify-center"
        }${depthClass} ${
          isActive ? "ring-2 ring-slate-400" : ""
        } hover:opacity-90`}
        style={{
          paddingLeft: sidebarOpen ? `${depth * 16 + 12}px` : "0.5rem",
        }}
      >
        <span className="shrink-0">{node.type === "folder" ? "🗂️" : "📄"}</span>

        {sidebarOpen && (
          <>
            <span className="truncate">{node.name}</span>
            {hasChildren && (
              <span className="ml-auto">{isOpen ? "▼" : "▶"}</span>
            )}
          </>
        )}
      </button>

      {hasChildren && isOpen && sidebarOpen && (
        <ul className="mt-1 space-y-1">
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              sidebarOpen={sidebarOpen}
              selectedNode={selectedNode}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default TreeNode;
