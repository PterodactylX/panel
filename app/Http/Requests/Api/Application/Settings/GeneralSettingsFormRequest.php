<?php

namespace Pterodactyl\Http\Requests\Api\Application\Settings;

use Pterodactyl\Http\Requests\Api\Application\ApplicationApiRequest;
use Pterodactyl\Traits\Helpers\AvailableLanguages;

class GeneralSettingsFormRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:191',
            'analytics' => 'nullable|string|max:50',
        ];
    }

    public function attributes(): array
    {
        return [
            'app:name' => 'Application Name',
            'google:analytics' => 'Google Analytics Tracking ID',
        ];
    }
}
