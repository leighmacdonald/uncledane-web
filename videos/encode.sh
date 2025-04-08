#!/usr/bin/env bash
# When ran, encodes all the mp4 files in the current directory.
#
# This is used to populate the videos folder with the required files.


for filename in *.mp4; do
    # WebM
    # ffmpeg -i "$filename" -c:v libvpx -crf 10 -b:v 12M -c:a libvorbis webm/`basename $filename .mp4`.webm

    # mp4
    ffmpeg -i "$filename" -vcodec libx264 -f mp4 -vb 8M -preset slow mp4/$filename
done
