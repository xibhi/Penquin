"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaRocket, FaBookOpen, FaUserSecret } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";

interface FileTreeItem {
  name: string;
  type: "folder" | "file";
  icon?: React.ComponentType;
  children?: FileTreeItem[];
  path?: string;
}

interface ChevronIconProps {
  isOpen: boolean;
}

interface TreeIconProps {
  item: FileTreeItem;
  isOpen: boolean;
}

interface TreeNodeProps {
  item: FileTreeItem;
  selectedFile: string;
  onFileSelect: (fileName: string) => void;
  currentPath: string;
  openFolders: Set<string>;
  onToggleFolder: (folderKey: string) => void;
  suppressAnim: boolean;
}

const STORAGE_KEY = "fileTreeOpenFolders";

// Map folder names to specific React Icons
const folderNameToIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "Getting Started": FaRocket,
  "Bug Hunter's Toolkit": GiCrossedSwords,
  "Learn the Basics": FaBookOpen,
  "Hackers to Follow": FaUserSecret,
};

const ChevronIcon: React.FC<ChevronIconProps> = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-4 h-4 text-gray-800 dark:text-white transition-transform duration-200 shrink-0 ${isOpen ? "rotate-90" : ""}`}
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const fileTreeData: FileTreeItem[] = [
  {
    name: "Getting Started",
    type: "folder",
    children: [
      { name: "Introduction", type: "file", path: "/docs" },
    ],
  },
  {
    name: "Bug Hunter's Toolkit",
    type: "folder",
    children: [
      { name: "Arsenal", type: "file", path: "/docs/arsenal" },
      { name: "Reconnaissance", type: "file", path: "/docs/reconnaissance" },
      { name: "Methodology", type: "file", path: "/docs/methodology" },
      { name: "Extensions", type: "file", path: "/docs/extensions" },
      { name: "Writeups", type: "file", path: "/docs/writeups" },
      { name: "Youtube Channels", type: "file", path: "/docs/youtube-channels" },
    ],
  },
  {
    name: "Learn the Basics",
    type: "folder",
    children: [
      { name: "Cyber Security Types",type: "file", path: "/docs/cyber-security-types" },
      { name: "Common Job Roles", type: "file", path: "/docs/common-job-roles" },
      { name: "Get Started with Infosec", type: "file", path: "/docs/get-started-with-infosec" },
      { name: "Best Bug Bounty Platform", type: "file", path: "/docs/best-bug-bounty-platform" },
      { name: "Best Infosec Writeups Website", type: "file", path: "/docs/best-infosec-writeups-website" },
      { name: "Hacking Books", type: "file", path: "/docs/hacking-books" },
      { name: "CLI Commands", type: "file", path: "/docs/cli-commands" },
      { name: "Learn WSL", type: "file", path: "/docs/learn-wsl" },
    ],
  },
  {
    name: "Hackers to Follow",
    type: "folder",
    children: [
      { name: "Twitter", type: "file", path: "/docs/twitter" },
      { name: "Medium", type: "file", path: "/docs/medium" },
      { name: "Youtube", type: "file", path: "/docs/youtube" },
      { name: "Discord", type: "file", path: "/docs/discord" },
      { name: "Security Gitbooks", type: "file", path: "/docs/security-gitbooks" },
    ],
  },
];

const TreeIcon: React.FC<TreeIconProps> = ({ item }) => {
  if (item.icon) {
    const IconComponent = item.icon;
    return <IconComponent />;
  }
  if (item.type === "folder") {
    const IconComponent = folderNameToIcon[item.name];
    if (!IconComponent) return null;
    return <IconComponent className="w-4 h-4 mr-2 text-gray-800 dark:text-white shrink-0" />;
  }
  return null;
};

function findFolderChainForPath(items: FileTreeItem[], path: string, chain: string[] = []): string[] | null {
  for (const item of items) {
    if (item.type === "file" && item.path === path) return chain;
    if (item.type === "folder" && item.children) {
      const result = findFolderChainForPath(item.children, path, [...chain, item.name]);
      if (result) return result;
    }
  }
  return null;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  item,
  selectedFile,
  onFileSelect,
  currentPath,
  openFolders,
  onToggleFolder,
  suppressAnim,
}) => {
  const router = useRouter();
  const isFolder = item.type === "folder";
  const isOpen = isFolder ? openFolders.has(item.name) : false;

  const handleToggle = () => {
    if (isFolder) {
      onToggleFolder(item.name);
    } else {
      onFileSelect(item.name);
      if (item.path) {
        router.push(item.path);
      }
    }
  };

  const isSelected = !isFolder && item.path === currentPath;

  return (
    <div className="text-gray-700 dark:text-gray-300 relative">
      <div
        className={`flex items-center py-1.5 px-2 rounded-md cursor-pointer transition-colors duration-150 ${
          isSelected
            ? "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        onClick={handleToggle}
      >
        <div className="flex items-center flex-grow">
          {isFolder ? (
            <ChevronIcon isOpen={isOpen} />
          ) : (
            <div className="w-4 shrink-0"></div>
          )}
          <div className="flex items-center ml-1">
            <TreeIcon item={item} isOpen={isOpen} />
            <span className="text-xs ml-1.5">{item.name}</span>
          </div>
        </div>
      </div>

      <div
        className={`${suppressAnim ? "transition-none" : "transition-[max-height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"} pl-4 relative overflow-hidden ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="absolute left-[13px] top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-800"></div>
        {isFolder &&
          isOpen &&
          item.children &&
          item.children.map((child: FileTreeItem) => (
            <TreeNode
              key={child.name}
              item={child}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
              currentPath={currentPath}
              openFolders={openFolders}
              onToggleFolder={onToggleFolder}
              suppressAnim={suppressAnim}
            />
          ))}
      </div>
    </div>
  );
};

export default function FileTree() {
  const [selectedFile, setSelectedFile] = useState("Getting Started");
  const currentPath = usePathname() || "";

  // Mount guard to avoid SSR/hydration flicker of open/closed folders
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load persisted open folders once
  const [openFolders, setOpenFolders] = useState<Set<string>>(() => {
    try {
      const raw = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null;
      if (raw) return new Set(JSON.parse(raw));
    } catch {}
    const chain = findFolderChainForPath(fileTreeData, currentPath) || [];
    return new Set(chain);
  });

  // On mount, always restore from sessionStorage if present (guards SSR/hydration quirks)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setOpenFolders(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  // Disable accordion animation briefly on route changes (e.g., bottom nav)
  const [suppressAnim, setSuppressAnim] = useState(true);
  useEffect(() => {
    const t0 = setTimeout(() => setSuppressAnim(false), 50);
    return () => clearTimeout(t0);
  }, []);
  const prevPathRef = useRef(currentPath);
  useEffect(() => {
    if (prevPathRef.current !== currentPath) {
      setSuppressAnim(true);
      const t = setTimeout(() => setSuppressAnim(false), 250);
      prevPathRef.current = currentPath;
      return () => clearTimeout(t);
    }
  }, [currentPath]);

  // Persist on changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(openFolders)));
    } catch {}
  }, [openFolders]);

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
  };

  const handleToggleFolder = (folderKey: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderKey)) next.delete(folderKey);
      else next.add(folderKey);
      return next;
    });
  };

  if (!mounted) {
    return (
      <div className="p-2"><div className="w-full max-w-xs" /></div>
    );
  }

  return (
    <div className="p-2">
      <div className="w-full max-w-xs">
        {fileTreeData.map((item) => (
          <TreeNode
            key={item.name}
            item={item}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            currentPath={currentPath}
            openFolders={openFolders}
            onToggleFolder={handleToggleFolder}
            suppressAnim={suppressAnim}
          />
        ))}
      </div>
    </div>
  );
}