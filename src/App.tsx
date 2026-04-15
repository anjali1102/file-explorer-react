import { useState } from 'react';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import { data } from './data/data';
import { findNodeAndPath } from './utils/findnodepath';
import MainContent from './components/MainContent/MainContent';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';


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
  const root = typedData.root;
  const [selectedNode, setSelectedNode] = useState<TreeNodeData>(root);

  const selectedResult = findNodeAndPath(root, selectedNode.id);
  const items = selectedResult?.path ?? [];

  function handleNavigate(id: string) {
    const result = findNodeAndPath(root, id);
    if (result) {
      setSelectedNode(result.node);
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      <aside className="shrink-0">
        <Sidebar root={root} onSelect={setSelectedNode} />
      </aside>

      <main className="flex-1">
        <Breadcrumbs items={items} onNavigate={handleNavigate} />
        <MainContent
          selectedNode={selectedNode}
          onNavigate={handleNavigate}
        />
      </main>
    </div>
  )
}

export default App
