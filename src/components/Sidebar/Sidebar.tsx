import { useState } from 'react'
import data from '../../data/data.json'

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true)

    const root = data.root
    const hasChildren = root.children && root.children.length > 0

    function handleTreeOpen() {
        setIsOpen((prev) => !prev)
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">File Explorer</div>
                </nav>
                <div className="p-4">Page Content</div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    <ul className="menu w-full grow">
                        <li>
                            <span className="is-drawer-close:hidden">React Explorer</span>
                        </li>

                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="root" onClick={handleTreeOpen}>
                                {root.type === 'folder' ? '🗂️' : '📄'}
                                <span className="is-drawer-close:hidden">{root.name}</span>
                                {hasChildren && <span className="is-drawer-close:hidden ml-auto">{isOpen ? '▼' : '▶'}</span>}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar