import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss',
    '../../../../assets/plugins/bootstrap/css/bootstrap.min.css',
    '../../../../assets/plugins/prism/prism.css',
    "../../../../assets/plugins/lightbox/dist/ekko-lightbox.css",
    "../../../../assets/plugins/elegant_font/css/style.css",
    "../../../../assets/sass/scss/core/_header.scss",
    "../../../../assets/sass/scss/core/_responsive.scss",
    "../../../../assets/sass/scss/bootstrap/mixins/_buttons.scss",
    "../../../../assets/vendor/pace/themes/blue/pace-theme-minimal.css",
    "../../../../assets/css/styles.css",
    "../../../../assets/sass/scss/_dark-theme.scss"]
})

export class NavbarComponent implements OnInit{

    constructor(public sidebarservice: SidebarService) { }
        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {

        /* Search Bar */
        $(document).ready(function () {
            $(".mobile-search-icon").on("click", function () {
                $(".search-bar").addClass("full-search-bar")
            }), 
            $(".search-close").on("click", function () {
                $(".search-bar").removeClass("full-search-bar")
            })
        });

    }
}
