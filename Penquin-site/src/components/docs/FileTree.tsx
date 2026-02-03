"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaRocket, FaBookOpen, FaUserSecret } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import { motion, AnimatePresence } from "motion/react";
import { BsAndroid2 } from "react-icons/bs";

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
  "Android Bug Bounty": BsAndroid2,
};

const ChevronIcon: React.FC<ChevronIconProps> = ({ isOpen }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4 text-gray-800 dark:text-white shrink-0"
    animate={{ rotate: isOpen ? 90 : 0 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </motion.svg>
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
      { name: "YouTube Channels", type: "file", path: "/docs/youtube-channels" },
    ],
  },
  {
    name: "Android Bug Bounty",
    type: "folder",
    children: [
      { name: "Video Tutorials", type: "file", path: "/docs/video-tutorials" },
      { name: "YouTube Channels", type: "file", path: "/docs/android-youtube-channels" },
      { name: "Best Bug Reports", type: "file", path: "/docs/bestbugreports" },
      { name: "GitHub Repository", type: "file", path: "/docs/github-repository" },
      { name: "Blogs & Writeups", type: "file", path: "/docs/blogs-and-writeups" },
      { name: "Conference Talks", type: "file", path: "/docs/conference-talks" },
      { name: "Automated Scanners", type: "file", path: "/docs/automated-scanners" },
      { name: "Intentionally Vulnerable Apps", type: "file", path: "/docs/intentionally-vulnerable-apps" },
      { name: "Learn Drozer for Android Pentesting", type: "file", path: "/docs/learn-drozer-for-android-pentesting" },
      { name: "Learn Frida for Android Pentesting", type: "file", path: "/docs/learn-frida-for-android-pentesting" },
      { name: "Bypassing Security Protections in APKs via Objection and Frida", type: "file", path: "/docs/bypassing-security-protections-in-apks-via-objection-and-frida" },
      { name: "Security Tools for Android Pentesting", type: "file", path: "/docs/security-tools-for-android-pentesting" },
      { name: "PIDCAT for Android Bug Bounty Logging", type: "file", path: "/docs/pidcat-bug-bounty-logging" },
      { name: "CLI Commands & Shortcuts", type: "file", path: "/docs/cli-commands-and-shortcuts" },
      { name: "My Android Bug Bounty Lab Setup", type: "file", path: "/docs/my-android-bug-bounty-lab-setup" },
    ],
  },
  {
    name: "Learn the Basics",
    type: "folder",
    children: [
      { name: "Cyber Security Types", type: "file", path: "/docs/cyber-security-types" },
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
      { name: "YouTube", type: "file", path: "/docs/youtube" },
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

function getAllFolderNames(items: FileTreeItem[]): string[] {
  const result: string[] = [];
  for (const item of items) {
    if (item.type === "folder") {
      result.push(item.name);
      if (item.children) {
        result.push(...getAllFolderNames(item.children));
      }
    }
  }
  return result;
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
    <motion.div
      className="text-gray-700 dark:text-gray-300 relative"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={`flex items-center py-1.5 px-2 rounded-md cursor-pointer transition-colors duration-150 ${isSelected
          ? "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-white"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        onClick={handleToggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        <div className="flex items-center flex-grow">
          {isFolder ? (
            <ChevronIcon isOpen={isOpen} />
          ) : (
            <div className="w-4 shrink-0"></div>
          )}
          <div className="flex items-center ml-1">
            <TreeIcon item={item} isOpen={isOpen} />
            <span className="text-sm ml-1.5">{item.name}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isFolder && isOpen && item.children && (
          <motion.div
            className="pl-4 relative overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: suppressAnim ? 0 : 0.3,
              ease: "easeInOut"
            }}
          >
            <div className="absolute left-[13px] top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-800"></div>
            {item.children.map((child: FileTreeItem, index: number) => (
              <motion.div
                key={child.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: suppressAnim ? 0 : index * 0.05
                }}
              >
                <TreeNode
                  item={child}
                  selectedFile={selectedFile}
                  onFileSelect={onFileSelect}
                  currentPath={currentPath}
                  openFolders={openFolders}
                  onToggleFolder={onToggleFolder}
                  suppressAnim={suppressAnim}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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

  // Load persisted open folders once; default to all folders open
  const [openFolders, setOpenFolders] = useState<Set<string>>(() => {
    try {
      const raw = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null;
      if (raw) return new Set(JSON.parse(raw));
    } catch { }
    return new Set(getAllFolderNames(fileTreeData));
  });

  // On mount, always restore from sessionStorage if present (guards SSR/hydration quirks)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setOpenFolders(new Set(JSON.parse(raw)));
      else setOpenFolders(new Set(getAllFolderNames(fileTreeData)));
    } catch { }
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
    } catch { }
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
    <motion.div
      className="p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-xs">
        {fileTreeData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TreeNode
              item={item}
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              currentPath={currentPath}
              openFolders={openFolders}
              onToggleFolder={handleToggleFolder}
              suppressAnim={suppressAnim}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}