# Sudoku Game

A terminal-based Sudoku game written in Rust with ratatui for the user interface.

## Features

- 9x9 Sudoku grid with proper validation
- Multiple difficulty levels (Easy, Medium, Hard)
- Interactive terminal interface
- Save/load game functionality
- Hint system
- Undo/redo moves
- Timer tracking

## Installation

### Prerequisites

- Rust 1.75.0 or higher
- Cargo package manager

### Build from Source

```bash
git clone <repository-url>
cd sudoku
cargo build --release
```

## Usage

### Start a New Game

```bash
# Start with default (medium) difficulty
cargo run -- new-game

# Specify difficulty level
cargo run -- new-game --difficulty easy
cargo run -- new-game --difficulty medium
cargo run -- new-game --difficulty hard
```

### Game Controls

- **Arrow keys**: Navigate grid
- **1-9**: Enter number
- **Delete/Backspace**: Clear cell
- **H**: Get hint
- **U**: Undo move
- **R**: Redo move
- **S**: Save game
- **L**: Load game
- **Q**: Quit game

### Command Line Interface

```bash
# Create new game
sudoku new-game [--difficulty <LEVEL>]

# Load saved game
sudoku load-game <FILE>

# Generate puzzle only
sudoku generate --difficulty <LEVEL> --output <FILE>
```

## Development

### Running Tests

```bash
# Run all tests
cargo test

# Run specific test categories
cargo test --test contract     # API contract tests
cargo test --test integration  # Integration tests
cargo test --lib              # Unit tests only
```

### Code Formatting

```bash
# Format code
cargo fmt

# Check formatting
cargo fmt --check
```

### Linting

```bash
# Run clippy lints
cargo clippy

# Run clippy with all features
cargo clippy --all-features
```

### Development Mode

```bash
# Run with debug logging
RUST_LOG=debug cargo run -- new-game

# Watch for changes and rebuild
cargo watch -x "run -- new-game"
```

## Project Structure

```
src/
├── lib.rs               # Library root
├── main.rs              # CLI application entry
├── models/              # Core data structures
│   ├── cell.rs          # Individual cell logic
│   ├── grid.rs          # 9x9 game grid
│   └── game_state.rs    # Game session state
├── services/            # Business logic
│   ├── puzzle_generator.rs  # Puzzle creation
│   ├── validator.rs         # Rule validation
│   └── save_load.rs         # Persistence
└── cli/                 # Terminal interface
    ├── ui.rs            # ratatui components
    ├── input.rs         # Keyboard handling
    └── game_loop.rs     # Main game loop

tests/
├── contract/            # API contract tests
├── integration/         # End-to-end tests
└── unit/               # Component tests
```

## Performance

- Grid validation: < 1ms per operation
- Puzzle generation: < 1000ms guaranteed
- Hint calculation: < 100ms typical
- Memory usage: < 10KB per game state

## Contributing

1. Fork the repository
2. Create a feature branch
3. Run tests: `cargo test`
4. Format code: `cargo fmt`
5. Check lints: `cargo clippy`
6. Submit pull request

## License

[Add license information]

## Troubleshooting

### Common Issues

**Game won't start:**
- Ensure Rust 1.75.0+ is installed
- Try rebuilding: `cargo clean && cargo build`

**Terminal display issues:**
- Ensure terminal supports ANSI colors
- Try different terminal emulator
- Check terminal size (minimum 80x24)

**Save/load problems:**
- Check file permissions
- Ensure save directory exists
- Verify file format (JSON)
