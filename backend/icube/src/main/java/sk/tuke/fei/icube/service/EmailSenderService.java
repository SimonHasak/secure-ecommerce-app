package sk.tuke.fei.icube.service;

import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
  @Autowired
  private JavaMailSender mailSender;

  public JavaMailSender getMailSender() {
    return mailSender;
  }

  public EmailSenderService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  @Async
  public void sendHtmlMail(MimeMessage message){
    mailSender.send(message);
  }
}
