#!/usr/bin/env -S cargo -Zscript -q
---
[dependencies]
clap = { version = "4.5.53", features = ["derive"] }
---

use clap::Parser;

#[derive(Parser)]
struct Args {
    #[arg(short, long)]
    name: String,
    #[arg(short, long, default_value_t = 1)]
    count: u8,
}

fn main() {
    let args = Args::parse();

    for _ in 0..args.count {
        println!("Hello {}!", args.name);
    }
}
