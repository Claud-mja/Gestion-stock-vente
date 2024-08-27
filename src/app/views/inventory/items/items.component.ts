import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Selectr from 'mobius1-selectr'
import { DatepickerDirective } from '@/app/core/directive/datepickr.directive'
@Component({
  selector: 'app-items',
  standalone : true,
  imports : [DatepickerDirective],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit,AfterViewInit {

  momentFormat = 'YYYY/MM/DD HH:mm'
  momentValue: string | undefined
  @ViewChild('selectrCharacter') selectrCharctElement!: ElementRef;
  @ViewChild('selectrPrice') selectrPriceElement!: ElementRef;
  imageUrl: string | ArrayBuffer | null = null

  constructor() { }

  ngAfterViewInit(): void {
    const elementChatcter = this.selectrCharctElement.nativeElement
    const selectrChatcter = new Selectr(elementChatcter, {})
    const elementPrice = this.selectrPriceElement.nativeElement;
    const selectrPrice = new Selectr(elementPrice , {
      multiple: true,
    });
  }

  ngOnInit() {
  }

  handleChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.files && inputElement.files.length > 0) {
      const uploadedFile = inputElement.files[0]
      this.readFile(uploadedFile)
    }
  }

  private readFile(file: File): void {
    const reader = new FileReader()
    reader.onload = () => {
      // Set the preview image src
      this.imageUrl = reader.result as string
    }

    reader.readAsDataURL(file) // Read file as base64
  }

}
