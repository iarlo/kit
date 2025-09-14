# 😺 keep it trivial

A simple CLI tool designed to simplify common and repetitive git commands.

## Installation & Setup

This project is built with TypeScript. To get started, you'll need Node.js and npm.

- **Install globally with npm:**

  ```bash
  npm install -g @briadsa/kit
  ```

## Commands

Here is a list of all available commands and what they do.

| Command          | Alias   | Description                                                         | Usage Example                          |
| :--------------- | :------ | :------------------------------------------------------------------ | :------------------------------------- |
| `init`           | `start` | Initializes a git repository in the current directory               | `kit init`                             |
| `branch [name]`  | `br`    | Shows current branch or switches/creates a new one                  | `kit branch <new-branch>`              |
| `delete <name>`  | `del`   | Deletes a local branch                                              | `kit delete <old-branch>`              |
| `feature <name>` | `feat`  | Creates a new feature branch                                        | `kit feature <my-feat> --from develop` |
| `sync`           |         | Syncs the current branch with its `upstream` counterpart via rebase | `kit sync`                             |
| `prune`          |         | Removes local branches whose remote version has been deleted        | `kit prune`                            |
| `undo`           |         | Undoes the last local commit keeping all changes staged (`--soft`)  | `kit undo`                             |
| `fixup`          | `fu`    | Adds all current file changes to the most recent commit             | `kit fixup`                            |
| `reword "<msg>"` | `rw`    | Changes the message of the most recent commit                       | `kit reword "A better commit message"` |
| `status`         | `st`    | Shows the git status                                                | `kit status`                           |
| `version`        |         | Shows the KIT's version                                             | `kit version`                          |
