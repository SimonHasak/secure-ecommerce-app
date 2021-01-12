package sk.tuke.fei.icube.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Šimon Hašák
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/order")
public class OrderController {

//    orderservice
//userservice


    @GetMapping()
    public String index() {
        return "Hello Order";
    }

}
