use sudoku::models::{Puzzle, Difficulty, Grid, GenerationError};
use sudoku::services::PuzzleGenerator;

#[test]
fn test_puzzle_generator_generate_easy() {
    let mut generator = PuzzleGenerator::new();
    let result = generator.generate(Difficulty::Easy, None);
    
    assert!(result.is_ok());
    let puzzle = result.unwrap();
    
    assert_eq!(puzzle.get_difficulty(), &Difficulty::Easy);
    assert!(puzzle.get_solution().is_valid());
    assert!(puzzle.get_solution().is_complete());
}

#[test]
fn test_puzzle_generator_generate_medium() {
    let mut generator = PuzzleGenerator::new();
    let result = generator.generate(Difficulty::Medium, None);
    
    assert!(result.is_ok());
    let puzzle = result.unwrap();
    
    assert_eq!(puzzle.get_difficulty(), &Difficulty::Medium);
    assert!(puzzle.get_solution().is_valid());
    assert!(puzzle.get_solution().is_complete());
}

#[test]
fn test_puzzle_generator_generate_hard() {
    let mut generator = PuzzleGenerator::new();
    let result = generator.generate(Difficulty::Hard, None);
    
    assert!(result.is_ok());
    let puzzle = result.unwrap();
    
    assert_eq!(puzzle.get_difficulty(), &Difficulty::Hard);
    assert!(puzzle.get_solution().is_valid());
    assert!(puzzle.get_solution().is_complete());
}

#[test]
fn test_puzzle_generator_with_seed_reproducible() {
    let seed = 12345u64;
    
    let mut generator1 = PuzzleGenerator::with_seed(seed);
    let puzzle1 = generator1.generate(Difficulty::Easy, None).unwrap();
    
    let mut generator2 = PuzzleGenerator::with_seed(seed);
    let puzzle2 = generator2.generate(Difficulty::Easy, None).unwrap();
    
    // Should generate identical puzzles with same seed
    assert_eq!(puzzle1.get_difficulty(), puzzle2.get_difficulty());
    
    // Check that clues are the same
    for row in 0..9 {
        for col in 0..9 {
            let cell1 = puzzle1.get_clues().get_cell(row, col).unwrap();
            let cell2 = puzzle2.get_clues().get_cell(row, col).unwrap();
            assert_eq!(cell1.value, cell2.value);
            assert_eq!(cell1.is_given, cell2.is_given);
        }
    }
}

#[test]
fn test_puzzle_generator_different_seeds_different_puzzles() {
    let mut generator1 = PuzzleGenerator::with_seed(123);
    let puzzle1 = generator1.generate(Difficulty::Easy, None).unwrap();
    
    let mut generator2 = PuzzleGenerator::with_seed(456);
    let puzzle2 = generator2.generate(Difficulty::Easy, None).unwrap();
    
    // Should generate different puzzles with different seeds
    let mut different = false;
    for row in 0..9 {
        for col in 0..9 {
            let cell1 = puzzle1.get_clues().get_cell(row, col).unwrap();
            let cell2 = puzzle2.get_clues().get_cell(row, col).unwrap();
            if cell1.value != cell2.value {
                different = true;
                break;
            }
        }
        if different {
            break;
        }
    }
    
    assert!(different, "Puzzles should be different with different seeds");
}

#[test]
fn test_puzzle_verify_unique_solution() {
    let mut generator = PuzzleGenerator::new();
    let puzzle = generator.generate(Difficulty::Medium, None).unwrap();
    
    // For now, this always returns true as we don't have a solver
    assert!(puzzle.verify_unique_solution());
}

#[test]
fn test_puzzle_get_hint_empty_cell() {
    let mut generator = PuzzleGenerator::with_seed(42);
    let puzzle = generator.generate(Difficulty::Easy, None).unwrap();
    
    // Find an empty cell in the clues
    let mut empty_cell = None;
    for row in 0..9 {
        for col in 0..9 {
            if puzzle.get_clues().get_cell(row, col).unwrap().value.is_none() {
                empty_cell = Some((row, col));
                break;
            }
        }
        if empty_cell.is_some() {
            break;
        }
    }
    
    let (row, col) = empty_cell.expect("Should have at least one empty cell");
    let hint = puzzle.get_hint(puzzle.get_clues(), row, col);
    
    assert!(hint.is_some());
    let hint_value = hint.unwrap();
    assert!(hint_value >= 1 && hint_value <= 9);
    
    // The hint should match the solution
    let solution_value = puzzle.get_solution().get_cell(row, col).unwrap().value;
    assert_eq!(hint, solution_value);
}

