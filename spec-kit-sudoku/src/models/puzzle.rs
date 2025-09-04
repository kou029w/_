use crate::models::{Grid, GenerationError};
use std::collections::HashSet;

#[derive(Debug, Clone, PartialEq)]
pub enum Difficulty {
    Easy,
    Medium,
    Hard,
}

#[derive(Debug, Clone)]
pub struct Puzzle {
    solution: Grid,
    clues: Grid,
    difficulty: Difficulty,
}

impl Puzzle {
    pub fn new(solution: Grid, clues: Grid, difficulty: Difficulty) -> Self {
        Self {
            solution,
            clues,
            difficulty,
        }
    }

    pub fn get_solution(&self) -> &Grid {
        &self.solution
    }

    pub fn get_clues(&self) -> &Grid {
        &self.clues
    }

    pub fn get_difficulty(&self) -> &Difficulty {
        &self.difficulty
    }

    pub fn verify_unique_solution(&self) -> bool {
        // For now, assume all puzzles have unique solutions
        // This would need a proper solver implementation
        true
    }

    pub fn get_hint(&self, grid: &Grid, row: usize, col: usize) -> Option<u8> {
        if row >= 9 || col >= 9 {
            return None;
        }

        // If cell is already filled, no hint needed
        if let Ok(cell) = grid.get_cell(row, col) {
            if cell.value.is_some() {
                return None;
            }
        } else {
            return None;
        }

        // Return the solution value as hint
        if let Ok(solution_cell) = self.solution.get_cell(row, col) {
            solution_cell.value
        } else {
            None
        }
    }
}
