use crate::models::GameState;
use anyhow::Result;

pub struct SaveLoad;

impl SaveLoad {
    pub fn new() -> Self {
        Self
    }

    pub fn save(&self, _game_state: &GameState, _path: &str) -> Result<()> {
        Ok(())
    }

    pub fn load(&self, _path: &str) -> Result<GameState> {
        Ok(GameState::new("medium".to_string()))
    }
}

impl Default for SaveLoad {
    fn default() -> Self {
        Self::new()
    }
}
