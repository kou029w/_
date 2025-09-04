use crate::models::Grid;

pub struct Validator;

impl Validator {
    pub fn new() -> Self {
        Self
    }

    pub fn is_valid(&self, _grid: &Grid) -> bool {
        true
    }
}

impl Default for Validator {
    fn default() -> Self {
        Self::new()
    }
}
