package sk.tuke.fei.icube.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sk.tuke.fei.icube.model.Cart;
import sk.tuke.fei.icube.model.CartItem;
import sk.tuke.fei.icube.model.Order;
import sk.tuke.fei.icube.model.User;
import sk.tuke.fei.icube.repository.CartItemRepository;
import sk.tuke.fei.icube.repository.CartRepository;
import sk.tuke.fei.icube.repository.OrderRepository;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

/**
 * @author Šimon Hašák
 */
@Service
public class CartService extends CrudService<Cart> {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;

    private final ProductService productService;

    @Autowired
    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       OrderRepository orderRepository,
                       ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.orderRepository = orderRepository;
        this.productService = productService;
    }

    public CartItem addToCart(CartItem cartItem) {
        return null;
    }

    @Transactional
    public void mergeLocalCart(Collection<CartItem> productInOrders, User user) {
        Cart finalCart = user.getCart();
        productInOrders.forEach(cartItem -> {
            Set<CartItem> set = finalCart.getCartItems();

            Optional<CartItem> old = set.stream()
                    .filter(c -> c.getProductId().equals(cartItem.getProductId())).findFirst();

            CartItem item;
            if (old.isPresent()) {
                item = old.get();
                item.setQuantity(cartItem.getQuantity() + item.getQuantity());
            } else {
                item = cartItem;
                item.setCart(finalCart);
                finalCart.getCartItems().add(item);
            }
            cartItemRepository.save(item);
        });
        cartRepository.save(finalCart);
    }

    public Cart getCart(User user) {
        return user.getCart();
    }

    @Transactional
    public void deleteCartItem(Long cartItemId, User user) {
        Optional<CartItem> cartItem = user.getCart().getCartItems().stream()
                .filter(c -> c.getProductId().equals(cartItemId)).findFirst();

        cartItem.ifPresent(cartItem1 -> {
            cartItem1.setCart(null);
            cartItemRepository.deleteById(cartItem1.getId());
        });
    }

    @Transactional
    public void checkout(User user) {
        // Creat an order
        Order order = new Order(user);
        orderRepository.save(order);

        // clear cart's foreign key & set order's foreign key& decrease stock
        user.getCart().getCartItems().forEach(cartItem -> {
            cartItem.setCart(null);
            cartItem.setOrder(order);
            productService.decreaseStock(cartItem.getProductId(), cartItem.getQuantity());
            cartItemRepository.save(cartItem);
        });

    }

    public Cart removeFromCart(Long id) {
        return null;
    }

    public void emptyCart(Long cartId) {  }

    public Cart calculatePrice(Cart cart) {
        return null;
    }

    @Override
    protected PagingAndSortingRepository<Cart, Long> getRepository() {
        return cartRepository;
    }
}
