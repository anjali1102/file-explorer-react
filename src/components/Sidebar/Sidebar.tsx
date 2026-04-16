import { useState } from "react";
import type { TreeNodeData } from "../../App";

interface TreeNodeProps {
  node: TreeNodeData;
  depth?: number;
  defaultOpen?: boolean;
  sidebarOpen: boolean;
  onSelect: (node: TreeNodeData) => void;
  selectedNode: TreeNodeData;
}

interface SidebarProps {
  root: TreeNodeData;
  onSelect: (node: TreeNodeData) => void;
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
    onSelect(node);

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

function Sidebar({ root, onSelect, selectedNode }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`flex h-screen flex-col border-r border-slate-200 bg-slate-100 transition-all duration-300 ${
        sidebarOpen ? "w-72" : "w-16"
      }`}
    >
      <div className="flex h-14 items-center justify-between border-b border-slate-200 px-3">
        {sidebarOpen && (
          <h2 className="text-lg font-semibold">React Explorer</h2>
        )}

        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="rounded-md p-2 hover:bg-slate-200"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="size-5"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          <TreeNode
            node={root}
            depth={0}
            defaultOpen={true}
            onSelect={onSelect}
            sidebarOpen={sidebarOpen}
            selectedNode={selectedNode}
          />
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
