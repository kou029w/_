# Sudoku Game Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-09-04

## Active Technologies

### Language & Version
- **Rust 1.75+**: Primary development language
- **Cargo**: Package manager and build tool

### Dependencies
- **ratatui**: Terminal UI framework for grid display and input handling
- **clap**: Command-line argument parsing for CLI interface  
- **serde**: JSON serialization for save/load functionality
- **rand**: Random number generation for puzzle creation
- **anyhow**: Error handling and context
- **env_logger**: Debug logging during development

### Testing
- **cargo test**: Built-in Rust testing framework
- **Property-based testing**: For puzzle validation
- **Integration tests**: Full game flow validation

## Project Structure
```
src/
├── lib.rs               # sudoku-core library
├── models/              # game state, grid, cell models
├── services/            # puzzle generation, validation, I/O
├── cli/                 # terminal interface logic
└── main.rs              # application entry point

tests/
├── contract/            # API contract tests
├── integration/         # full game flow tests
└── unit/               # individual component tests

Cargo.toml              # Rust project configuration
```

## Commands

### Development
```bash
# Build and run
cargo build
cargo run -- new-game --difficulty easy

# Testing
cargo test                  # All tests
cargo test --lib          # Unit tests only
cargo test --test integration  # Integration tests

# Development with auto-reload
cargo watch -x "run -- new-game"
```

### Cargo Project Setup
```bash
# Initialize new Rust project
cargo init sudoku --lib
cd sudoku

# Add dependencies
cargo add ratatui clap serde rand anyhow env_logger
cargo add --dev proptest  # For property-based testing
```

## Code Style

### Rust Conventions
- Use `snake_case` for functions and variables
- Use `PascalCase` for types and structs
- Use `SCREAMING_SNAKE_CASE` for constants
- Prefer `Result<T, E>` for error handling
- Use `Option<T>` for nullable values
- Implement `Display` and `Debug` traits for public types

### Error Handling
```rust
use anyhow::{Context, Result};

fn load_game(path: &str) -> Result<GameState> {
    let data = std::fs::read_to_string(path)
        .with_context(|| format!("Failed to read save file: {}", path))?;
    // ...
    Ok(game_state)
}
```

### Testing Style
```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_grid_validation() {
        // Arrange
        let mut grid = Grid::new();
        
        // Act
        let result = grid.set_cell(0, 0, Some(5));
        
        // Assert
        assert!(result.is_ok());
        assert_eq!(grid.get_cell(0, 0).unwrap().value, Some(5));
    }
}
```

### Documentation
```rust
/// Represents a single cell in the Sudoku grid.
/// 
/// Each cell can contain a number 1-9 or be empty, and tracks whether
/// it's a given clue (immutable) or user-entered (modifiable).
#[derive(Debug, Clone, PartialEq)]
pub struct Cell {
    /// The cell's value: Some(1-9) or None if empty
    pub value: Option<u8>,
    /// True if this is a pre-filled clue, false if user-entered
    pub is_given: bool,
    /// Cached validation state for performance
    pub is_valid: bool,
}
```

## Recent Changes

### Feature 001-rust (2025-09-04)
- Added: Terminal-based Sudoku game application
- Technologies: Rust, ratatui, clap, serde
- Architecture: Single project with library + CLI binary structure  
- Features: 9x9 grid, puzzle generation, save/load, difficulty levels, hints
- Testing: TDD approach with contract, integration, and unit tests

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
