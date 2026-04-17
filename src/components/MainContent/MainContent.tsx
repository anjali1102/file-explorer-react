import { useState } from "react";
import FolderIcon from "../Icons/FolderIcon";
import FileIcon from "../Icons/FileIcon";
import type { TreeNodeData } from "../../App";

interface MainContentProps {
  selectedNode: TreeNodeData;
  onNavigate: (id: string) => void;
  onAddFile: () => void;
  onAddFolder: () => void;
}

type ViewMode = "grid" | "list";

function MainContent({
  selectedNode,
  onNavigate,
  onAddFile,
  onAddFolder,
}: MainContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <div className="h-screen overflow-auto bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{selectedNode.name}</h1>
          {selectedNode.type === "folder" && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`rounded-md px-3 py-1.5 text-sm cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`rounded-md px-3 py-1.5 text-sm cursor-pointer ${
                  viewMode === "list"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                List
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onAddFile}
              className={`rounded-md px-3 py-1.5 text-sm cursor-pointer bg-cyan-500 hover:bg-sky-700 text-white`}
            >
              Add File
            </button>
            <button
              type="button"
              onClick={onAddFolder}
              className={`rounded-md px-3 py-1.5 text-sm cursor-pointer bg-cyan-500 hover:bg-sky-700 text-white`}
            >
              Add Folder
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {selectedNode.type === "file" ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <FileIcon />
            <h2 className="mt-4 text-lg font-semibold">{selectedNode.name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {selectedNode.modifiedAt}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedNode.children?.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => onNavigate(child.id)}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-100 cursor-pointer"
              >
                <div className="mb-3">
                  {child.type === "folder" ? <FolderIcon /> : <FileIcon />}
                </div>
                <h2 className="text-base font-semibold">{child.name}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {child.modifiedAt}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-100 text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date Modified</th>
                </tr>
              </thead>
              <tbody>
                {selectedNode.children?.map((child) => (
                  <tr
                    key={child.id}
                    className="cursor-pointer border-b border-slate-100 hover:bg-slate-50"
                    onClick={() => onNavigate(child.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {child.type === "folder" ? (
                          <FolderIcon />
                        ) : (
                          <FileIcon />
                        )}
                        <span>{child.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize">{child.type}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {child.modifiedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainContent;
