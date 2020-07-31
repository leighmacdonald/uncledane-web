import './scss/foundation.scss';
import './scss/app.scss';
import 'foundation-sites/dist/js/plugins/foundation.core';
import 'foundation-sites/dist/js/plugins/foundation.smoothScroll';
import 'foundation-sites/dist/js/plugins/foundation.equalizer';
import 'foundation-sites/dist/js/plugins/foundation.dropdownMenu';
import 'foundation-sites/dist/js/plugins/foundation.util.keyboard';
import 'foundation-sites/dist/js/plugins/foundation.util.mediaQuery';
import 'foundation-sites/dist/js/plugins/foundation.util.triggers';
import 'foundation-sites/dist/js/plugins/foundation.responsiveMenu';
import 'foundation-sites/dist/js/plugins/foundation.responsiveToggle';
import $ from 'jquery'
import 'what-input'

// Bind window.jQuery ... dumb
globalThis.jQuery = $

function main() {
    $(document).foundation();
    eureka();
    // Dumb "router"
    switch (window.location.pathname.toLowerCase()) {
        case "/servers":
            init_servers()
            break
    }
}

function server_click_handler(evt) {
    const target = (<HTMLDivElement>(evt.currentTarget)).dataset.toggletarget
    if (target != "") {
        document.getElementById(target).classList.toggle("hide")
    } else {
        evt.preventDefault()
    }
}

function init_servers() {
    const elements = document.getElementsByClassName("server_info");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", server_click_handler);
    }
}

function eureka() {
    console.log(`oooo/hMd++oooooooooooooooooooooooooo+oMmoyyyyyyyyyyyyyyyyyyoMM:ssssssssssssssssssssss/yMmosyssssssss`)
    console.log(`ooooo++mMh/oooooooooooooooooooooooooo:mMssyyyyyyyyyyyyyyyysyMy+sssssssssssssssssssso/mMhoyssssssssss`)
    console.log(`ooooooo/sMNs/oooooooooooooooooooooooo++MNoyyyyyyyyyyyyyyyyoNM/ssssssssssssssssssss/sMNssysssssssssss`)
    console.log(`ooooooooo/hMm++ooooooooooooooooooooooo/dMysyyyyyyyyyyyyyysyMh/sssssssssssssssssso/hMdossssssssssssss`)
    console.log(`oooooooooo++dMh/+ooooooooooooooooooooo+/MNoyyyyyyyyyyyyyyoNM/ssssssssssssssssss++NMhoyssssssssssssss`)
    console.log(`oooooooooooo/yNNs/ooooooooooooooooooooo/hMhsyyyyyyyyyyyyssMm/sssssssssssssssss/sNNssysssssssssssssss`)
    console.log(`oooooooooooooo/hMmo+oooooooooooooooooooo/MMoyyyyyyyyyyyyomM+ossssssssssssssso/dMdossssssssssssssssss`)
    console.log(`ooooooooooooooo++mMh/+oooooooooooooooooo/sMdoyyyyyyyyyyysMm/sssssssssssssss++NNyssssssssssssssssssss`)
    console.log(`ooooooooooooooooo+oNNs/+ooooooooooooooooo/NMoyyyyyyyyyyomM+ossssssssssssss/yMmssysssssssssssssssssss`)
    console.log(`ooooooooooooooooooo+hMm++oooooooooooooooo+oMmoyyyyyyyyyoMN:ssssssssssssso/dMhossssssssssssssssssssss`)
    console.log(`oooooooooooooooooooo++dNh++ooooooooooooooo:mMssyyyyyyyodMo+ssssssssssss+oNNysyssssssssssssssssssssss`)
    console.log(`oooooooooooooooooooooo/sNNs/+ooooooooooooo+oMNyddhhhhhymNshyssssssssss/yMmssyssssssssssssssssssssyss`)
    console.log(`oooooooooooooooooooooooo/yMmo+ooooooosyyyyyoo/:--....\`...-:+ydhssssso+mMhossssssssssssssssssssyssydN`)
    console.log(`ooooooooooooooooooooooooo+omMh++oooody:-.\`                   ./myss+oNNssysssssssssssssssssyssshmMMM`)
    console.log(`mho+ooooooooooooooooooooooo/oNNs/++dy                          smo/hMmosysssssssssssssssssssymMMMMMM`)
    console.log(`MMMmds+oooooooooooooooooooooo+hNm++ds                          -M+mMhosssssssssssssssssssydNMMMMMMMM`)
    console.log(`MMMMMMNds+oooooooooooooooooooo++mMhyh                \`\`\`\`\`\`\`\`\` \`/+osyhhhhysssssssssysssdNMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMds+oooooooooooooooosyhyho/:\`\`\`...----::::::::::::::::::------:hmsssssssssshmMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMdy+ooooooooooshhy/-\`\`.-:://///////////////////////////////+yNsssssssydMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMdyo+oooooomd--::///////////////////++++++++++++/////+ydNNysssssdNMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMmy++ooosdNdyo+//////+++oosssyyhhdddhssys+++++/sdNNNmdhssshmMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMmho+oydmNNMMmdhshddddmmmmmmmmmmmNy+NNmdhhyydNdhyyssymMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMNho+oshMmmmmmmmmmmmmmmmmmmmmmdhohso+:mMNNysssydNMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMdyyMmmmmmmmmmdmmmmmmmmmmNysss\`   /MmhsshNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNmmmmmmmm:dNmmmmmmmNhssss+   -MohmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmmmmNNd/:syddddddysssssss-  .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNo..+ssss+:\` \`-+sssss+\`   hMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMm\`  \`--.        \`/+-      .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMs    \`\`...\`\`               oMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMo  \`:+oooooo+.            oNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMo   \`\`\`\`\`\` \`            .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM+                        -MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh                      :mNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.                    -NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh                 \` \`NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMy\`              .dydMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh.            /mMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNo.        .yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNy/..-/shNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
    console.log(`MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM`)
}

// Do stuff.
document.addEventListener("DOMContentLoaded", main);