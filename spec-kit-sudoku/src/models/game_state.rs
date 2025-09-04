use crate::models::Grid;

#[derive(Debug, Clone)]
pub struct GameState {
    pub grid: Grid,
    pub difficulty: String,
    pub is_complete: bool,
}

impl GameState {
    pub fn new(difficulty: String) -> Self {
        Self {
            grid: Grid::new(),
            difficulty,
            is_complete: false,
        }
    }
}
