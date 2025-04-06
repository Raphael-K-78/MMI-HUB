<?php

namespace ContainerNifSM8J;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getModifEventControllerService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'App\Controller\ModifEventController' shared autowired service.
     *
     * @return \App\Controller\ModifEventController
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/symfony/framework-bundle/Controller/AbstractController.php';
        include_once \dirname(__DIR__, 4).'/src/Controller/ModifEventController.php';

        $container->services['App\\Controller\\ModifEventController'] = $instance = new \App\Controller\ModifEventController();

        $instance->setContainer(($container->privates['.service_locator.ZyP9f7K'] ?? $container->load('get_ServiceLocator_ZyP9f7KService'))->withContext('App\\Controller\\ModifEventController', $container));

        return $instance;
    }
}
