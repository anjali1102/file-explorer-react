import { useState } from "react";
import FolderIcon from "../Icons/FolderIcon";
import FileIcon from "../Icons/FileIcon";
import type { TreeNodeData } from "../../App";
import type { SearchResult } from "../../utils/searchTree";

interface MainContentProps {
  selectedNode: TreeNodeData;
  onNavigate: (id: string) => void;
  onAddFile: () => void;
  onAddFolder: () => void;
  onRename: () => void;
  onDelete: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  searchResults: SearchResult[];
}

type ViewMode = "grid" | "list";

function MainContent({
  selectedNode,
  onNavigate,
  onAddFile,
  onAddFolder,
  onRename,
  onDelete,
  search,
  onSearchChange,
  searchResults,
}: MainContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const renderSearchResults = () => {

    return (
      <div>
        <h2 className="mb-4 text-lg font-semibold">
          Search Results ({searchResults.length})
        </h2>

        {searchResults.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            No matching files or folders found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map(({ node, path }) => (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  onNavigate(node.id);
                  onSearchChange("");
                }}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-100 cursor-pointer"
              >
                <div className="mb-3">
                  {node.type === "folder" ? <FolderIcon /> : <FileIcon />}
                </div>

                <h2 className="text-base font-semibold">{node.name}</h2>

                <p className="mt-1 text-sm capitalize text-slate-500">
                  {node.type}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {path.map((item) => item.name).join(" / ")}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderFileView = () => {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <FileIcon />
        <h2 className="mt-4 text-lg font-semibold">{selectedNode.name}</h2>
        <p className="mt-1 text-sm text-slate-500">{selectedNode.modifiedAt}</p>
      </div>
    );
  };

  const renderGridView = () => {
    return (
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
            <p className="mt-1 text-sm text-slate-500">{child.modifiedAt}</p>
          </button>
        ))}
      </div>
    );
  };

  const renderListView = () => {
    return (
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
                    {child.type === "folder" ? <FolderIcon /> : <FileIcon />}
                    <span>{child.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{child.type}</td>
                <td className="px-4 py-3 text-slate-500">{child.modifiedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    if (search.trim()) {
      return renderSearchResults();
    }
    if (selectedNode.type === "file") {
      return renderFileView();
    }
    if (viewMode === "grid") {
      return renderGridView();
    }

    return renderListView();
  };

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
        </div>
        <div className="flex justify-center py-4">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search files and folders..."
            className="w-full max-w-md rounded-md border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex justify-center items-center gap-2 pb-2">
          <button
            type="button"
            onClick={onAddFile}
            className={`rounded-md px-3 py-1.5 text-sm cursor-pointer bg-orange-300 hover:bg-orange-400 text-white`}
          >
            Add File
          </button>
          <button
            type="button"
            onClick={onAddFolder}
            className={`rounded-md px-3 py-1.5 text-sm cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white`}
          >
            Add Folder
          </button>
          <button
            type="button"
            onClick={onRename}
            className={`rounded-md px-3 py-1.5 text-sm cursor-pointer bg-green-500 hover:bg-green-600 text-white`}
          >
            Rename
          </button>
          <button
            type="button"
            onClick={onDelete}
            className={`rounded-md px-3 py-1.5 text-sm cursor-pointer bg-red-500 hover:bg-red-600 text-white`}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="p-6">{renderContent()}</div>
    </div>
  );
}

export default MainContent;
