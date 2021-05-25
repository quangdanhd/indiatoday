<?php

namespace App\Http\Controllers;

use App\Models\access_times;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class ControllerUsers extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $uniqueID = session_uniqueID();
        $access_today = DB::table('access_times')->select('id')->whereDate('created_at', date('Y-m-d'))->where('unknown_token', $uniqueID)->first();
        if (!$access_today) {
            access_times::create([
                'unknown_token' => $uniqueID,
            ]);
        }
    }
}
