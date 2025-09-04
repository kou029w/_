use crate::models::{Grid, Puzzle, Difficulty, GenerationError};
use rand::{Rng, SeedableRng};
use rand::rngs::StdRng;

pub struct PuzzleGenerator {
    seed: Option<u64>,
}

impl PuzzleGenerator {
    pub fn new() -> Self {
        Self {
            seed: None,
        }
    }

    pub fn with_seed(seed: u64) -> Self {
        Self {
            seed: Some(seed),
        }
    }

    pub fn generate(&mut self, difficulty: Difficulty, seed: Option<u64>) -> Result<Puzzle, GenerationError> {
        let final_seed = seed.or(self.seed).unwrap_or_else(|| {
            use std::time::{SystemTime, UNIX_EPOCH};
            SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs()
        });

        // Generate a complete valid solution
        let solution = self.generate_complete_solution()?;
        
        // Create clues by removing cells based on difficulty
        let clues = self.create_clues(&solution, &difficulty, final_seed)?;

        Ok(Puzzle::new(solution, clues, difficulty))
    }

    fn generate_complete_solution(&self) -> Result<Grid, GenerationError> {
        // For now, return a hardcoded valid solution
        // In a real implementation, this would use a proper generation algorithm
        let cells = [
            [Some(5), Some(3), Some(4), Some(6), Some(7), Some(8), Some(9), Some(1), Some(2)],
            [Some(6), Some(7), Some(2), Some(1), Some(9), Some(5), Some(3), Some(4), Some(8)],
            [Some(1), Some(9), Some(8), Some(3), Some(4), Some(2), Some(5), Some(6), Some(7)],
            [Some(8), Some(5), Some(9), Some(7), Some(6), Some(1), Some(4), Some(2), Some(3)],
            [Some(4), Some(2), Some(6), Some(8), Some(5), Some(3), Some(7), Some(9), Some(1)],
            [Some(7), Some(1), Some(3), Some(9), Some(2), Some(4), Some(8), Some(5), Some(6)],
            [Some(9), Some(6), Some(1), Some(5), Some(3), Some(7), Some(2), Some(8), Some(4)],
            [Some(2), Some(8), Some(7), Some(4), Some(1), Some(9), Some(6), Some(3), Some(5)],
            [Some(3), Some(4), Some(5), Some(2), Some(8), Some(6), Some(1), Some(7), Some(9)],
        ];

        Grid::from_array(cells).map_err(|_| GenerationError::GenerationFailed { attempts: 1 })
    }

    fn create_clues(&self, solution: &Grid, difficulty: &Difficulty, seed: u64) -> Result<Grid, GenerationError> {
        let cells_to_remove = match difficulty {
            Difficulty::Easy => 30,    // Remove 30 cells (leave 51 clues)
            Difficulty::Medium => 45,  // Remove 45 cells (leave 36 clues)
            Difficulty::Hard => 55,    // Remove 55 cells (leave 26 clues)
        };

        let mut rng = StdRng::seed_from_u64(seed);
        let mut clues = solution.clone();
        let mut removed = 0;

        // Randomly remove cells
        while removed < cells_to_remove {
            let row = rng.gen_range(0..9);
            let col = rng.gen_range(0..9);

            if clues.get_cell(row, col).unwrap().value.is_some() {
                clues.get_cell_mut(row, col).unwrap().value = None;
                removed += 1;
            }
        }

        // Mark remaining cells as given
        for row in 0..9 {
            for col in 0..9 {
                if let Ok(cell) = clues.get_cell_mut(row, col) {
                    if cell.value.is_some() {
                        cell.is_given = true;
                    }
                }
            }
        }

        Ok(clues)
    }
}

impl Default for PuzzleGenerator {
    fn default() -> Self {
        Self::new()
    }
}
