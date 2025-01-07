import { Component } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent {
  public social_data = [
    {
      id: 1,
      link: 'https://www.facebook.com/profile.php?id=61568817034803&mibextid=JRoKGi',
      icon: 'fa-brands fa-facebook-f',
      title: 'Facebook',
    },
    {
      id: 2,
      link: 'https://x.com/cix_techmart?t=brqpWJkCoFXf20Kl6PiEEA&s=09',
      icon: 'fa-brands fa-twitter',
      title: 'Twitter',
    },
    {
      id: 3,
      link: 'http://www.linkedin.com/in/cix-tech-mart-089508339',
      icon: 'fa-brands fa-linkedin-in',
      title: 'Linkedin',
    },
    {
      id: 4,
      link: 'https://vimeo.com/user230833529',
      icon: 'fa-brands fa-vimeo-v',
      title: 'Vimeo',
    },
  ];
}
