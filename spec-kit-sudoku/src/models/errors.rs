use std::fmt;

#[derive(Debug, Clone, PartialEq)]
pub enum GameError {
    InvalidPosition { row: usize, col: usize },
    CellLocked { row: usize, col: usize },
    RuleViolation { conflict_type: ConflictType, positions: Vec<(usize, usize)> },
    NoMovesToUndo,
    NoMovesToRedo,
}

#[derive(Debug, Clone, PartialEq)]
pub enum GenerationError {
    GenerationFailed { attempts: u32 },
    InvalidSeed { seed: u64 },
    TimeoutExceeded,
}

#[derive(Debug, Clone, PartialEq)]
pub enum SerializationError {
    InvalidFormat { field: String },
    VersionMismatch { expected: String, found: String },
    DataCorruption { details: String },
}

#[derive(Debug, Clone, PartialEq)]
pub enum ConflictType {
    Row,
    Column,
    Box,
}

#[derive(Debug, Clone, PartialEq)]
pub struct ValidationResult {
    pub is_valid: bool,
    pub conflicts: Vec<Conflict>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Conflict {
    pub conflict_type: ConflictType,
    pub positions: Vec<(usize, usize)>,
}

impl fmt::Display for GameError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            GameError::InvalidPosition { row, col } => {
                write!(f, "Invalid position: row {}, col {}", row, col)
            }
            GameError::CellLocked { row, col } => {
                write!(f, "Cell is locked at row {}, col {}", row, col)
            }
            GameError::RuleViolation { conflict_type, positions } => {
                write!(f, "Rule violation: {:?} at positions {:?}", conflict_type, positions)
            }
            GameError::NoMovesToUndo => write!(f, "No moves to undo"),
            GameError::NoMovesToRedo => write!(f, "No moves to redo"),
        }
    }
}

impl std::error::Error for GameError {}

impl fmt::Display for GenerationError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            GenerationError::GenerationFailed { attempts } => {
                write!(f, "Generation failed after {} attempts", attempts)
            }
            GenerationError::InvalidSeed { seed } => write!(f, "Invalid seed: {}", seed),
            GenerationError::TimeoutExceeded => write!(f, "Puzzle generation timeout exceeded"),
        }
    }
}

impl std::error::Error for GenerationError {}

impl fmt::Display for SerializationError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            SerializationError::InvalidFormat { field } => {
                write!(f, "Invalid format in field: {}", field)
            }
            SerializationError::VersionMismatch { expected, found } => {
                write!(f, "Version mismatch: expected {}, found {}", expected, found)
            }
            SerializationError::DataCorruption { details } => {
                write!(f, "Data corruption: {}", details)
            }
        }
    }
}

impl std::error::Error for SerializationError {}
