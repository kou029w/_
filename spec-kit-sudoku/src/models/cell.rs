#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Cell {
    pub value: Option<u8>,
    pub is_given: bool,
    pub is_valid: bool,
}

impl Cell {
    pub fn new() -> Self {
        Self {
            value: None,
            is_given: false,
            is_valid: true,
        }
    }
}

impl Default for Cell {
    fn default() -> Self {
        Self::new()
    }
}
