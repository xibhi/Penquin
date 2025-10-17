'use client'

import React from 'react'

interface CommandPair {
  leftCmd: string
  leftDesc: string
  idx: number
  rightCmd: string
  rightDesc: string
}

// Data reconstructed from provided HTML, preserving exact order
const commands: CommandPair[] = [
  { leftCmd: 'pwd', leftDesc: 'Print working directory.', idx: 1, rightCmd: 'cd', rightDesc: 'Change directory.' },
  { leftCmd: 'ls', leftDesc: 'List files and directories in the current directory.', idx: 2, rightCmd: 'dir', rightDesc: 'List files and folders.' },
  { leftCmd: 'cd', leftDesc: 'Change directory.', idx: 3, rightCmd: 'cls', rightDesc: 'Clear the screen.' },
  { leftCmd: 'touch', leftDesc: 'Create an empty file.', idx: 4, rightCmd: 'md', rightDesc: 'Create a new directory.' },
  { leftCmd: 'mkdir', leftDesc: 'Create a new directory.', idx: 5, rightCmd: 'rd', rightDesc: 'Remove a directory.' },
  { leftCmd: 'rmdir', leftDesc: 'Remove an empty directory.', idx: 6, rightCmd: 'copy', rightDesc: 'Copy files.' },
  { leftCmd: 'rm', leftDesc: 'Remove files or directories.', idx: 7, rightCmd: 'move', rightDesc: 'Move files.' },
  { leftCmd: 'cp', leftDesc: 'Copy files or directories.', idx: 8, rightCmd: 'rename', rightDesc: 'Rename files or folders.' },
  { leftCmd: 'mv', leftDesc: 'Move or rename files and directories.', idx: 9, rightCmd: 'del', rightDesc: 'Delete files.' },
  { leftCmd: 'cat', leftDesc: 'Concatenate and display file content.', idx: 10, rightCmd: 'type', rightDesc: 'Display the contents of a text file.' },
  { leftCmd: 'more', leftDesc: 'Display file content page by page.', idx: 11, rightCmd: 'echo', rightDesc: 'Display a message or enable/disable echoing.' },
  { leftCmd: 'less', leftDesc: 'Display file content with backward navigation.', idx: 12, rightCmd: 'ipconfig', rightDesc: 'Display network configuration.' },
  { leftCmd: 'head', leftDesc: 'Display the beginning of a file.', idx: 13, rightCmd: 'ping', rightDesc: 'Test network connectivity.' },
  { leftCmd: 'tail', leftDesc: 'Display the end of a file.', idx: 14, rightCmd: 'netstat', rightDesc: 'Display network statistics.' },
  { leftCmd: 'nano', leftDesc: 'A simple text editor.', idx: 15, rightCmd: 'tracert', rightDesc: 'Trace the route to a remote host.' },
  { leftCmd: 'vim', leftDesc: 'A powerful text editor.', idx: 16, rightCmd: 'shutdown', rightDesc: 'Shut down or restart the computer.' },
  { leftCmd: 'grep', leftDesc: 'Search for text using patterns.', idx: 17, rightCmd: 'tasklist', rightDesc: 'List running processes.' },
  { leftCmd: 'find', leftDesc: 'Search for files and directories.', idx: 18, rightCmd: 'taskkill', rightDesc: 'Terminate running processes.' },
  { leftCmd: 'locate', leftDesc: 'Quickly find files by name.', idx: 19, rightCmd: 'systeminfo', rightDesc: 'Display system information.' },
  { leftCmd: 'df', leftDesc: 'Display disk space usage.', idx: 20, rightCmd: 'hostname', rightDesc: "Display the computer's hostname." },
  { leftCmd: 'du', leftDesc: 'Display directory space usage.', idx: 21, rightCmd: 'sfc /scannow', rightDesc: 'Check and repair system files.' },
  { leftCmd: 'ps', leftDesc: 'Display running processes.', idx: 22, rightCmd: 'chkdsk', rightDesc: 'Check and repair disk errors.' },
  { leftCmd: 'top', leftDesc: 'Monitor system processes.', idx: 23, rightCmd: 'format', rightDesc: 'Format a disk.' },
  { leftCmd: 'kill', leftDesc: 'Terminate processes.', idx: 24, rightCmd: 'xcopy', rightDesc: 'Copy files and directories with extended options.' },
  { leftCmd: 'shutdown', leftDesc: 'Shutdown or restart the system.', idx: 25, rightCmd: 'robocopy', rightDesc: 'Robust file and directory copying tool.' },
  { leftCmd: 'reboot', leftDesc: 'Reboot the system.', idx: 26, rightCmd: 'diskpart', rightDesc: 'Disk partition management tool.' },
  { leftCmd: 'ifconfig', leftDesc: 'Configure network interfaces.', idx: 27, rightCmd: 'net use', rightDesc: 'Connect to or disconnect from shared resources.' },
  { leftCmd: 'ping', leftDesc: 'Test network connectivity.', idx: 28, rightCmd: 'net user', rightDesc: 'Manage user accounts.' },
  { leftCmd: 'ssh', leftDesc: 'Securely log in to remote servers.', idx: 29, rightCmd: 'net group', rightDesc: 'Manage groups.' },
  { leftCmd: 'scp', leftDesc: 'Securely copy files between systems.', idx: 30, rightCmd: 'net view', rightDesc: 'List shared resources on a network.' },
  { leftCmd: 'chmod', leftDesc: 'Change file permissions.', idx: 31, rightCmd: 'net start', rightDesc: 'Start a service.' },
  { leftCmd: 'chown', leftDesc: 'Change file ownership.', idx: 32, rightCmd: 'net stop', rightDesc: 'Stop a service.' },
  { leftCmd: 'tar', leftDesc: 'Archive files and directories.', idx: 33, rightCmd: 'netsh', rightDesc: 'Network configuration tool.' },
  { leftCmd: 'gzip', leftDesc: 'Compress files.', idx: 34, rightCmd: 'sc', rightDesc: 'Service Control Manager.' },
  { leftCmd: 'gunzip', leftDesc: 'Decompress files.', idx: 35, rightCmd: 'regedit', rightDesc: 'Registry Editor.' },
  { leftCmd: 'zip', leftDesc: 'Create compressed zip archives.', idx: 36, rightCmd: 'gpupdate', rightDesc: 'Update Group Policy settings.' },
  { leftCmd: 'unzip', leftDesc: 'Extract files from zip archives.', idx: 37, rightCmd: 'taskmgr', rightDesc: 'Open Task Manager.' },
  { leftCmd: 'wget', leftDesc: 'Download files from the internet.', idx: 38, rightCmd: 'msconfig', rightDesc: 'System Configuration Utility.' },
  { leftCmd: 'curl', leftDesc: 'Transfer data with URLs.', idx: 39, rightCmd: 'calc', rightDesc: 'Calculator.' },
  { leftCmd: 'ps aux', leftDesc: 'List all running processes.', idx: 40, rightCmd: 'notepad', rightDesc: 'Open Notepad.' },
  { leftCmd: 'passwd', leftDesc: 'Change user password.', idx: 41, rightCmd: 'wmic', rightDesc: 'Windows Management Instrumentation Command-line.' },
  { leftCmd: 'useradd', leftDesc: 'Add a new user.', idx: 42, rightCmd: 'powercfg', rightDesc: 'Power Configuration tool.' },
  { leftCmd: 'userdel', leftDesc: 'Delete a user.', idx: 43, rightCmd: 'shutdown', rightDesc: 'Shutdown or restart the computer.' },
  { leftCmd: 'groupadd', leftDesc: 'Add a new group.', idx: 44, rightCmd: 'systeminfo', rightDesc: 'Display detailed system information.' },
  { leftCmd: 'groupdel', leftDesc: 'Delete a group.', idx: 45, rightCmd: 'eventvwr', rightDesc: 'Event Viewer.' },
  { leftCmd: 'sudo', leftDesc: 'Execute commands with superuser privileges.', idx: 46, rightCmd: 'gpedit.msc', rightDesc: 'Group Policy Editor.' },
  { leftCmd: 'su', leftDesc: 'Switch to a different user.', idx: 47, rightCmd: 'control', rightDesc: 'Open Control Panel.' },
  { leftCmd: 'history', leftDesc: 'View command history.', idx: 48, rightCmd: 'msinfo32', rightDesc: 'System Information.' },
  { leftCmd: 'date', leftDesc: 'Display the current date and time.', idx: 49, rightCmd: 'schtasks', rightDesc: 'Task Scheduler.' },
  { leftCmd: 'cal', leftDesc: 'Display a calendar.', idx: 50, rightCmd: 'subst', rightDesc: 'Associate a path with a drive letter.' },
  { leftCmd: 'hostname', leftDesc: "Display or set the system's hostname.", idx: 51, rightCmd: 'netstat -an', rightDesc: 'Display all active network connections.' },
  { leftCmd: 'who', leftDesc: 'Display logged-in users.', idx: 52, rightCmd: 'telnet', rightDesc: 'Telnet client for connecting to remote systems.' },
  { leftCmd: 'w', leftDesc: 'Display information about users.', idx: 53, rightCmd: 'nslookup', rightDesc: 'Look up IP addresses or domain names.' },
  { leftCmd: 'man', leftDesc: 'Display manual pages for commands.', idx: 54, rightCmd: 'assoc', rightDesc: 'Display or modify file extension associations.' },
  { leftCmd: 'which', leftDesc: 'Display the location of a command.', idx: 55, rightCmd: 'attrib', rightDesc: 'Display or change file attributes.' },
  { leftCmd: 'alias', leftDesc: 'Create command shortcuts.', idx: 56, rightCmd: 'tree', rightDesc: 'Display folder structure as a tree.' },
  { leftCmd: 'export', leftDesc: 'Set environment variables.', idx: 57, rightCmd: 'fc', rightDesc: 'Compare two files or sets of files.' },
  { leftCmd: 'echo', leftDesc: 'Print text to the terminal.', idx: 58, rightCmd: 'find', rightDesc: 'Search for text within files.' },
  { leftCmd: 'touch', leftDesc: 'Create an empty file.', idx: 59, rightCmd: 'gpupdate /force', rightDesc: 'Force an immediate Group Policy update.' },
  { leftCmd: 'uptime', leftDesc: 'Display system uptime.', idx: 60, rightCmd: 'cipher', rightDesc: 'Encrypt or decrypt files and folders.' },
  { leftCmd: 'df -h', leftDesc: 'Display disk space usage in a human-readable format.', idx: 61, rightCmd: 'perfmon', rightDesc: 'Performance Monitor.' },
  { leftCmd: 'du -h', leftDesc: 'Display directory space usage in a human-readable format.', idx: 62, rightCmd: 'reg add', rightDesc: 'Add a new registry entry.' },
  { leftCmd: 'whoami', leftDesc: 'Display the current user.', idx: 63, rightCmd: 'reg delete', rightDesc: 'Delete a registry entry.' },
  { leftCmd: 'free', leftDesc: 'Display memory usage.', idx: 64, rightCmd: 'reg query', rightDesc: 'Query the registry for information.' },
  { leftCmd: 'ln', leftDesc: 'Create links between files.', idx: 65, rightCmd: 'reg export', rightDesc: 'Export registry keys and values.' },
  { leftCmd: 'lspci', leftDesc: 'List PCI devices.', idx: 66, rightCmd: 'reg import', rightDesc: 'Import registry keys and values.' },
  { leftCmd: 'lsusb', leftDesc: 'List USB devices.', idx: 67, rightCmd: 'reg save', rightDesc: 'Save a copy of the registry.' },
  { leftCmd: 'lsmod', leftDesc: 'List loaded kernel modules.', idx: 68, rightCmd: 'reg restore', rightDesc: 'Restore the registry from a backup.' },
  { leftCmd: 'mount', leftDesc: 'Mount filesystems.', idx: 69, rightCmd: 'sc config', rightDesc: 'Configure a service.' },
  { leftCmd: 'umount', leftDesc: 'Unmount filesystems.', idx: 70, rightCmd: 'sc delete', rightDesc: 'Delete a service.' },
  { leftCmd: 'shutdown -h now', leftDesc: 'Shutdown the system immediately.', idx: 71, rightCmd: 'sc query', rightDesc: 'Query service status.' },
  { leftCmd: 'shutdown -r now', leftDesc: 'Restart the system immediately.', idx: 72, rightCmd: 'sc start', rightDesc: 'Start a service.' },
  { leftCmd: 'ip addr', leftDesc: 'Display network interface information.', idx: 73, rightCmd: 'sc stop', rightDesc: 'Stop a service.' },
  { leftCmd: 'netstat', leftDesc: 'Display network connections.', idx: 74, rightCmd: 'sc create', rightDesc: 'Create a new service.' },
  { leftCmd: 'route', leftDesc: 'Display or manipulate the IP routing table.', idx: 75, rightCmd: 'convert', rightDesc: 'Convert file systems (e.g., FAT to NTFS).' },
  { leftCmd: 'crontab', leftDesc: 'Schedule recurring tasks.', idx: 76, rightCmd: 'sfc /verifyonly', rightDesc: 'Verify system files without repairing them.' },
  { leftCmd: 'at', leftDesc: 'Schedule one-time tasks.', idx: 77, rightCmd: 'tasklist /svc', rightDesc: 'List processes with services.' },
  { leftCmd: 'df -i', leftDesc: 'Display inode usage.', idx: 78, rightCmd: 'driverquery', rightDesc: 'List installed device drivers.' },
  { leftCmd: 'chroot', leftDesc: 'Change the root directory for a command.', idx: 79, rightCmd: 'wmic process', rightDesc: 'Manage processes using WMI.' },
  { leftCmd: 'watch', leftDesc: 'Execute a command repeatedly.', idx: 80, rightCmd: 'wmic logicaldisk', rightDesc: 'Manage disk drives using WMI.' },
  { leftCmd: 'nc', leftDesc: 'Netcat, for networking and port scanning.', idx: 81, rightCmd: 'wmic startup', rightDesc: 'Manage startup programs using WMI.' },
  { leftCmd: 'dd', leftDesc: 'Convert and copy files.', idx: 82, rightCmd: 'wmic useraccount', rightDesc: 'Manage user accounts using WMI.' },
  { leftCmd: 'htop', leftDesc: 'Interactive process viewer.', idx: 83, rightCmd: 'wmic bios', rightDesc: 'Access BIOS information using WMI.' },
  { leftCmd: 'passwd [username]', leftDesc: "Change another user's password (requires sudo).", idx: 84, rightCmd: 'wmic os', rightDesc: 'Access operating system information using WMI.' },
  { leftCmd: 'chmod +x', leftDesc: 'Make a file executable.', idx: 85, rightCmd: 'wmic diskdrive', rightDesc: 'Access disk drive information using WMI.' },
  { leftCmd: 'dd if=/dev/zero of=file bs=1M count=100', leftDesc: 'Create a 100MB file of zeros.', idx: 86, rightCmd: 'wmic printer', rightDesc: 'Manage printers using WMI.' },
  { leftCmd: 'mkfs', leftDesc: 'Create a filesystem.', idx: 87, rightCmd: 'wmic service', rightDesc: 'Manage services using WMI.' },
  { leftCmd: 'fsck', leftDesc: 'Check and repair filesystems.', idx: 88, rightCmd: 'wbadmin', rightDesc: 'Windows Backup and Restore tool.' },
  { leftCmd: 'lsof', leftDesc: 'List open files and processes.', idx: 89, rightCmd: 'netsh firewall', rightDesc: 'Configure Windows Firewall.' },
  { leftCmd: 'rename', leftDesc: 'Rename files using patterns.', idx: 90, rightCmd: 'netsh wlan', rightDesc: 'Manage wireless networks.' },
  { leftCmd: 'sed', leftDesc: 'Stream editor for text manipulation.', idx: 91, rightCmd: 'netsh interface', rightDesc: 'Configure network interfaces.' },
  { leftCmd: 'awk', leftDesc: 'Text processing tool.', idx: 92, rightCmd: 'regsvr32', rightDesc: 'Register or unregister DLL files.' },
  { leftCmd: 'grep -r', leftDesc: 'Recursively search for text in files.', idx: 93, rightCmd: 'assoc', rightDesc: 'Display or change file associations.' },
  { leftCmd: 'ls -l', leftDesc: 'List files in long format (with details).', idx: 94, rightCmd: 'cacls', rightDesc: 'Display or modify file or directory permissions.' },
  { leftCmd: 'tar -xvf', leftDesc: 'Extract files from a tarball.', idx: 95, rightCmd: 'subst', rightDesc: 'Map a drive letter to a folder path.' },
  { leftCmd: 'tar -cvf', leftDesc: 'Create a tarball.', idx: 96, rightCmd: 'wmic product', rightDesc: 'List installed software.' },
  { leftCmd: 'wc', leftDesc: 'Word, line, character, and byte count.', idx: 97, rightCmd: 'wmic qfe', rightDesc: 'List installed Windows updates.' },
  { leftCmd: 'uptime', leftDesc: 'Show how long the system has been running.', idx: 98, rightCmd: 'bcdedit', rightDesc: 'Edit boot configuration data.' },
  { leftCmd: 'history | grep [keyword]', leftDesc: 'Search command history for a keyword.', idx: 99, rightCmd: 'chkntfs', rightDesc: 'Check the NTFS file system.' },
  { leftCmd: 'chsh', leftDesc: 'Change your default shell.', idx: 100, rightCmd: 'fsutil', rightDesc: 'File and volume utilities.' },
]

