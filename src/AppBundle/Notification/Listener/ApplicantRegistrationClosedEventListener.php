<?php

namespace AppBundle\Notification\Listener;

use AppBundle\Model\Email;
use AppBundle\Notification\Event\ApplicantChosenEvent;
use AppBundle\Service\Mailer;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\Translation\TranslatorInterface;

class ApplicantRegistrationClosedEventListener
{
    /**
     * @var Mailer
     */
    private $mailer;

    /**
     * @var EngineInterface
     */
    private $templating;

    /**
     * @var string
     */
    private $fromEmail;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * ContactEventListener constructor.
     * @param Mailer $mailer
     * @param EngineInterface $templating
     * @param TranslatorInterface $translator
     * @param $fromEmail
     */
    public function __construct(Mailer $mailer, EngineInterface $templating, TranslatorInterface $translator, $fromEmail)
    {
        $this->mailer = $mailer;
        $this->templating = $templating;
        $this->fromEmail = $fromEmail;
        $this->translator = $translator;
    }

    /**
     * @param ApplicantRegistrationClosedEventListener $event
     */
    public function handle(ApplicantChosenEvent $event)
    {
        $email = $this->generateEmail($event);

        $this->mailer->send($email);
    }

    /**
     * @param ApplicantRegistrationClosedEventListener $event
     * @return Email
     */
    protected function generateEmail(ApplicantRegistrationClosedEventListener $event)
    {
        $email = new Email();
        $email->setSender($this->fromEmail);
        $email->setRecipient($event->getRestaurant()->getMember()->getAuthentication()->getEmail());
        $email->setSubject($this->translator->trans('applicant_registration_closed.subject', array(), 'email'));
        $email->setReplyTo($this->fromEmail);
        $email->setBody($this->templating->render(
            ':email:team_completed.html.twig',
            array(
                'applicant' => $event->getApplicant()
            )
        ));
        $email->setPlainBody($this->templating->render(
            ':email:team_completed.txt.twig',
            array(
                'applicant' => $event->getApplicant()
            )
        ));

        return $email;
    }
}
