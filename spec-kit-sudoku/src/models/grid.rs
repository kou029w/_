use crate::models::{Cell, GameError, ConflictType, Conflict};

#[derive(Debug, Clone)]
pub struct Grid {
    cells: [[Cell; 9]; 9],
}

impl Grid {
    pub fn new() -> Self {
        Self {
            cells: [[Cell::default(); 9]; 9],
        }
    }

    pub fn from_array(cells: [[Option<u8>; 9]; 9]) -> Result<Self, GameError> {
        // Validate all values first
        for row in 0..9 {
            for col in 0..9 {
                if let Some(value) = cells[row][col] {
                    if value == 0 || value > 9 {
                        return Err(GameError::RuleViolation {
                            conflict_type: ConflictType::Row,
                            positions: vec![(row, col)],
                        });
                    }
                }
            }
        }

        let mut grid_cells = [[Cell::default(); 9]; 9];
        for row in 0..9 {
            for col in 0..9 {
                grid_cells[row][col] = Cell {
                    value: cells[row][col],
                    is_given: cells[row][col].is_some(),
                    is_valid: true,
                };
            }
        }

        let grid = Self {
            cells: grid_cells,
        };

        // Validate sudoku rules
        if !grid.is_valid() {
            return Err(GameError::RuleViolation {
                conflict_type: ConflictType::Row,
                positions: Vec::new(),
            });
        }

        Ok(grid)
    }

    pub fn new_unchecked(cells: [[Option<u8>; 9]; 9]) -> Self {
        let mut grid_cells = [[Cell::default(); 9]; 9];
        for row in 0..9 {
            for col in 0..9 {
                grid_cells[row][col] = Cell {
                    value: cells[row][col],
                    is_given: cells[row][col].is_some(),
                    is_valid: true,
                };
            }
        }

        Self {
            cells: grid_cells,
        }
    }

    pub fn get_cell(&self, row: usize, col: usize) -> Result<&Cell, GameError> {
        if row >= 9 || col >= 9 {
            return Err(GameError::InvalidPosition { row, col });
        }
        Ok(&self.cells[row][col])
    }

    pub fn get_cell_mut(&mut self, row: usize, col: usize) -> Result<&mut Cell, GameError> {
        if row >= 9 || col >= 9 {
            return Err(GameError::InvalidPosition { row, col });
        }
        Ok(&mut self.cells[row][col])
    }

    pub fn set_cell(&mut self, row: usize, col: usize, value: Option<u8>) -> Result<(), GameError> {
        if row >= 9 || col >= 9 {
            return Err(GameError::InvalidPosition { row, col });
        }

        if self.cells[row][col].is_given {
            return Err(GameError::CellLocked { row, col });
        }

        if let Some(val) = value {
            if val == 0 || val > 9 {
                return Err(GameError::RuleViolation {
                    conflict_type: ConflictType::Row,
                    positions: vec![(row, col)],
                });
            }

            // Check for rule violations before setting
            if let Some(conflict) = self.check_conflicts(row, col, val) {
                return Err(GameError::RuleViolation {
                    conflict_type: conflict.conflict_type,
                    positions: conflict.positions,
                });
            }
        }

        self.cells[row][col].value = value;
        Ok(())
    }

    pub fn is_valid(&self) -> bool {
        // Check all cells for conflicts
        for row in 0..9 {
            for col in 0..9 {
                if let Some(value) = self.cells[row][col].value {
                    if self.has_conflict(row, col, value) {
                        return false;
                    }
                }
            }
        }
        true
    }

    pub fn is_complete(&self) -> bool {
        for row in 0..9 {
            for col in 0..9 {
                if self.cells[row][col].value.is_none() {
                    return false;
                }
            }
        }
        true
    }

    fn check_conflicts(&self, row: usize, col: usize, value: u8) -> Option<Conflict> {
        // Check row conflicts
        for c in 0..9 {
            if c != col && self.cells[row][c].value == Some(value) {
                return Some(Conflict {
                    conflict_type: ConflictType::Row,
                    positions: vec![(row, c)],
                });
            }
        }

        // Check column conflicts
        for r in 0..9 {
            if r != row && self.cells[r][col].value == Some(value) {
                return Some(Conflict {
                    conflict_type: ConflictType::Column,
                    positions: vec![(r, col)],
                });
            }
        }

        // Check 3x3 box conflicts
        let box_row = (row / 3) * 3;
        let box_col = (col / 3) * 3;

        for r in box_row..box_row + 3 {
            for c in box_col..box_col + 3 {
                if (r != row || c != col) && self.cells[r][c].value == Some(value) {
                    return Some(Conflict {
                        conflict_type: ConflictType::Box,
                        positions: vec![(r, c)],
                    });
                }
            }
        }

        None
    }

    fn has_conflict(&self, row: usize, col: usize, value: u8) -> bool {
        self.check_conflicts(row, col, value).is_some()
    }
}

impl Default for Grid {
    fn default() -> Self {
        Self::new()
    }
}
