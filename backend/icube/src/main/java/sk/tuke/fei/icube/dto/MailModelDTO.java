package sk.tuke.fei.icube.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import sk.tuke.fei.icube.model.Order;

@Data
@AllArgsConstructor
public class MailModelDTO {
  private String from;
  private String to;
  private String name;
  private String subject;
  private String paymentType;
  private String paymentPrice;
  private String shippingType;
  private String shippingPrice;
  private String subtotalPrice;
  private String totalPrice;
  private String discount;
  private Order order;
}
