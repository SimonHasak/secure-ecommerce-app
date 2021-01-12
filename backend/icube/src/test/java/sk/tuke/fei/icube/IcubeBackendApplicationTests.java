package sk.tuke.fei.icube;

import javax.mail.MessagingException;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sk.tuke.fei.icube.controller.MailController;
import sk.tuke.fei.icube.dto.MailModelDTO;
import sk.tuke.fei.icube.service.EmailSenderService;
import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class IcubeBackendApplicationTests {

	@Autowired
	EmailSenderService senderService;

	@Autowired
	private MailController mailController;

	@Test
	void contextLoads() {

	}


}
