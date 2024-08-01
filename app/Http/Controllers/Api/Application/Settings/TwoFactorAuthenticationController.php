<?php

namespace Pterodactyl\Http\Controllers\Api\Application\Settings;

use Illuminate\Http\JsonResponse;
use Pterodactyl\Exceptions\Model\DataValidationException;
use Pterodactyl\Exceptions\Repository\RecordNotFoundException;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;
use Pterodactyl\Http\Controllers\Api\Application\ApplicationApiController;
use Pterodactyl\Http\Requests\Api\Application\Settings\TwoFactorAuthenticationRequest;

class TwoFactorAuthenticationController extends ApplicationApiController
{
    public function __construct(private SettingsRepositoryInterface $settingsRepository)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'mode' => config('settings::pterodactyl:auth:2fa_required', 'disable'),
        ]);
    }

    /**
     * @throws DataValidationException
     * @throws RecordNotFoundException
     */
    public function update(TwoFactorAuthenticationRequest $request): void
    {
        $validated = $request->validated();

        $this->settingsRepository->set('settings::pterodactyl:auth:2fa_required', $validated['mode']);
    }
}
