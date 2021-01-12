package sk.tuke.fei.icube.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sk.tuke.fei.icube.model.CartItem;
import sk.tuke.fei.icube.model.User;
import sk.tuke.fei.icube.repository.CartItemRepository;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

/**
 * @author Šimon Hašák
 */
@Service
public class CartItemService extends CrudService<CartItem> {

    private final CartItemRepository cartRepository;

    public CartItemService(CartItemRepository cartRepository) {
        this.cartRepository = cartRepository;
    }


    @Transactional
    public void update(Long itemId, Integer quantity, User user) {
        Optional<CartItem> cartItem = user.getCart().getCartItems().stream()
                .filter(c -> itemId.equals(c.getProductId())).findFirst();

        cartItem.ifPresent(cartItem1 -> {
            cartItem1.setQuantity(quantity);
            cartRepository.save(cartItem1);
        });

    }

    public CartItem findOne(Long itemId, User user) {
        Optional<CartItem> cartItem = user.getCart().getCartItems().stream()
                .filter(c -> itemId.equals(c.getProductId())).findFirst();

        AtomicReference<CartItem> res = new AtomicReference<>();

        cartItem.ifPresent(res::set);

        return res.get();
    }

    @Override
    protected PagingAndSortingRepository<CartItem, Long> getRepository() {
        return cartRepository;
    }
}
