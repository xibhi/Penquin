#!/bin/bash
set -e
# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status()   { echo -e "${GREEN}[Success \U1F44D]${NC} $1"; }
print_warning()  { echo -e "${YELLOW}[WARNING \U1F6A8]${NC} $1"; }
print_error()    { echo -e "${RED}[ERROR \U274C]${NC} $1"; }

# Detect package manager
detect_package_manager() {
    if command -v apt-get &> /dev/null; then
        echo "apt"
    elif command -v yum &> /dev/null; then
        echo "yum"
    elif command -v dnf &> /dev/null; then
        echo "dnf"
    elif command -v pacman &> /dev/null; then
        echo "pacman"
    elif command -v zypper &> /dev/null; then
        echo "zypper"
    elif command -v apk &> /dev/null; then
        echo "apk"
    else
        echo "unknown"
    fi
}

# Install packages for the detected package manager
install_packages() {
    local pkg_manager=$1; shift
    local packages=("$@")
    case $pkg_manager in
        "apt")
            sudo apt-get update
            sudo apt-get --assume-yes install "${packages[@]}"
            ;;
        "yum")
            sudo yum update -y
            sudo yum install -y "${packages[@]}"
            ;;
        "dnf")
            sudo dnf update -y
            sudo dnf install -y "${packages[@]}"
            ;;
        "pacman")
            sudo pacman -Syu --noconfirm
            sudo pacman -S --noconfirm "${packages[@]}"
            ;;
        "zypper")
            sudo zypper refresh
            sudo zypper install -y "${packages[@]}"
            ;;
        "apk")
            sudo apk update
            sudo apk add "${packages[@]}"
            ;;
        *)
            print_error "Unsupported package manager. Please install packages manually:"
            printf '%s\n' "${packages[@]}"
            exit 1
            ;;
    esac
}

# Main
echo "
#        =========================
#  Penquin Common Security Tools Installer
#        =========================         
"
echo "Installing Go, pipx, and security toolkit..."

# Detect package manager and packages list
PKG_MANAGER=$(detect_package_manager)
print_status "Detected package manager: $PKG_MANAGER"

declare -A PACKAGES
PACKAGES[apt]="git make gcc python3-pip python3-venv python3-full libpcap-dev wget ruby ruby-dev ruby-rubygems golang-go pipx"
PACKAGES[yum]="git make gcc python3-pip python3-setuptools libpcap-devel wget ruby ruby-devel rubygems golang pipx"
PACKAGES[dnf]="git make gcc python3-pip python3-setuptools libpcap-devel wget ruby ruby-devel rubygems golang pipx"
PACKAGES[pacman]="git make gcc python-pip python-setuptools libpcap wget ruby rubygems go python-pipx"
PACKAGES[zypper]="git make python3 gcc python3-pip python3-setuptools libpcap-devel wget ruby ruby-devel rubygems go python3-pipx"
PACKAGES[apk]="git make gcc python3 py3-pip libpcap-dev wget ruby ruby-dev ruby-gems go py3-pipx"

# Install system packages
print_status "Installing system packages..."
if [[ -n "${PACKAGES[$PKG_MANAGER]}" ]]; then
    install_packages $PKG_MANAGER ${PACKAGES[$PKG_MANAGER]}
else
    print_error "No package list defined for $PKG_MANAGER"
    exit 1
fi

# Security tool via gem
print_status "Installing wpscan via gem..."
if command -v gem &> /dev/null; then
    sudo gem install wpscan
    print_status "wpscan installed successfully"
else
    print_error "Ruby gems not available, cannot install wpscan"
fi

# User setup
REAL_USER="${SUDO_USER:-$USER}"
REAL_USER_HOME=$(eval echo "~$REAL_USER")

print_status "Ensuring home directory ownership for $REAL_USER"
sudo chown -R "$REAL_USER:$REAL_USER" "$REAL_USER_HOME"

print_status "Creating config directories as $REAL_USER"
sudo -u "$REAL_USER" mkdir -p "$REAL_USER_HOME/.config/go"
sudo -u "$REAL_USER" mkdir -p "$REAL_USER_HOME/go/bin"

# Install Go if not present
print_status "Installing Go..."
if ! command -v go &> /dev/null; then
    export PATH=$PATH:/usr/local/go/bin
    export PATH=$PATH:$(go env GOPATH 2>/dev/null)/bin 2>/dev/null || true

    if command -v go &> /dev/null; then
        print_status "Go installed via package manager: $(go version)"
    else
        GO_VERSION="1.24.5"
        GO_TARBALL="go${GO_VERSION}.linux-amd64.tar.gz"
        print_status "Downloading Go ${GO_VERSION}..."
        wget -q "https://golang.org/dl/${GO_TARBALL}" -O "/tmp/${GO_TARBALL}"
        print_status "Installing Go to /usr/local..."
        sudo rm -rf /usr/local/go
        sudo tar -C /usr/local -xzf "/tmp/${GO_TARBALL}"
        export PATH=$PATH:/usr/local/go/bin
        print_status "Go installed manually: $(go version)"
    fi
