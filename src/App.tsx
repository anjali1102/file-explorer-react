import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { data } from "./data/data";
import { findNodeAndPath } from "./utils/findnodepath";
import MainContent from "./components/MainContent/MainContent";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import { insertNode } from "./utils/insertNode";

type NodeType = "folder" | "file";

export interface TreeNodeData {
  id: string;
  name: string;
  type: NodeType;
  modifiedAt: string;
  children?: TreeNodeData[];
}

interface DataStruture {
  root: TreeNodeData;
}

export type Crumb = {
  id: string;
  name: string;
};

function App() {
  const typedData = data as DataStruture;
  const [root, setRoot] = useState<TreeNodeData>(typedData.root);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    typedData.root.id
  );

  const selectedResult = findNodeAndPath(root, selectedNodeId);
  const selectedNode = selectedResult?.node ?? root;
  const items = selectedResult?.path ?? [];

  function handleNavigate(id: string) {
    const result = findNodeAndPath(root, id);
    if (result) {
      setSelectedNodeId(id);
    }
  }

  function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  function getTargetFolderId() {
    if (selectedNode.type === "folder") {
      return selectedNode.id;
    }

    const parentCrumb = items[items.length - 2];
    console.log("get path", parentCrumb?.id ?? root.id, parentCrumb?.id);
    return parentCrumb?.id ?? root.id;
  }

  function handleAddFile() {
    const name = prompt("NAME OF NEW FILE");
    if (!name) return;

    const newFile: TreeNodeData = {
      id: crypto.randomUUID(),
      name,
      type: "file",
      modifiedAt: getCurrentDateTime(),
    };

    const targetFolderId = getTargetFolderId();
    const updatedTree = insertNode(root, targetFolderId, newFile);
    console.log("idk", updatedTree);
    setRoot(updatedTree);
  }

  function handleAddFolder() {
    const name = prompt("NAME OF NEW FOLDER");
    if (!name) return;

    const newFolder: TreeNodeData = {
      id: crypto.randomUUID(),
      name,
      type: "folder",
      modifiedAt: getCurrentDateTime(),
      children: [],
    };

    const targetFolderId = getTargetFolderId();
    const updatedTree = insertNode(root, targetFolderId, newFolder);

    setRoot(updatedTree);
  }

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      <aside className="shrink-0">
        <Sidebar
          root={root}
          onSelect={setSelectedNodeId}
          selectedNode={selectedNode}
        />
      </aside>

      <main className="flex-1">
        <Breadcrumbs items={items} onNavigate={handleNavigate} />
        <MainContent
          selectedNode={selectedNode}
          onNavigate={handleNavigate}
          onAddFile={handleAddFile}
          onAddFolder={handleAddFolder}
        />
      </main>
    </div>
  );
}

export default App;
