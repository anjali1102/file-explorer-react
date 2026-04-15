import FolderIcon from "../Icons/FolderIcon";
import FileIcon from "../Icons/FileIcon";
import type { TreeNodeData } from "../../App";

interface MainContentProps {
  selectedNode: TreeNodeData;
  onNavigate: (id: string) => void;
}

function MainContent({ selectedNode, onNavigate }: MainContentProps) {
  return (
    <div className="h-screen overflow-auto bg-slate-50">
      <div className="py-8">
        <h1 className="text-xl font-semibold border-slate-200 text-center py-4">
          {selectedNode.name}
        </h1>
        {selectedNode.type === "file" ? (
          <div className="p-6">
            <FileIcon />
            <h2 className="mt-4 text-lg font-semibold">{selectedNode.name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {selectedNode.modifiedAt}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedNode.children?.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => onNavigate(child.id)}
                className="p-4 text-left hover:bg-slate-200 cursor-pointer"
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
        )}
      </div>
    </div>
  );
}

export default MainContent;
