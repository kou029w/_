use sudoku::models::{Grid, GameError, ConflictType};

#[test]
fn test_grid_new() {
    let grid = Grid::new();
    
    // All cells should be empty
    for row in 0..9 {
        for col in 0..9 {
            let cell = grid.get_cell(row, col).unwrap();
            assert_eq!(cell.value, None);
            assert!(!cell.is_given);
            assert!(cell.is_valid);
        }
    }
}

#[test]
fn test_grid_from_array_valid() {
    let mut cells = [[None; 9]; 9];
    cells[0][0] = Some(1);
    cells[0][1] = Some(2);
    cells[1][0] = Some(3);
    
    let result = Grid::from_array(cells);
    assert!(result.is_ok());
    
    let grid = result.unwrap();
    assert_eq!(grid.get_cell(0, 0).unwrap().value, Some(1));
    assert_eq!(grid.get_cell(0, 1).unwrap().value, Some(2));
    assert_eq!(grid.get_cell(1, 0).unwrap().value, Some(3));
}

#[test]
fn test_grid_from_array_invalid_value() {
    let mut cells = [[None; 9]; 9];
    cells[0][0] = Some(10); // Invalid value
    
    let result = Grid::from_array(cells);
    assert!(result.is_err());
}

#[test]
fn test_grid_from_array_duplicate_value() {
    let mut cells = [[None; 9]; 9];
    cells[0][0] = Some(1);
    cells[0][1] = Some(1); // Duplicate in same row
    
    let result = Grid::from_array(cells);
    assert!(result.is_err());
}

#[test]
fn test_grid_set_cell_valid() {
    let mut grid = Grid::new();
    
    let result = grid.set_cell(0, 0, Some(5));
    assert!(result.is_ok());
    
    let cell = grid.get_cell(0, 0).unwrap();
    assert_eq!(cell.value, Some(5));
    assert!(!cell.is_given);
}

#[test]
fn test_grid_set_cell_invalid_position() {
    let mut grid = Grid::new();
    
    let result = grid.set_cell(9, 0, Some(1));
    assert!(matches!(result, Err(GameError::InvalidPosition { row: 9, col: 0 })));
    
    let result = grid.set_cell(0, 9, Some(1));
    assert!(matches!(result, Err(GameError::InvalidPosition { row: 0, col: 9 })));
}

#[test]
fn test_grid_set_cell_locked() {
    let mut cells = [[None; 9]; 9];
    cells[0][0] = Some(1);
    let mut grid = Grid::from_array(cells).unwrap();
    
    // Mark as given (locked)
    grid.get_cell_mut(0, 0).unwrap().is_given = true;
    
    let result = grid.set_cell(0, 0, Some(2));
    assert!(matches!(result, Err(GameError::CellLocked { row: 0, col: 0 })));
}

#[test]
fn test_grid_set_cell_rule_violation_row() {
    let mut grid = Grid::new();
    grid.set_cell(0, 0, Some(1)).unwrap();
    
    let result = grid.set_cell(0, 1, Some(1)); // Same row, same value
    assert!(matches!(
        result,
        Err(GameError::RuleViolation { 
            conflict_type: ConflictType::Row, 
            positions 
        }) if positions.contains(&(0, 0))
    ));
}

#[test]
fn test_grid_set_cell_rule_violation_column() {
    let mut grid = Grid::new();
    grid.set_cell(0, 0, Some(1)).unwrap();
    
    let result = grid.set_cell(1, 0, Some(1)); // Same column, same value
    assert!(matches!(
        result,
        Err(GameError::RuleViolation { 
            conflict_type: ConflictType::Column, 
            positions 
        }) if positions.contains(&(0, 0))
    ));
}

#[test]
fn test_grid_set_cell_rule_violation_box() {
    let mut grid = Grid::new();
    grid.set_cell(0, 0, Some(1)).unwrap();
    
    let result = grid.set_cell(1, 1, Some(1)); // Same 3x3 box, same value
    assert!(matches!(
        result,
        Err(GameError::RuleViolation { 
            conflict_type: ConflictType::Box, 
            positions 
        }) if positions.contains(&(0, 0))
    ));
}

#[test]
fn test_grid_get_cell() {
    let mut grid = Grid::new();
    grid.set_cell(4, 5, Some(7)).unwrap();
    
    let cell = grid.get_cell(4, 5).unwrap();
    assert_eq!(cell.value, Some(7));
}

#[test]
fn test_grid_get_cell_invalid_position() {
    let grid = Grid::new();
    
    let result = grid.get_cell(9, 0);
    assert!(matches!(result, Err(GameError::InvalidPosition { row: 9, col: 0 })));
    
    let result = grid.get_cell(0, 9);
    assert!(matches!(result, Err(GameError::InvalidPosition { row: 0, col: 9 })));
}

#[test]
fn test_grid_is_valid_empty() {
    let grid = Grid::new();
    assert!(grid.is_valid());
}

#[test]
fn test_grid_is_valid_partial() {
    let mut grid = Grid::new();
    grid.set_cell(0, 0, Some(1)).unwrap();
    grid.set_cell(0, 1, Some(2)).unwrap();
    grid.set_cell(1, 0, Some(3)).unwrap();
    
    assert!(grid.is_valid());
}

#[test]
fn test_grid_is_invalid() {
    let mut cells = [[None; 9]; 9];
    cells[0][0] = Some(1);
    cells[0][1] = Some(1); // Duplicate in row
    
    // Create grid bypassing validation for testing
    let grid = Grid::new_unchecked(cells);
    assert!(!grid.is_valid());
}

#[test]
fn test_grid_is_complete_empty() {
    let grid = Grid::new();
    assert!(!grid.is_complete());
}

#[test]
fn test_grid_is_complete_partial() {
    let mut grid = Grid::new();
    grid.set_cell(0, 0, Some(1)).unwrap();
    assert!(!grid.is_complete());
}

#[test]
fn test_grid_is_complete_full() {
    // Create a valid complete sudoku
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
    
    let grid = Grid::from_array(cells).unwrap();
    assert!(grid.is_complete());
    assert!(grid.is_valid());
}

#[test]
fn test_grid_performance_cell_access() {
    let grid = Grid::new();
    
    let start = std::time::Instant::now();
    for _ in 0..10000 {
        let _ = grid.get_cell(4, 4).unwrap();
    }
    let duration = start.elapsed();
    
    // Should be much faster than 1ms for 10000 operations
    assert!(duration.as_millis() < 10);
}

#[test]
fn test_grid_performance_validation() {
    let mut grid = Grid::new();
    
    // Set up a valid partial grid (avoiding conflicts)
    grid.set_cell(0, 0, Some(1)).unwrap();
    grid.set_cell(1, 1, Some(2)).unwrap();
    grid.set_cell(2, 2, Some(3)).unwrap();
    grid.set_cell(3, 3, Some(4)).unwrap();
    grid.set_cell(4, 4, Some(5)).unwrap();
    
    let start = std::time::Instant::now();
    for _ in 0..1000 {
        let _ = grid.is_valid();
    }
    let duration = start.elapsed();
    
    // Should be much faster than 1ms per validation
    assert!(duration.as_millis() < 100);
}
