use cairo::{Context, Format, ImageSurface};
use clap::Parser;
use image::codecs::webp::WebPEncoder;
use image::ExtendedColorType;
use poppler::Document;
use std::fs;
use std::fs::File;
use url::Url;

#[derive(Parser, Debug)]
#[command(version)]
struct Args {
    #[arg(short, long, env, default_value = "target/note/note.pdf", value_parser = canonicalize)]
    input: String,

    #[arg(short, long, env, default_value = "target/output")]
    output: String,
}

fn canonicalize(arg: &str) -> Result<String, std::io::Error> {
    let path = fs::canonicalize(arg)?.to_string_lossy().into_owned();
    Ok(path)
}

fn main() {
    let args = Args::parse();
    let input = args.input;
    let output = args.output;
    let input_uri = Url::parse(format!("file://{input}").as_str())
        .unwrap()
        .to_string();

    let document = Document::from_file(&input_uri, None).unwrap();

    for i in 0..document.n_pages() {
        let page = document.page(i).unwrap();
        let (width, height) = page.size();
        let output_file = File::create(format!("{output}-{i}.webp")).unwrap();
        let surface = ImageSurface::create(Format::Rgb24, width as i32, height as i32).unwrap();
        let context = Context::new(&surface).unwrap();

        context.set_source_rgb(1., 1., 1.);
        context.paint().unwrap();
        page.render(&context);

        drop(context);

        let data = surface.take_data().unwrap();
        let encoder = WebPEncoder::new_lossless(output_file);

        encoder
            .encode(&data, width as u32, height as u32, ExtendedColorType::Rgba8)
            .unwrap();
    }
}
