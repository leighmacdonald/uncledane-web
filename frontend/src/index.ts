import './scss/foundation.scss';
import './scss/app.scss';
import 'foundation-sites/dist/js/plugins/foundation.core';
import 'foundation-sites/dist/js/plugins/foundation.smoothScroll';
import 'foundation-sites/dist/js/plugins/foundation.sticky';
import 'foundation-sites/dist/js/plugins/foundation.equalizer';
import 'foundation-sites/dist/js/plugins/foundation.tabs';
import 'foundation-sites/dist/js/plugins/foundation.dropdownMenu';
import 'foundation-sites/dist/js/plugins/foundation.util.keyboard';
import 'foundation-sites/dist/js/plugins/foundation.util.box';
import 'foundation-sites/dist/js/plugins/foundation.util.timer';
import 'foundation-sites/dist/js/plugins/foundation.util.imageLoader';
import 'foundation-sites/dist/js/plugins/foundation.util.touch';
import 'foundation-sites/dist/js/plugins/foundation.util.nest';
import 'foundation-sites/dist/js/plugins/foundation.util.mediaQuery';
import 'foundation-sites/dist/js/plugins/foundation.util.triggers';
import 'foundation-sites/dist/js/plugins/foundation.util.motion';
import 'foundation-sites/dist/js/plugins/foundation.responsiveMenu';
import 'foundation-sites/dist/js/plugins/foundation.responsiveToggle';
import $ from 'jquery'
import 'what-input'

// Bind window.jQuery ... dumb
globalThis.jQuery = $

function main() {
    $(document).foundation();
    const path = window.location.pathname.toLowerCase();
    switch (path) {
        case "/servers":
            init_servers()
            break
    }
}

document.addEventListener("DOMContentLoaded", main);

function server_click_handler(evt) {
    evt.preventDefault()
    const target = (<HTMLDivElement>(evt.currentTarget)).dataset.toggletarget
    document.getElementById(target).classList.toggle("hide")
}

function init_servers() {
    const elements = document.getElementsByClassName("server_info");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", server_click_handler);
    }
}