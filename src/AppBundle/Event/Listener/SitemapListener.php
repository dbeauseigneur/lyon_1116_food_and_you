<?php

namespace AppBundle\Event\Listener;

use AppBundle\Entity\Repository\EventRepository;
use AppBundle\Entity\Repository\MemberRepository;
use AppBundle\Entity\Repository\RestaurantRepository;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Service\SitemapListenerInterface;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;

class SitemapListener implements SitemapListenerInterface
{
    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * @var EventRepository
     */
    private $eventRepository;

    /**
     * @var MemberRepository
     */
    private $memberRepository;

    /**
     * @var RestaurantRepository
     */
    private $restaurantRepository;

    /**
     * SitemapListener constructor.
     *
     * @param RouterInterface $router
     * @param EventRepository $eventRepository
     * @param MemberRepository $memberRepository
     * @param RestaurantRepository $restaurantRepository
     */
    public function __construct(
        RouterInterface $router,
        EventRepository $eventRepository,
        MemberRepository $memberRepository,
        RestaurantRepository $restaurantRepository
    )
    {
        $this->router = $router;
        $this->eventRepository = $eventRepository;
        $this->memberRepository = $memberRepository;
        $this->restaurantRepository = $restaurantRepository;
    }


    public function populateSitemap(SitemapPopulateEvent $event)
    {
        $eventsIds = $this->eventRepository->getEventsIds();
        foreach ($eventsIds as $id) {
            $url = $this->router->generate('event_details', array('id' => $id['id']), UrlGeneratorInterface::ABSOLUTE_URL);
            $event->getGenerator()->addUrl(
                new UrlConcrete(
                    $url,
                    new \DateTime(),
                    UrlConcrete::CHANGEFREQ_HOURLY,
                    1
                ),
                'default'
            );
        }

        $profilesSlugs = $this->memberRepository->getAllSlugs();
        foreach ($profilesSlugs as $slug) {
            $url = $this->router->generate('member_profile', array('slug' => $slug['slug']), UrlGeneratorInterface::ABSOLUTE_URL);
            $event->getGenerator()->addUrl(
                new UrlConcrete(
                    $url,
                    new \DateTime(),
                    UrlConcrete::CHANGEFREQ_HOURLY,
                    1
                ),
                'default'
            );
        }

        $restaurantsIds = $this->restaurantRepository->getRestaurantsIds();
        foreach ($restaurantsIds as $id) {
            $url = $this->router->generate('restaurant_details', array('id' => $id['id']), UrlGeneratorInterface::ABSOLUTE_URL);
            $event->getGenerator()->addUrl(
                new UrlConcrete(
                    $url,
                    new \DateTime(),
                    UrlConcrete::CHANGEFREQ_HOURLY,
                    1
                ),
                'default'
            );
        }
    }
}