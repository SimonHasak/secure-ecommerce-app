package sk.tuke.fei.icube.service;

import org.springframework.asm.Label;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sk.tuke.fei.icube.model.Order;
import sk.tuke.fei.icube.repository.LabelRepository;
import sk.tuke.fei.icube.repository.OrderRepository;

/**
 * @author Šimon Hašák
 */
@Service
public class OrderService extends CrudService<Order> {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    protected PagingAndSortingRepository<Order, Long> getRepository() {
        return orderRepository;
    }
}
