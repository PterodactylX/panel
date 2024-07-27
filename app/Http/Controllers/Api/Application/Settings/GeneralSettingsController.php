<?php

namespace Pterodactyl\Http\Controllers\Api\Application\Settings;

use Illuminate\Http\JsonResponse;
use Pterodactyl\Exceptions\Model\DataValidationException;
use Pterodactyl\Exceptions\Repository\RecordNotFoundException;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;
use Pterodactyl\Http\Controllers\Api\Application\ApplicationApiController;
use Pterodactyl\Http\Requests\Api\Application\Settings\GeneralSettingsFormRequest;

class GeneralSettingsController extends ApplicationApiController
{
    public function __construct(private SettingsRepositoryInterface $settingsRepository)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'name' => config('app.name'),
            'analytics' => config('app.analytics'),
        ]);
    }

    /**
     * @throws DataValidationException
     * @throws RecordNotFoundException
     */
    public function update(GeneralSettingsFormRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $this->settingsRepository->set('settings::app:name', $validated['name']);
        $this->settingsRepository->set('settings::google:analytics', $validated['analytics']);

        return response()->json([
            'name' => config('app.name'),
            'analytics' => config('app.analytics'),
        ]);
    }
}
