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
        match ((int) config('pterodactyl.auth.2fa_required', 0)) {
            0 => $mode = 'disable',
            1 => $mode = 'admin',
            2 => $mode = 'all',
        };

        return response()->json([
            'mode' => $mode,
        ]);
    }

    /**
     * @throws DataValidationException
     * @throws RecordNotFoundException
     */
    public function update(TwoFactorAuthenticationRequest $request): void
    {
        $validated = $request->validated();

        match ($validated['mode']) {
            'disable' => $mode = 0,
            'admin' => $mode = 1,
            'all' => $mode = 2,
        };

        $this->settingsRepository->set('settings::pterodactyl:auth:2fa_required', $mode);
    }
}
