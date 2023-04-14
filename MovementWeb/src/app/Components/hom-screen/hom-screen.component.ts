import { Component } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import { format } from 'date-fns';


@Component({
  selector: 'app-hom-screen',
  templateUrl: './hom-screen.component.html',
  styleUrls: ['./hom-screen.component.scss']
})

export class HomScreenComponent {

  nextevent = "Sille Rave "

  config: CountdownConfig = {
    leftTime:  60  * 60 * 24 * 30,
    format: 'dd  :HH:mm:ss',
    formatDate: ({ date, formatStr }) => format(date, formatStr),

    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };
  };
