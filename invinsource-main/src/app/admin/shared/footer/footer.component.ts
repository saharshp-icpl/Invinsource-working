import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss','../../../../assets/plugins/bootstrap/css/bootstrap.min.css','../../../../assets/plugins/prism/prism.css',
    "../../../../assets/plugins/lightbox/dist/ekko-lightbox.css","../../../../assets/plugins/elegant_font/css/style.css","../../../../assets/sass/scss/core/_header.scss",
    "../../../../assets/sass/scss/core/_responsive.scss","../../../../assets/sass/scss/bootstrap/mixins/_buttons.scss","../../../../assets/vendor/pace/themes/blue/pace-theme-minimal.css"]
})
export class FooterComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {

    /* Back To Top */

    $(document).ready(function() {
      $(window).on("scroll", function() {
        // if ($(this).scrollTop() > 300) {
        //   $('.back-to-top').fadeIn();
        // } else {
        //   $('.back-to-top').fadeOut();
        // }
      });

      $('.back-to-top').on("click", function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
      });
    });
  }

}