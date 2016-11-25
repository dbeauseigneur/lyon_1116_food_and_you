<?php

namespace AppBundle\Notification\Event;

use AppBundle\Entity\Event;
use Symfony\Component\EventDispatcher\Event as BaseEvent;

final class ApplicantRegistrationClosed extends BaseEvent
{
    const EVENT_NAME = 'app.event.applicant_registration_closed';

    /**
     * @var Event
     */
    private $event;

    /**
     * @param Event $member
     */
    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    /**
     * @return Event
     */
    public function getEvent()
    {
        return $this->event;
    }
}
