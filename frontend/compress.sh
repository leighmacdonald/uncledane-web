#!/bin/bash
mkdir -p dist/images dist/dl
for f in src/public/dl/*.zip; do
	if [[ -f dist/dl/${f##*/} ]]; then
		echo "Skipped ../dist/dl/${f##*/}"
	else
		echo "Copying src/public/dl/${f##*/} -> dist/dl/${f##*/}"
		cp -v "$f" dist/dl/"${f##*/}"
	fi
done

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

for f in src/public/images/*.webm; do
	if [[ -f dist/images/${f##*/} ]]; then
		echo "Skipped ../dist/images/${f##*/}"
	else
		echo "Copying src/public/images/${f##*/} -> dist/images/${f##*/}"
		cp -v "$f" dist/images/"${f##*/}"
	fi
done

for f in src/public/images/*.webmanifest; do
	if [[ -f dist/images/${f##*/} ]]; then
		echo "Skipped ../dist/images/${f##*/}"
	else
		echo "Copying src/public/images/${f##*/} -> dist/images/${f##*/}"
		cp -v "$f" dist/images/"${f##*/}"
	fi
done
