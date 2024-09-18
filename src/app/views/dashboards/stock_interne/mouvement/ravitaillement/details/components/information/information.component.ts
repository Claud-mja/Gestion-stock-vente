import { Component, Input, SimpleChanges } from '@angular/core'
import { currency } from '@/app/common/constants'
import { RavDetailsList } from '@/app/core/models/ravitaillementDetails.model';
import { RavitaillementInfo } from '@/app/core/models/ravitaillement.model';

@Component({
  selector: 'order-details-information',
  standalone: true,
  imports: [],
  templateUrl: './information.component.html',
  styles: ``,
})
export class InformationComponent {
  @Input() orderData: RavDetailsList[] = [];
  @Input() infoRavitaillement: RavitaillementInfo | undefined;
  orderInfo = {}
  currency = currency
  total: number = 0

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderData']) {
      this.updateData();
    }
  }
  updateData(){
    this.total = 0
    this.orderData.forEach((order) => {
      // this.total += order.total
      this.total += order.montant
    })
  }
}
