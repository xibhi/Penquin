"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRocket, FaBookOpen } from "react-icons/fa";
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
}

// File icons intentionally removed for file items

// Map folder names to specific React Icons
const folderNameToIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "Launchpad": FaRocket,
  "Bug Hunter's Armory": GiCrossedSwords,
  "Learn the Basics": FaBookOpen,
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
    name: "Launchpad",
    type: "folder",
    children: [
      { name: "Introduction", type: "file", path: "/docs" },
    ],
  },
  {
    name: "Bug Hunter's Armory",
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
      { name: "Cli Commands", type: "file", path: "/docs/cli-commands" },
      { name: "Learn WSL", type: "file", path: "/docs/learn-wsl" },
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
  // No icon for files in sidebar
  return null;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  item,
  selectedFile,
  onFileSelect,
}) => {
  const router = useRouter();
  const isFolder = item.type === "folder";
  const [isOpen, setIsOpen] = useState(isFolder);

  const handleToggle = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(item.name);
      if (item.path) {
        router.push(item.path);
      }
    }
  };

  const isSelected = !isFolder && selectedFile === item.name;

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
        className={`pl-4 relative overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px]" : "max-h-0"}`}
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
            />
          ))}
      </div>
    </div>
  );
};

export default function FileTree() {
  const [selectedFile, setSelectedFile] = useState("Launchpad");

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
    console.log(`Selected file: ${fileName}`);
  };

  return (
    <div className="font-mono p-2">
      <div className="w-full max-w-xs">
        {fileTreeData.map((item) => (
          <TreeNode
            key={item.name}
            item={item}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />
        ))}
      </div>
    </div>
  );
}