else
    print_status "Go is already installed: $(go version)"
fi

# Detect actual go binary for user
GO_BIN=$(sudo -u "$REAL_USER" command -v go 2>/dev/null || command -v go)
if [[ -z "$GO_BIN" ]]; then
    print_error "Go binary not found for user $REAL_USER"
    exit 1
fi

# Set up Go environment for the user
print_status "Configuring Go environment for user: $REAL_USER"
sudo -u "$REAL_USER" mkdir -p "$REAL_USER_HOME/.config/go"
sudo -u "$REAL_USER" mkdir -p "$REAL_USER_HOME/go/bin"
sudo -u "$REAL_USER" "$GO_BIN" env -w GOPATH="$REAL_USER_HOME/go"

if ! sudo -u "$REAL_USER" grep -q '/usr/local/go/bin' "$REAL_USER_HOME/.bashrc" 2>/dev/null; then
    echo 'export PATH=$PATH:/usr/local/go/bin' | sudo -u "$REAL_USER" tee -a "$REAL_USER_HOME/.bashrc"
fi
if ! sudo -u "$REAL_USER" grep -q '\$HOME/go/bin' "$REAL_USER_HOME/.bashrc" 2>/dev/null; then
    echo 'export PATH=$PATH:$HOME/go/bin' | sudo -u "$REAL_USER" tee -a "$REAL_USER_HOME/.bashrc"
fi

# pipx
print_status "Setting up pipx..."
if command -v pipx &> /dev/null; then
    sudo -u "$REAL_USER" python3 -m pipx ensurepath
    print_status "pipx is ready to use"
else
    print_error "pipx installation failed"
fi

# Go tools
print_status "Installing Go-based security tools..."
GO_TOOLS=(
  "github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest"
    "github.com/PentestPad/subzy@latest"
    "github.com/projectdiscovery/katana/cmd/katana@latest"
    "github.com/lc/gau/v2/cmd/gau@latest"
    "github.com/rverton/gxss@latest"
    "github.com/Emoe/kxss@latest"
    "github.com/hahwul/dalfox/v2@latest"
    "github.com/projectdiscovery/httpx/cmd/httpx@latest"
    "github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest"
    "github.com/KathanP19/Gxss@latest"
    "github.com/tomnomnom/qsreplace@latest"
    "github.com/ffuf/ffuf/v2@latest"
    "github.com/projectdiscovery/naabu/v2/cmd/naabu@latest"
    "github.com/tomnomnom/assetfinder@latest"
    "github.com/tomnomnom/httprobe@latest"
    "github.com/sa7mon/s3scanner@latest"
)
for tool in "${GO_TOOLS[@]}"; do
    print_status "Installing $tool"
    sudo -u "$REAL_USER" "$GO_BIN" install -v "$tool"
done

# masscan
print_status "Installing masscan..."
if ! command -v masscan &> /dev/null; then
    cd /tmp
    git clone https://github.com/robertdavidgraham/masscan
    cd masscan
    make
    sudo make install
    cd ..
    rm -rf masscan
    print_status "masscan installed successfully"
else
    print_status "masscan is already installed"
fi

# Python tools (pipx, as real user)
print_status "Installing Python-based security tools..."
sudo -u "$REAL_USER" pipx install arjun
sudo -u "$REAL_USER" pipx install uro

# corscanner
print_status "Installing corscanner..."
if sudo -u "$REAL_USER" pipx install corscanner; then
    print_status "corscanner installed via pipx"
elif sudo -u "$REAL_USER" pip3 install --user corscanner; then
    print_status "corscanner installed via pip --user"
elif sudo -u "$REAL_USER" pip3 install --break-system-packages corscanner; then
    print_warning "corscanner installed with --break-system-packages flag"
else
    print_error "Failed to install corscanner"
fi

print_status "Installation completed successfully!"

echo -e "\n${GREEN}=== Installation Summary ===${NC}"
echo "✓ Golang for Tools Compilation"
echo "✓ pipx package manager"
echo "✓ Security toolkit tools"
echo "✓ All dependencies installed"

print_status "Updating environment for user $REAL_USER"
sudo -u "$REAL_USER" bash -c "source $REAL_USER_HOME/.bashrc"
sudo -i -u "$REAL_USER" bash -l
source ~/.bashrc
print_status "Environment updated."
