"""Generate responsive carousel WebPs. Run from the project root with Pillow installed."""

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/images/gallery"
OUTPUT = ROOT / "public/images/special-meals"
WIDTHS = (360, 720)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    totals = {width: 0 for width in WIDTHS}
    originals = sorted(SOURCE.glob("*.webp"))
    source_bytes = sum(path.stat().st_size for path in originals)

    for path in originals:
        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            for width in WIDTHS:
                height = round(image.height * width / image.width)
                resized = image.resize((width, height), Image.Resampling.LANCZOS)
                target = OUTPUT / f"{path.stem}-{width}.webp"
                resized.save(target, "WEBP", quality=78, method=6)
                totals[width] += target.stat().st_size

    print(f"{len(originals)} images; original collection: {source_bytes:,} bytes")
    for width, size in totals.items():
        print(f"{width}px collection: {size:,} bytes; {100 * (1 - size / source_bytes):.1f}% smaller")


if __name__ == "__main__":
    main()
