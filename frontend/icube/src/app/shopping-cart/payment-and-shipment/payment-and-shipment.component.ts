import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {PaymentMethods} from "../../shared/enums/PaymentMethods";
import {ShipmentMethods} from "../../shared/enums/ShipmentMethods";

@Component({
  selector: 'app-payment-and-shipment',
  templateUrl: './payment-and-shipment.component.html',
  styleUrls: ['./payment-and-shipment.component.css']
})
export class PaymentAndShipmentComponent implements OnInit {

  shipmentMethods: { key: ShipmentMethods, value: string }[] = [
    { "key": ShipmentMethods.PersonalPickup, "value": 'Osobné vyzdvihnutie'},
    { "key": ShipmentMethods.HomeDelivery, "value": 'Dobierka'}
  ];

  paymentMethods: { key: PaymentMethods, value: string }[] = [
    { "key": PaymentMethods.InPerson, "value": 'Hotovosť'},
    { "key": PaymentMethods.CardOnline, "value": 'Karta online'},
    { "key": PaymentMethods.Transaction, "value": 'Bankový prevod'}
  ];

  paymentType = PaymentMethods;
  shipmentType = ShipmentMethods;
  selectedPayment: PaymentMethods;
  selectedShipment: ShipmentMethods;
  @Output() paymentSelectionEvent = new EventEmitter<PaymentMethods>();
  @Output() shipmentSelectionEvent = new EventEmitter<ShipmentMethods>();

  constructor() {

  }

  ngOnInit() {
    this.checkOpenStatus();
  }

  selectPaymentMethod(method: PaymentMethods){
    this.selectedPayment = method;
    this.paymentSelectionEvent.emit(method);
  }

  selectShipmentMethod(method: ShipmentMethods){
    this.selectedShipment = method;
    this.shipmentSelectionEvent.emit(method);
  }

  checkOpenStatus() {
    // does not count with time zones
    let d = new Date();
    let n = d.getDay();
    let now = d.getHours() + "." + d.getMinutes();
    let result;
    let weekdays = [
      ["Sunday"],
      ["Monday", 8.30, 14.00],
      ["Tuesday", 8.30, 14.00],
      ["Wednesday", 8.30, 14.00],
      ["Thursday", 8.30, 14.00],
      ["Friday",8.30, 12.00],
      ["Saturday"] // closed
    ];
    let day = weekdays[n];

    if (now > day[1] && now < day[2] || now > day[3] && now < day[4]) {
      result = "<span style=\"color:#07ed11\">otvorené</span>";
    } else {
      result = "<span style=\"color:#fc4b1c\">zatvorené</span>";
    }
    document.getElementById("open-close").innerHTML = result;
  }

}