export function CLICommands() {
  return (
    <div className="space-y-6">
      
        <div className="hidden sm:grid grid-cols-12 items-stretch">
          <div className="col-span-2 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Command</div>
          <div className="col-span-4 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</div>
          <div className="col-span-1 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">#</div>
          <div className="col-span-2 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Command</div>
          <div className="col-span-3 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</div>
        </div>
        <div className="divide-y divide-border">
          {commands.map((row) => (
            <div
              key={`${row.idx}-${row.leftCmd}-${row.rightCmd}`}
              className="grid grid-cols-1 sm:grid-cols-12 items-start hover:bg-accent/40 transition-colors"
            >
              <div className="px-4 py-3 sm:col-span-2 text-sm font-mono">
                <div className="sm:hidden text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Unix</div>
                {row.leftCmd && (
                  <code className="py-0.5 px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">{row.leftCmd}</code>
                )}
              </div>
              <div className="px-4 py-3 sm:col-span-4 text-sm text-muted-foreground">
                <div className="sm:hidden text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Description</div>
                {row.leftDesc}
              </div>
              <div className="px-4 py-3 sm:col-span-1 text-sm">
                <div className="sm:hidden text-[10px] uppercase tracking-wide text-muted-foreground mb-1">#</div>
                {row.idx}
              </div>
              <div className="px-4 py-3 sm:col-span-2 text-sm font-semibold">
                <div className="sm:hidden text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Windows</div>
                {row.rightCmd}
              </div>
              <div className="px-4 py-3 sm:col-span-3 text-sm text-muted-foreground">
                <div className="sm:hidden text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Description</div>
                {row.rightDesc}
              </div>
            </div>
          ))}
        </div>
      
    </div>
  )
}


