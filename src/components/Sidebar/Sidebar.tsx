import { useState } from "react";
import type { TreeNodeData } from "../../App";
import TreeNode from "../TreeNode/TreeNode";

interface SidebarProps {
  root: TreeNodeData;
  onSelect: (id: string) => void;
  selectedNode: TreeNodeData;
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
