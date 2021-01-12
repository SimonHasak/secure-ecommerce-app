package sk.tuke.fei.icube.controller;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import sk.tuke.fei.icube.dto.MailModelDTO;
import sk.tuke.fei.icube.service.EmailSenderService;

@RestController
@RequestMapping("api/mail")
public class MailController {

  @Autowired
  EmailSenderService emailSenderService;

  @Autowired
  SpringTemplateEngine templateEngine;

  @PostMapping(value = "/sendOrder")
  public String sendOrder( @RequestBody MailModelDTO mailModel)
      throws MessagingException {

    Context context = new Context();
    context.setVariable("mail",mailModel);

    MimeMessage mimeMessage = emailSenderService.getMailSender().createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

    helper.setTo(mailModel.getTo());
    helper.setFrom(mailModel.getFrom());
    helper.setSubject(mailModel.getSubject());

    String htmlContent = templateEngine.process("mailOrder.html",context);
    //String htmlContent = "Hello";
    helper.setText(htmlContent,true);

    emailSenderService.sendHtmlMail(mimeMessage);
    return "mimeMessage";
  }

}
