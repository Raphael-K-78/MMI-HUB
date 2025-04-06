<?php

namespace ContainerYR7RmVJ;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_Messenger_HandlerDescriptor_WG_ORBvService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.messenger.handler_descriptor.WG.oRBv' shared service.
     *
     * @return \Symfony\Component\Messenger\Handler\HandlerDescriptor
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/symfony/messenger/Handler/HandlerDescriptor.php';
        include_once \dirname(__DIR__, 4).'/vendor/symfony/mailer/Messenger/MessageHandler.php';

        $a = ($container->privates['mailer.transports'] ?? $container->load('getMailer_TransportsService'));

        if (isset($container->privates['.messenger.handler_descriptor.WG.oRBv'])) {
            return $container->privates['.messenger.handler_descriptor.WG.oRBv'];
        }

        return $container->privates['.messenger.handler_descriptor.WG.oRBv'] = new \Symfony\Component\Messenger\Handler\HandlerDescriptor(new \Symfony\Component\Mailer\Messenger\MessageHandler($a), []);
    }
}
