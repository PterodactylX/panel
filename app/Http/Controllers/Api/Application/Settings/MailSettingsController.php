<?php

namespace Pterodactyl\Http\Controllers\Api\Application\Settings;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Contracts\Console\Kernel;
use Pterodactyl\Notifications\MailTested;
use Illuminate\Support\Facades\Notification;
use Pterodactyl\Exceptions\DisplayException;
use Illuminate\Contracts\Encryption\Encrypter;
use Pterodactyl\Providers\SettingsServiceProvider;
use Pterodactyl\Exceptions\Model\DataValidationException;
use Pterodactyl\Exceptions\Repository\RecordNotFoundException;
use Illuminate\Contracts\Config\Repository as ConfigRepository;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;
use Pterodactyl\Http\Controllers\Api\Application\ApplicationApiController;
use Pterodactyl\Http\Requests\Api\Application\Settings\MailSettingsFormRequest;

class MailSettingsController extends ApplicationApiController
{
    public function __construct(
        private ConfigRepository $config,
        private Encrypter $encrypter,
        private Kernel $kernel,
        private SettingsRepositoryInterface $settings,
    ) {
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'mail:mailers:smtp:host' => $this->config->get('mail.mailers.smtp.host', 'smtp.example.com'),
            'mail:mailers:smtp:port' => $this->config->get('mail.mailers.smtp.port', 587),
            'mail:mailers:smtp:encryption' => $this->config->get('mail.mailers.smtp.encryption', 'tls'),
            'mail:mailers:smtp:username' => $this->config->get('mail.mailers.smtp.username', ''),
            'mail:from:address' => $this->config->get('mail.from.address', 'no-reply@example.com'),
            'mail:from:name' => $this->config->get('mail.from.name', 'PterodactylX Panel'),
        ]);
    }

    /**
     * @throws DataValidationException
     * @throws DisplayException
     * @throws RecordNotFoundException
     */
    public function update(MailSettingsFormRequest $request): Response
    {
        if ($this->config->get('mail.default') !== 'smtp') {
            throw new DisplayException('This feature is only available if SMTP is the selected email driver for the Panel.');
        }

        $values = $request->normalize();
        if (array_get($values, 'mail:mailers:smtp:password') === '!e') {
            $values['mail:mailers:smtp:password'] = '';
        }

        foreach ($values as $key => $value) {
            if (in_array($key, SettingsServiceProvider::getEncryptedKeys()) && !empty($value)) {
                $value = $this->encrypter->encrypt($value);
            }

            $this->settings->set('settings::' . $key, $value);
        }

        $this->kernel->call('queue:restart');

        return response('', 204);
    }

    public function test(Request $request): Response
    {
        try {
            Notification::route('mail', $request->user()->email)
                ->notify(new MailTested($request->user()));
        } catch (\Exception $exception) {
            return response($exception->getMessage(), 500);
        }

        return response('', 204);
    }
}
