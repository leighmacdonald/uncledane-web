# [uncledane.com](https://uncledane.com/)

## Configure

Copy the `config_example.yml` to `config.yml`. You should only need
to edit the TF2 server details normally.


## Dev

To build the binary:

    make

Watch and compile frontend assets:
    
    make watch
    
Run the HTTP application server:

    make run

## Docker

The docker image uses a 3 stage build system. 2 Build stages, one for frontend (JS/CSS/etc.) and the other for
the go backend. The compiled binaries and assets are then copied to the final image. 

The videos folder (not included in this repo), should be mounted in the container under /app/frontend/dist/videos


To build the image `leighmacdonald/uncledane-web` run:

    make image

To run the image:

    make run_image
    
Or

    docker run --rm -p 8003:8003 -v "$(pwd)/config.yaml:/app/config.yaml" -v "$(pwd)/videos:/app/frontend/dist/videos" leighmacdonald/uncledane-web:latest
