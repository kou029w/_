use clap::{Arg, Command};
use anyhow::Result;

fn main() -> Result<()> {
    env_logger::init();

    let matches = Command::new("sudoku")
        .version("1.0")
        .about("Terminal-based Sudoku game")
        .subcommand(
            Command::new("new-game")
                .about("Start a new Sudoku game")
                .arg(
                    Arg::new("difficulty")
                        .long("difficulty")
                        .value_parser(["easy", "medium", "hard"])
                        .default_value("medium")
                        .help("Game difficulty level")
                )
        )
        .get_matches();

    match matches.subcommand() {
        Some(("new-game", sub_matches)) => {
            let difficulty = sub_matches.get_one::<String>("difficulty").unwrap();
            println!("Starting new {} game...", difficulty);
            // TODO: Implement game logic
            Ok(())
        }
        _ => {
            println!("Use 'sudoku new-game' to start playing!");
            Ok(())
        }
    }
}
