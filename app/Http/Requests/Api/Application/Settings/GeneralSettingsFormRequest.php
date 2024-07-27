<?php

namespace Pterodactyl\Http\Requests\Api\Application\Settings;

use Pterodactyl\Http\Requests\Api\Application\ApplicationApiRequest;

class GeneralSettingsFormRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:20',
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