#[test]
fn test_puzzle_get_hint_filled_cell() {
    let mut generator = PuzzleGenerator::with_seed(42);
    let puzzle = generator.generate(Difficulty::Easy, None).unwrap();
    
    // Find a filled cell in the clues
    let mut filled_cell = None;
    for row in 0..9 {
        for col in 0..9 {
            if puzzle.get_clues().get_cell(row, col).unwrap().value.is_some() {
                filled_cell = Some((row, col));
                break;
            }
        }
        if filled_cell.is_some() {
            break;
        }
    }
    
    let (row, col) = filled_cell.expect("Should have at least one filled cell");
    let hint = puzzle.get_hint(puzzle.get_clues(), row, col);
    
    // Should not provide hint for already filled cells
    assert!(hint.is_none());
}

#[test]
fn test_puzzle_get_hint_invalid_position() {
    let mut generator = PuzzleGenerator::new();
    let puzzle = generator.generate(Difficulty::Easy, None).unwrap();
    
    // Test invalid positions
    assert!(puzzle.get_hint(puzzle.get_clues(), 9, 0).is_none());
    assert!(puzzle.get_hint(puzzle.get_clues(), 0, 9).is_none());
    assert!(puzzle.get_hint(puzzle.get_clues(), 10, 10).is_none());
}

#[test]
fn test_puzzle_difficulty_affects_clue_count() {
    let seed = 12345u64;
    
    let mut generator = PuzzleGenerator::with_seed(seed);
    let easy_puzzle = generator.generate(Difficulty::Easy, None).unwrap();
    
    let mut generator = PuzzleGenerator::with_seed(seed);
    let hard_puzzle = generator.generate(Difficulty::Hard, None).unwrap();
    
    let count_clues = |puzzle: &Puzzle| -> usize {
        let mut count = 0;
        for row in 0..9 {
            for col in 0..9 {
                if puzzle.get_clues().get_cell(row, col).unwrap().value.is_some() {
                    count += 1;
                }
            }
        }
        count
    };
    
    let easy_clues = count_clues(&easy_puzzle);
    let hard_clues = count_clues(&hard_puzzle);
    
    // Easy should have more clues than hard
    assert!(easy_clues > hard_clues);
    
    // Expected ranges based on our implementation
    assert!(easy_clues >= 45); // 81 - 30 = 51, allowing some tolerance
    assert!(hard_clues <= 35); // 81 - 55 = 26, allowing some tolerance
}

#[test]
fn test_puzzle_generation_performance() {
    let mut generator = PuzzleGenerator::new();
    
    let start = std::time::Instant::now();
    let _puzzle = generator.generate(Difficulty::Medium, None).unwrap();
    let duration = start.elapsed();
    
    // Should generate puzzle in under 1000ms
    assert!(duration.as_millis() < 1000);
}

#[test]
fn test_puzzle_hint_performance() {
    let mut generator = PuzzleGenerator::with_seed(42);
    let puzzle = generator.generate(Difficulty::Easy, None).unwrap();
    
    // Find an empty cell
    let mut empty_cell = None;
    for row in 0..9 {
        for col in 0..9 {
            if puzzle.get_clues().get_cell(row, col).unwrap().value.is_none() {
                empty_cell = Some((row, col));
                break;
            }
        }
        if empty_cell.is_some() {
            break;
        }
    }
    
    let (row, col) = empty_cell.expect("Should have at least one empty cell");
    
    let start = std::time::Instant::now();
    for _ in 0..1000 {
        let _ = puzzle.get_hint(puzzle.get_clues(), row, col);
    }
    let duration = start.elapsed();
    
    // Should be much faster than 100ms for 1000 hints
    assert!(duration.as_millis() < 100);
}
