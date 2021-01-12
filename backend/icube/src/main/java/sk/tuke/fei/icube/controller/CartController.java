package sk.tuke.fei.icube.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.tuke.fei.icube.model.Cart;
import sk.tuke.fei.icube.model.CartItem;
import sk.tuke.fei.icube.model.CartItemForm;
import sk.tuke.fei.icube.model.User;
import sk.tuke.fei.icube.service.CartItemService;
import sk.tuke.fei.icube.service.CartService;
import sk.tuke.fei.icube.service.UserService;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;
import java.util.Collection;
import java.util.Collections;

/**
 * @author Šimon Hašák
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/cart")
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final CartItemService cartItemService;

    @Autowired
    public CartController(CartService cartService,
                          UserService userService,
                          CartItemService cartItemService) {
        this.cartService = cartService;
        this.userService = userService;
        this.cartItemService = cartItemService;
    }

    @PostMapping("/merge-cart")
    public ResponseEntity<Cart> mergeCart(@RequestBody Collection<CartItem> productInOrders, Principal principal) {
        User user = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException(String.format("User with email %s was not found", principal.getName())));
        try {
            cartService.mergeLocalCart(productInOrders, user);
        } catch (Exception e) {
            ResponseEntity.badRequest().body("Merge Cart Failed");
        }
        return ResponseEntity.ok(cartService.getCart(user));
    }

    @GetMapping("/")
    public Cart getCart(Principal principal) {
        User user = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException(String.format("User with email %s was not found", principal.getName())));
        return cartService.getCart(user);
    }


    @PostMapping("/add-to-cart")
    public boolean addToCart(@RequestBody CartItem cartItem, Principal principal) {
        try {
            mergeCart(Collections.singleton(cartItem), principal);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @PutMapping("/{itemId}")
    public CartItem modifyItem(@PathVariable("itemId") Long itemId, @RequestBody Integer quantity, Principal principal) {
        User user = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException(String.format("User with email %s was not found", principal.getName())));
        cartItemService.update(itemId, quantity, user);
        return cartItemService.findOne(itemId, user);
    }

    @DeleteMapping("/{itemId}")
    public void deleteItem(@PathVariable("itemId") Long itemId, Principal principal) {
        User user = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException(String.format("User with email %s was not found", principal.getName())));
        cartService.deleteCartItem(itemId, user);
        // flush memory into DB
    }


    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(Principal principal) {
        User user = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException(String.format("User with email %s was not found", principal.getName())));
        cartService.checkout(user);
        return ResponseEntity.ok(null);
    }
}
