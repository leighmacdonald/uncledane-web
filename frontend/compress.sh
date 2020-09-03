#!/bin/bash
mkdir -p dist/images
for f in src/public/images/*.png; do
	if [[ -f dist/images/${f##*/} ]]; then
		echo "Skipped ../dist/images/${f##*/}"
	else
		echo "Compressing src/public/images/${f##*/} -> dist/images/${f##*/}"
		pngquant --strip -skip-if-larger -o dist/images/"${f##*/}" "$f"
	fi
done

for f in src/public/images/*.gif; do
	if [[ -f dist/images/${f##*/} ]]; then
		echo "Skipped ../dist/images/${f##*/}"
	else
		echo "Copying src/public/images/${f##*/} -> dist/images/${f##*/}"
		cp -v "$f" dist/images/"${f##*/}"
	fi
done
