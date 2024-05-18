"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDirectoryTree = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
// Function to generate directory tree with dashes and vertical bars
const generateDirectoryTree = (dir, prefix = '') => {
    const entries = (0, fs_1.readdirSync)(dir);
    let result = '';
    for (const entry of entries) {
        // Exclude 'node_modules' and '.git' directories
        if (entry === 'node_modules' || entry === '.git')
            continue;
        const fullPath = (0, path_1.join)(dir, entry);
        const stats = (0, fs_1.statSync)(fullPath);
        const isDirectory = stats.isDirectory();
        result += `${prefix}- ${entry}\n`;
        if (isDirectory) {
            result += (0, exports.generateDirectoryTree)(fullPath, `${prefix}|   `);
        }
    }
    return result;
};
exports.generateDirectoryTree = generateDirectoryTree;
// Generate directory structure from current directory
const directoryTree = (0, exports.generateDirectoryTree)(process.cwd());
// Command to copy to clipboard
const copyCommand = process.platform === 'win32' ? 'clip' : 'pbcopy';
// Execute the copy command
const child = (0, child_process_1.exec)(copyCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log('Directory structure copied to clipboard');
});
// Ensure stdin is not null before writing to it
(_b = (_a = child.stdin) === null || _a === void 0 ? void 0 : _a.write(directoryTree, 'utf-8', (err) => {
    var _a;
    if (err) {
        console.error(`stdin write error: ${err.message}`);
    }
    (_a = child.stdin) === null || _a === void 0 ? void 0 : _a.end();
})) !== null && _b !== void 0 ? _b : console.error('Failed to access stdin of the child process.');
