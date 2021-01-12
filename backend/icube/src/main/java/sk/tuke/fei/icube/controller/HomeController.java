package sk.tuke.fei.icube.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

/**
 * @author Šimon Hašák
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping()
    public RedirectView redirectToSwaggerUI() {
        return new RedirectView("/swagger-ui.html");
    }

}
