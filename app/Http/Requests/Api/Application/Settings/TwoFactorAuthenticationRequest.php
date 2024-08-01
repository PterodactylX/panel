<?php

namespace Pterodactyl\Http\Requests\Api\Application\Settings;

use Pterodactyl\Http\Requests\Api\Application\ApplicationApiRequest;

class TwoFactorAuthenticationRequest extends ApplicationApiRequest
{
    public function rules(): array
    {
        return [
            'mode' => 'required|string|in:disable,admin,all',
        ];
    }
}
