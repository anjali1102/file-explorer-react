import { useState } from "react";
import { data } from "../../data/data";

type NodeType = "folder" | "file";

interface TreeNodeData {
    id: string;
    name: string;
    type: NodeType;
    modifiedAt: string;
    children?: TreeNodeData[];
}

interface DataStruture {
    root: TreeNodeData;
}

interface TreeNodeProps {
    node: TreeNodeData;
    depth?: number;
    defaultOpen?: boolean;
    onSelect: (node: TreeNodeData) => void;
}

function TreeNode({
    node,
    depth = 0,
    defaultOpen = false,
    onSelect,
}: TreeNodeProps) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    const hasChildren = !!node.children?.length;

    function handleTreeOpen(): void {
        onSelect(node);

        if (node.type === "folder") {
            setIsOpen((prev) => !prev);
        }
    }

    return (
        <li>
            <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex w-full items-center gap-1"
                data-tip={node.name}
                onClick={handleTreeOpen}
                style={{ paddingLeft: `${depth * 4}px` }}
            >
                <span>{node.type === "folder" ? "🗂️" : "📄"}</span>
                <span className="is-drawer-close:hidden">{node.name}</span>
                {hasChildren && (
                    <span className="is-drawer-close:hidden ml-auto">
                        {isOpen ? "▼" : "▶"}
                    </span>
                )}
            </button>

            {hasChildren && isOpen && (
                <ul className="is-drawer-close:hidden">
                    {node.children?.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            onSelect={onSelect}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

function Sidebar() {
    const typedData = data as DataStruture;
    const root = typedData.root;
    const [selectedNode, setSelectedNode] = useState<TreeNodeData>(root);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <nav className="navbar w-full bg-base-300">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                            className="my-1.5 inline-block size-4"
                        >
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </label>
                    <div className="px-4">File Explorer</div>
                </nav>
                <div className="p-4">
                    <div className="p-4">
                        {selectedNode.type === "file" ? (
                            <div className="text-base-content/60">
                                <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="80px" height="80px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml: space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#F9EBB2" d="M58,60V4c0-1.104-0.896-2-2-2H8C6.896,2,6,2.896,6,4v56c0,1.104,0.896,2,2,2h48C57.104,62,58,61.104,58,60z "></path> <g> <path fill="#394240" d="M56,0H8C5.789,0,4,1.789,4,4v56c0,2.211,1.789,4,4,4h48c2.211,0,4-1.789,4-4V4C60,1.789,58.211,0,56,0z M58,60c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2V4c0-1.104,0.896-2,2-2h48c1.104,0,2,0.896,2,2V60z"></path> <path fill="#394240" d="M49,25H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,25,49,25z"></path> <path fill="#394240" d="M49,19H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,19,49,19z"></path> <path fill="#394240" d="M49,37H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,37,49,37z"></path> <path fill="#394240" d="M49,43H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,43,49,43z"></path> <path fill="#394240" d="M49,49H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,49,49,49z"></path> <path fill="#394240" d="M49,31H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,31,49,31z"></path> <path fill="#394240" d="M15,15h16c0.553,0,1-0.447,1-1s-0.447-1-1-1H15c-0.553,0-1,0.447-1,1S14.447,15,15,15z"></path> </g> </g> </g></svg>
                                <h2 className="text-lg font-semibold">{selectedNode.name}</h2>
                                <div>{selectedNode.modifiedAt}</div>
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-2">
                                {selectedNode.children?.map((child) => (
                                    <div
                                        key={child.id}
                                        className="gap-2 rounded-md p-2 hover:bg-base-200 cursor-pointer"
                                        onClick={() => setSelectedNode(child)}
                                    >
                                        <div>{child.type === "folder" ? <svg width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M853.333333 256H469.333333l-85.333333-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v170.666667h853.333334v-85.333334c0-46.933333-38.4-85.333333-85.333334-85.333333z" fill="#FFA000"></path><path d="M853.333333 256H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v426.666667c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V341.333333c0-46.933333-38.4-85.333333-85.333334-85.333333z" fill="#FFCA28"></path></g></svg> : <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="80px" height="80px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml: space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#F9EBB2" d="M58,60V4c0-1.104-0.896-2-2-2H8C6.896,2,6,2.896,6,4v56c0,1.104,0.896,2,2,2h48C57.104,62,58,61.104,58,60z "></path> <g> <path fill="#394240" d="M56,0H8C5.789,0,4,1.789,4,4v56c0,2.211,1.789,4,4,4h48c2.211,0,4-1.789,4-4V4C60,1.789,58.211,0,56,0z M58,60c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2V4c0-1.104,0.896-2,2-2h48c1.104,0,2,0.896,2,2V60z"></path> <path fill="#394240" d="M49,25H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,25,49,25z"></path> <path fill="#394240" d="M49,19H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,19,49,19z"></path> <path fill="#394240" d="M49,37H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,37,49,37z"></path> <path fill="#394240" d="M49,43H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,43,49,43z"></path> <path fill="#394240" d="M49,49H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,49,49,49z"></path> <path fill="#394240" d="M49,31H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,31,49,31z"></path> <path fill="#394240" d="M15,15h16c0.553,0,1-0.447,1-1s-0.447-1-1-1H15c-0.553,0-1,0.447-1,1S14.447,15,15,15z"></path> </g> </g> </g></svg>}</div>
                                        <h2 className="text-lg font-semibold">{child.name}</h2>
                                        <div>{child.modifiedAt}</div>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    <ul className="menu w-full grow">
                        <li>
                            <span className="is-drawer-close:hidden">React Explorer</span>
                        </li>
                        <TreeNode
                            node={root}
                            depth={0}
                            defaultOpen={true}
                            onSelect={setSelectedNode}
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
